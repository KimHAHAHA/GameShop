import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { CommonModule } from '@angular/common';
import { Game } from '../../../services/api/game';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-u-store',
  standalone: true,
  imports: [Header, CommonModule, FormsModule],
  templateUrl: './u-store.html',
  styleUrls: ['./u-store.scss'],
})
export class UStore {
  cart: any[] = [];
  totalPrice = 0;
  discountedPrice = 0;
  discountPercent = 0;
  discountCode = '';

  isLoading = false;
  showPopup = false;

  apiUrl = 'https://kimky-shop-backend.onrender.com';

  constructor(private gameService: Game, private http: HttpClient) {}

  async ngOnInit() {
    await this.loadCart();
  }

  // ✅ โหลดข้อมูลตะกร้า
  async loadCart() {
    const user = this.gameService.getUser();
    if (!user) return alert('กรุณาเข้าสู่ระบบก่อน');

    try {
      this.isLoading = true;
      const res: any = await this.gameService.getCart(user.uid);
      this.cart = res || [];
      this.totalPrice = this.cart.reduce(
        (sum, g) => sum + Number(g.price || 0),
        0
      );
      this.discountedPrice = this.totalPrice;
    } catch (err) {
      console.error('❌ โหลดตะกร้าล้มเหลว:', err);
      alert('เกิดข้อผิดพลาดในการโหลดข้อมูลตะกร้า');
    } finally {
      this.isLoading = false;
    }
  }

  // ✅ ลบเกมออกจากตะกร้า
  async removeFromCart(gameId: number) {
    const user = this.gameService.getUser();
    if (!user) return alert('กรุณาเข้าสู่ระบบก่อน');

    if (!confirm('คุณต้องการลบเกมนี้ออกจากตะกร้าหรือไม่?')) return;

    try {
      await this.gameService.removeFromCart(user.uid, gameId);
      this.cart = this.cart.filter((g) => g.gid !== gameId);
      this.totalPrice = this.cart.reduce(
        (sum, g) => sum + Number(g.price || 0),
        0
      );
      this.discountedPrice = this.totalPrice;
    } catch (err) {
      console.error('❌ ลบเกมล้มเหลว:', err);
      alert('เกิดข้อผิดพลาดในการลบเกม');
    }
  }

  // ✅ เปิด popup
  checkout() {
    this.showPopup = true;
  }

  // ✅ ปิด popup
  closePopup() {
    this.showPopup = false;
    this.discountCode = '';
    this.discountPercent = 0;
    this.discountedPrice = this.totalPrice;
  }

  // ✅ ตรวจสอบโค้ดส่วนลด
  async applyDiscount() {
    if (!this.discountCode.trim()) {
      alert('กรุณากรอกโค้ดส่วนลด');
      return;
    }

    try {
      const res: any = await lastValueFrom(
        this.http.post(`${this.apiUrl}/discount_codes/check`, {
          code: this.discountCode.trim(),
        })
      );

      this.discountPercent = Number(res.discount_percent);
      const discountAmount = (this.totalPrice * this.discountPercent) / 100;
      this.discountedPrice = this.totalPrice - discountAmount;

      alert(`✅ ใช้โค้ดสำเร็จ ลด ${this.discountPercent}%`);
    } catch (err: any) {
      console.error('❌ โค้ดไม่ถูกต้อง:', err);
      alert(err.error?.message || '❌ โค้ดไม่ถูกต้องหรือหมดอายุ');
      this.discountPercent = 0;
      this.discountedPrice = this.totalPrice;
    }
  }

  // ✅ ยืนยันการซื้อ (ส่งโค้ดส่วนลดไป backend)
  async confirmCheckout() {
    const user = this.gameService.getUser();
    if (!user) return alert('กรุณาเข้าสู่ระบบก่อน');

    try {
      this.isLoading = true;

      // ✅ ถ้ามีโค้ดส่วนลด ตรวจสอบอีกครั้งก่อนชำระ
      if (this.discountCode.trim()) {
        try {
          const res: any = await lastValueFrom(
            this.http.post(`${this.apiUrl}/discount_codes/check`, {
              code: this.discountCode.trim(),
              user_id: user.uid, // ✅ ส่ง user_id ไปด้วย
            })
          );
          this.discountPercent = Number(res.discount_percent);
          const discountAmount = (this.totalPrice * this.discountPercent) / 100;
          this.discountedPrice = this.totalPrice - discountAmount;
        } catch (err: any) {
          alert(err.error?.message || '❌ โค้ดไม่ถูกต้องหรือหมดอายุ');
          return; // ❌ หยุดเลย ถ้าโค้ดใช้ไม่ได้
        }
      } else {
        this.discountedPrice = this.totalPrice;
      }

      // ✅ เริ่มชำระเงิน
      const res2: any = await lastValueFrom(
        this.http.post(`${this.apiUrl}/cart_items/checkout/${user.uid}`, {
          discount_code: this.discountCode.trim(),
        })
      );

      alert(
        res2.message ||
          `✅ ซื้อสำเร็จ! จ่ายทั้งหมด ${this.discountedPrice.toFixed(2)} บาท`
      );
      this.showPopup = false;
      await this.loadCart();
    } catch (err: any) {
      console.error('❌ Checkout Error:', err);
      alert(err.error?.message || 'เกิดข้อผิดพลาดในการชำระเงิน');
    } finally {
      this.isLoading = false;
    }
  }
}

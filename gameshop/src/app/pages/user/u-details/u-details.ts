import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Game } from '../../../services/api/game';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-u-details',
  standalone: true,
  imports: [CommonModule, Header, FormsModule],
  templateUrl: './u-details.html',
  styleUrls: ['./u-details.scss'],
})
export class UDetails {
  game: any = {};
  showPopup = false;
  isLoading = true;

  discountCode = ''; // โค้ดส่วนลด
  discountPercent = 0; // %
  discountedPrice = 0; // ราคาหลังลด

  apiUrl = 'https://kimky-shop-backend.onrender.com/discount_codes';

  constructor(
    private route: ActivatedRoute,
    private gameService: Game,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    try {
      this.isLoading = true;
      this.game = await this.gameService.getGameById(id);
      this.discountedPrice = this.game.price; // ตั้งต้นราคาเต็ม
    } catch (err) {
      console.error('❌ โหลดข้อมูลเกมไม่สำเร็จ:', err);
    } finally {
      this.isLoading = false;
    }
  }

  onBuy() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.discountCode = '';
    this.discountPercent = 0;
    this.discountedPrice = this.game.price;
  }

  // ✅ ตรวจโค้ดและยืนยันการซื้อ
  async confirmPurchase() {
    const user = this.gameService.getUser();
    if (!user) return alert('กรุณาเข้าสู่ระบบก่อน');

    try {
      this.isLoading = true;

      // 🔹 ถ้ามีกรอกโค้ด → ตรวจสอบกับ backend ก่อน
      if (this.discountCode.trim()) {
        try {
          const res: any = await lastValueFrom(
            this.http.post(`${this.apiUrl}/check`, {
              code: this.discountCode.trim(),
              user_id: user.uid, // ✅ ส่ง user_id ไปด้วย
            })
          );

          // ✅ ถ้าโค้ดใช้ได้
          this.discountPercent = Number(res.discount_percent);
          const discountAmount = (this.game.price * this.discountPercent) / 100;
          this.discountedPrice = this.game.price - discountAmount;

          alert(
            `✅ โค้ดถูกต้อง! ลด ${
              this.discountPercent
            }%\nราคาสุทธิ: ${this.discountedPrice.toFixed(2)} บาท`
          );
        } catch (err: any) {
          // ❌ ถ้าโค้ดใช้ไม่ได้ / ใช้ซ้ำ / หมดอายุ
          alert(err.error?.message || '❌ โค้ดส่วนลดไม่ถูกต้องหรือหมดอายุ');
          return; // ❗ หยุดเลย ไม่ให้ซื้อ
        }
      } else {
        // ถ้าไม่มีโค้ด → ราคาเต็ม
        this.discountedPrice = this.game.price;
      }

      // ✅ ดำเนินการซื้อเกม
      const res2: any = await this.gameService.purchaseGame(
        user.uid,
        this.game.gid,
        this.discountedPrice // ✅ ส่งราคาหลังลด
      );

      alert(
        res2.message ||
          `✅ ซื้อเกมสำเร็จ! ราคาที่ชำระ: ${this.discountedPrice.toFixed(
            2
          )} บาท`
      );
      this.showPopup = false;
    } catch (err: any) {
      console.error('❌ ซื้อเกมล้มเหลว:', err);
      alert(err.error?.message || 'เกิดข้อผิดพลาดในการซื้อเกม');
    } finally {
      this.isLoading = false;
    }
  }

  // ✅ เพิ่มลงตะกร้า
  async onAddToCart() {
    const user = this.gameService.getUser();
    if (!user) return alert('กรุณาเข้าสู่ระบบก่อน');

    try {
      const res: any = await this.gameService.addToCart(
        user.uid,
        this.game.gid
      );
      alert(res.message || 'เพิ่มลงตะกร้าสำเร็จ');
    } catch (err: any) {
      console.error('❌ Add to Cart Error:', err);
      alert(err.error?.message || 'เกิดข้อผิดพลาดในการเพิ่มเกม');
    }
  }
}

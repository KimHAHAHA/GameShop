import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { CommonModule } from '@angular/common';
import { Game } from '../../../services/api/game';

@Component({
  selector: 'app-u-store',
  standalone: true,
  imports: [Header, CommonModule],
  templateUrl: './u-store.html',
  styleUrls: ['./u-store.scss'],
})
export class UStore {
  cart: any[] = [];
  totalPrice = 0;
  isLoading = false;

  constructor(private gameService: Game) {}

  async ngOnInit() {
    await this.loadCart();
  }

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
    } catch (err) {
      console.error('❌ โหลดตะกร้าล้มเหลว:', err);
      alert('เกิดข้อผิดพลาดในการโหลดข้อมูลตะกร้า');
    } finally {
      this.isLoading = false;
    }
  }

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
    } catch (err) {
      console.error('❌ ลบเกมล้มเหลว:', err);
      alert('เกิดข้อผิดพลาดในการลบเกม');
    }
  }

  async checkout() {
    const user = this.gameService.getUser();
    if (!user) return alert('กรุณาเข้าสู่ระบบก่อน');

    if (!confirm('ยืนยันการซื้อเกมทั้งหมดในตะกร้า?')) return;

    try {
      this.isLoading = true;
      const res: any = await this.gameService.checkout(user.uid);
      alert(res.message || '✅ ซื้อเกมสำเร็จ');
      this.cart = [];
      this.totalPrice = 0;
    } catch (err: any) {
      console.error('❌ Checkout Error:', err);
      alert(err.error?.message || 'เกิดข้อผิดพลาดในการชำระเงิน');
    } finally {
      this.isLoading = false;
    }
  }
}

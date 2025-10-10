import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { CommonModule } from '@angular/common';
import { Game } from '../../../services/api/game';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-u-details',
  standalone: true,
  imports: [CommonModule, Header],
  templateUrl: './u-details.html',
  styleUrls: ['./u-details.scss'],
})
export class UDetails {
  game: any = {};
  showPopup = false;
  isLoading = true;

  constructor(private route: ActivatedRoute, private gameService: Game) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    try {
      this.isLoading = true;
      this.game = await this.gameService.getGameById(id);
      console.log('🎯 โหลดเกม:', this.game);
    } catch (err) {
      console.error('❌ โหลดข้อมูลเกมไม่สำเร็จ:', err);
    } finally {
      this.isLoading = false;
    }
  }

  onBuy() {
    console.log('🟢 กด BUY แล้ว');
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  // ✅ ยืนยันการซื้อ
  async confirmPurchase() {
    const user = this.gameService.getUser();
    if (!user) return alert('กรุณาเข้าสู่ระบบก่อน');

    try {
      this.isLoading = true;
      const res: any = await this.gameService.purchaseGame(
        user.uid,
        this.game.gid
      );
      alert(res.message || '✅ ซื้อเกมสำเร็จ');
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

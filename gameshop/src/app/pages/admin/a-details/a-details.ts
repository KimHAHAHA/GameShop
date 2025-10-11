import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeaderAdmin } from '../../../components/header-admin/header-admin';
import { Game } from '../../../services/api/game';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-a-details',
  imports: [RouterLink, HeaderAdmin, CommonModule],
  templateUrl: './a-details.html',
  styleUrls: ['./a-details.scss'],
})
export class ADetails {
  game: any = null;
  isLoading = true;
  showPopup = false; // ✅ เพิ่มตัวแปร popup
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: Game
  ) {}

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

  // 🔹 เปิด popup ยืนยันการลบ
  openPopup() {
    this.showPopup = true;
  }

  // 🔹 ปิด popup
  closePopup() {
    this.showPopup = false;
  }

  // 🔹 ยืนยันการลบเกม
  async confirmDelete() {
    if (!this.game?.gid) return;

    this.isDeleting = true;
    try {
      const res: any = await this.gameService.deleteGame(this.game.gid);
      alert(res.message || '✅ ลบเกมสำเร็จ');
      this.router.navigate(['/a_home']);
    } catch (err: any) {
      console.error('❌ ลบเกมไม่สำเร็จ:', err);
      alert(err.error?.message || 'เกิดข้อผิดพลาดในระบบ');
    } finally {
      this.isDeleting = false;
      this.closePopup();
    }
  }
}

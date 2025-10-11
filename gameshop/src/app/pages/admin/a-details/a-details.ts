import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeaderAdmin } from '../../../components/header-admin/header-admin';
import { Game } from '../../../services/api/game';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-a-details',
  imports: [RouterLink, HeaderAdmin, CommonModule],
  templateUrl: './a-details.html',
  styleUrl: './a-details.scss',
})
export class ADetails {
  game: any = null;
  isLoading = true;
  showPopup = false; // ✅ เพิ่มตัวแปร popup

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

    try {
      // await this.gameService.deleteGame(this.game.gid);
      window.alert('✅ ลบเกมเรียบร้อยแล้ว');
      this.router.navigate(['/a_store']);
    } catch (err) {
      console.error('❌ ลบเกมไม่สำเร็จ:', err);
      window.alert('เกิดข้อผิดพลาดระหว่างการลบเกม');
    } finally {
      this.closePopup();
    }
  }
}

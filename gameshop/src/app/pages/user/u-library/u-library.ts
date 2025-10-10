import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Header } from '../../../components/header/header';
import { Game } from '../../../services/api/game';

@Component({
  selector: 'app-u-library',
  standalone: true,
  imports: [CommonModule, RouterLink, Header],
  templateUrl: './u-library.html',
  styleUrls: ['./u-library.scss'],
})
export class ULibrary {
  library: any[] = [];
  isLoading = false;

  constructor(private gameService: Game) {}

  async ngOnInit() {
    const user = this.gameService.getUser();
    if (!user) return alert('กรุณาเข้าสู่ระบบก่อน');

    try {
      this.isLoading = true;
      this.library = await this.gameService.getUserLibrary(user.uid);
      console.log('🎯 เกมในคลัง:', this.library);
    } catch (err: any) {
      console.error('❌ โหลดคลังเกมล้มเหลว:', err);
      alert(err.error?.message || 'เกิดข้อผิดพลาดในการโหลดคลังเกม');
    } finally {
      this.isLoading = false;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderAdmin } from '../../../components/header-admin/header-admin';
import { Game } from '../../../services/api/game';

@Component({
  selector: 'app-a-user',
  standalone: true,
  imports: [CommonModule, HeaderAdmin, RouterLink],
  templateUrl: './a-user.html',
  styleUrls: ['./a-user.scss'],
})
export class AUser implements OnInit {
  users: any[] = [];
  isLoading = true;

  constructor(private gameService: Game) {}

  async ngOnInit() {
    try {
      this.isLoading = true;
      this.users = await this.gameService.getAllUsers();
      console.log('👥 ผู้ใช้ทั้งหมด:', this.users);
    } catch (err) {
      console.error('❌ โหลดข้อมูลผู้ใช้ล้มเหลว:', err);
    } finally {
      this.isLoading = false;
    }
  }
}

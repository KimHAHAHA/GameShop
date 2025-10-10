import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderAdmin } from '../../../components/header-admin/header-admin';
import { Game } from '../../../services/api/game';

@Component({
  selector: 'app-a-history',
  standalone: true,
  imports: [CommonModule, HeaderAdmin],
  templateUrl: './a-history.html',
  styleUrls: ['./a-history.scss'],
})
export class AHistory implements OnInit {
  user: any = null;
  history: any[] = [];
  isLoading = true;

  constructor(private route: ActivatedRoute, private gameService: Game) {}

  async ngOnInit() {
    const uid = this.route.snapshot.paramMap.get('uid'); // รับ id จาก router เช่น /a_history/1
    if (!uid) return;

    try {
      this.isLoading = true;
      const res: any = await this.gameService.getUserTransactions1(Number(uid));

      // ✅ เก็บข้อมูล user และ history
      this.user = {
        name: res.user_name || `User ID ${uid}`,
        email: res.email || 'N/A',
      };
      this.history = res.history || [];

      console.log('🎯 โหลดประวัติสำเร็จ:', this.history);
    } catch (err) {
      console.error('❌ โหลดประวัติผู้ใช้ล้มเหลว:', err);
    } finally {
      this.isLoading = false;
    }
  }
}

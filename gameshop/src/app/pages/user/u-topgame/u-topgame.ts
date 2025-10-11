import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Header } from '../../../components/header/header';
import { Game } from '../../../services/api/game';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-u-topgame',
  standalone: true,
  imports: [CommonModule, RouterLink, Header, FormsModule],
  templateUrl: './u-topgame.html',
  styleUrl: './u-topgame.scss',
})
export class UTopgame implements OnInit {
  topGames: any[] = [];
  isLoading = true;
  selectedDate: string = '';

  constructor(private gameService: Game) {}

  async ngOnInit() {
    await this.loadTopGames();
  }

  async loadTopGames(date?: string) {
    try {
      this.isLoading = true;
      const res: any = await this.gameService.getTopGames(date);
      this.topGames = res.top_games || [];
      console.log('🎯 โหลด Top Games:', this.topGames);
    } catch (err) {
      console.error('❌ โหลด Top Games ล้มเหลว:', err);
      alert('ไม่สามารถโหลดข้อมูล Top Games ได้');
    } finally {
      this.isLoading = false;
    }
  }

  // ✅ เมื่อคลิกค้นหาตามวันที่
  async onSearchDate() {
    if (!this.selectedDate) {
      await this.loadTopGames();
    } else {
      await this.loadTopGames(this.selectedDate);
    }
  }
}

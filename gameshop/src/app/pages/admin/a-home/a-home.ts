import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderAdmin } from '../../../components/header-admin/header-admin';
import { Game } from '../../../services/api/game';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-a-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderAdmin],
  templateUrl: './a-home.html',
  styleUrls: ['./a-home.scss'],
})
export class AHome implements OnInit {
  filteredGames: any[] = [];
  games: any[] = [];
  searchText = '';
  isLoading = true;
  activeCategory = 'All';

  constructor(private gameService: Game) {}

  async ngOnInit() {
    try {
      this.isLoading = true;
      this.games = await this.gameService.getAllGames();
      this.filteredGames = [...this.games]; // ✅ ตั้งค่าตอนโหลดเสร็จ
      console.log('🎮 โหลดเกมทั้งหมด:', this.games);
    } catch (err) {
      console.error('❌ โหลดเกมล้มเหลว:', err);
    } finally {
      this.isLoading = false;
    }
  }

  async onSearch() {
    const text = this.searchText.trim();
    if (!text) {
      this.filteredGames = [...this.games];
      return;
    }

    try {
      this.isLoading = true;
      console.log('🔍 กำลังค้นหา:', text);
      this.filteredGames = await this.gameService.searchGames(text);
      console.log('✅ ผลลัพธ์:', this.filteredGames);
    } catch (err) {
      console.error('❌ ค้นหาล้มเหลว:', err);
    }
  }

  filterByCategory(category: string, event?: Event) {
    event?.preventDefault(); // ✅ ป้องกันไม่ให้ href="#" ทำให้รีโหลดหน้า

    if (category === 'All') {
      this.filteredGames = [...this.games];
    } else {
      this.filteredGames = this.games.filter(
        (g) => g.category?.toLowerCase() === category.toLowerCase()
      );
    }

    this.activeCategory = category;
    console.log('🎯 เลือกหมวด:', category);
  }
}

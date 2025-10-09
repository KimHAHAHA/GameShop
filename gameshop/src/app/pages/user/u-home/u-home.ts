import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { RouterLink } from '@angular/router';
import { Game } from '../../../services/api/game';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-u-home',
  imports: [CommonModule, FormsModule, RouterLink, Header],
  templateUrl: './u-home.html',
  styleUrl: './u-home.scss',
})
export class UHome {
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

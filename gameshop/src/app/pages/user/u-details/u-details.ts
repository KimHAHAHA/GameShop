import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { CommonModule } from '@angular/common';
import { Game } from '../../../services/api/game';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-u-details',
  imports: [CommonModule, Header],
  templateUrl: './u-details.html',
  styleUrl: './u-details.scss',
})
export class UDetails {
  game: any = null;
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
}

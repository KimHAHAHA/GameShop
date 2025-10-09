import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  showPopup = false;

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
}

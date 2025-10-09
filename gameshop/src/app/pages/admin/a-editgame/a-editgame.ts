import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Game } from '../../../services/api/game';
import { HeaderAdmin } from '../../../components/header-admin/header-admin';

@Component({
  selector: 'app-a-editgame',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderAdmin],
  templateUrl: './a-editgame.html',
  styleUrls: ['./a-editgame.scss'],
})
export class AEditgame implements OnInit {
  game: any = {
    title: '',
    category: '',
    price: 0,
    description: '',
    image_url: '',
  };
  imageFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private gameService: Game,
    private router: Router
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    try {
      this.game = await this.gameService.getGameById(id);
      this.previewUrl = this.game.image_url;
    } catch (err) {
      console.error('❌ โหลดข้อมูลเกมไม่สำเร็จ:', err);
    } finally {
      this.isLoading = false;
    }
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.previewUrl = e.target?.result ?? null;
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit() {
    try {
      this.isLoading = true;
      const formData = new FormData();
      formData.append('title', this.game.title);
      formData.append('category', this.game.category);
      formData.append('price', this.game.price.toString());
      formData.append('description', this.game.description);
      if (this.imageFile) formData.append('image', this.imageFile);

      const id = this.route.snapshot.paramMap.get('id');
      await this.gameService.updateGame(id!, formData);

      alert('✅ อัปเดตข้อมูลเกมสำเร็จ!');
      this.router.navigate(['/a_home']);
    } catch (err) {
      console.error('❌ อัปเดตเกมล้มเหลว:', err);
      alert('เกิดข้อผิดพลาดในการอัปเดต');
    } finally {
      this.isLoading = false; // ✅ โหลดเสร็จ
    }
  }
}

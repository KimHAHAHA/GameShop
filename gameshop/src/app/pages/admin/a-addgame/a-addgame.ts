import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderAdmin } from '../../../components/header-admin/header-admin';
import { Game } from '../../../services/api/game';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-a-addgame',
  standalone: true,
  imports: [HeaderAdmin, FormsModule, CommonModule],
  templateUrl: './a-addgame.html',
  styleUrls: ['./a-addgame.scss'], // ✅ ต้องเป็น styleUrls (มี s)
})
export class AAddgame {
  title = '';
  description = '';
  price: number | null = null;
  category = '';
  imageFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  isLoading = false;

  constructor(private game: Game, private router: Router) {}

  // ✅ เมื่อเลือกรูปภาพ
  onImageSelected(event: Event): void {
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

  // ✅ เมื่อกดปุ่มบันทึก
  async onSubmit(): Promise<void> {
    if (!this.title || !this.price || !this.category) {
      alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    try {
      this.isLoading = true;

      const formData = new FormData();
      formData.append('title', this.title.trim());
      formData.append('description', this.description.trim());
      formData.append('price', this.price.toString());
      formData.append('category', this.category.trim());
      if (this.imageFile) {
        formData.append('image', this.imageFile);
      }

      const result = await this.game.addGame(formData);
      console.log('✅ เพิ่มเกมสำเร็จ:', result);
      alert('เพิ่มเกมสำเร็จ!');
      this.router.navigate(['/a_home']); // กลับไปหน้าหลักแอดมิน
    } catch (err) {
      console.error('❌ Add game error:', err);
      alert('เกิดข้อผิดพลาดในการเพิ่มเกม');
    } finally {
      this.isLoading = false;
    }
  }
}

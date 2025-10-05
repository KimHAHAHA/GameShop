import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Router, RouterLink } from '@angular/router';
import { Game } from '../../../services/api/game';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-u-edit-profile',
  imports: [Header, RouterLink, CommonModule, FormsModule],
  templateUrl: './u-edit-profile.html',
  styleUrl: './u-edit-profile.scss',
})
export class UEditProfile {
  name = '';
  email = '';
  userImage = 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png';
  isLoading = false;

  constructor(private game: Game, private router: Router) {}

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.name = user.name || '';
      this.email = user.email || '';
      this.userImage = user.image_url || this.userImage;
    }
  }

  async onSave() {
    const userData = localStorage.getItem('user');
    if (!userData) return alert('❌ ยังไม่ได้เข้าสู่ระบบ');

    const user = JSON.parse(userData);

    if (!this.name || !this.email) {
      alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    this.isLoading = true;
    try {
      const result = await this.game.updateProfile(
        user.id,
        this.name,
        this.email
      );

      const updatedUser = { ...user, name: this.name, email: this.email };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      alert('✅ บันทึกข้อมูลสำเร็จ!');
      this.router.navigate(['/u_proflie']);
    } catch (err) {
      console.error('❌ Update error:', err);
      alert('เกิดข้อผิดพลาดในการอัปเดตข้อมูล');
    } finally {
      this.isLoading = false;
    }
  }
}

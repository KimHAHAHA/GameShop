import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Game } from '../../../services/api/game'; // ✅ service ของคุณ

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class Register {
  name = '';
  email = '';
  password = '';
  image: File | null = null;
  isLoading = false;

  constructor(private game: Game, private router: Router) {}

  // ✅ เมื่อผู้ใช้เลือกไฟล์
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) this.image = file;
  }

  // ✅ สมัครสมาชิก
async onRegister() {
  if (!this.name || !this.email || !this.password) {
    alert('กรุณากรอกข้อมูลให้ครบ');
    return;
  }

  // ✅ ตรวจสอบว่าอีเมลต้องลงท้ายด้วย @gmail.com เท่านั้น
  if (!this.email.toLowerCase().endsWith('@gmail.com')) {
    alert('กรุณาใช้อีเมลที่ลงท้ายด้วย @gmail.com เท่านั้น');
    return;
  }

  this.isLoading = true;
  const payload = {
    name: this.name,
    email: this.email,
    password: this.password,
    image: this.image || undefined,
  };

  try {
    const result = await this.game.register(payload);
    console.log('✅ สมัครสำเร็จ:', result);
    this.router.navigate(['/login']);
  } catch (err: any) {
    console.error('❌ Register error:', err);
    alert(err?.error?.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก');
  } finally {
    this.isLoading = false;
  }
}

}

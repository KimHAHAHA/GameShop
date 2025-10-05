import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Game } from '../../../services/api/game';
import { LoginRequest } from '../../../model/Request/login_post_req';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  email = '';
  password = '';
  isLoading = false;

  constructor(private game: Game, private router: Router) {}

  async onLogin() {
    if (!this.email || !this.password) {
      alert('กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }

    this.isLoading = true;
    try {
      const payload: LoginRequest = {
        email: this.email,
        password: this.password,
      };

      const result = await this.game.login(payload);
      const user = result.user;

      console.log('✅ เข้าสู่ระบบสำเร็จ:', user);
      alert('ยินดีต้อนรับ ' + user.name);

      // 🔒 เก็บข้อมูลไว้ใน localStorage
      localStorage.setItem('user', JSON.stringify(user));

      // ✅ ตรวจ role แล้วไปหน้าเฉพาะ
      if (user.role === 'admin') {
        this.router.navigate(['/a_home']); // หน้าแอดมิน
      } else if (user.role === 'user') {
        this.router.navigate(['/u_home']); // หน้าผู้ใช้ทั่วไป
      } else {
        alert('สิทธิ์ผู้ใช้งานไม่ถูกต้อง');
      }
    } catch (err: any) {
      console.error('❌ Login error:', err);
      alert('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    } finally {
      this.isLoading = false;
    }
  }
}

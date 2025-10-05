import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLogin() {
    if (this.username === 'user' && this.password === 'user') {
      this.router.navigate(['/u_home']); // ไปหน้า User
    } 
    else if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['/a_home']); // ไปหน้า Admin
    } 
    else {
      alert('ชื่อผู้ใช้หรือรหัสสผ่านไม่ถูกต้อง (ลองใช้ user หรือ admin)');
    }
  }
}

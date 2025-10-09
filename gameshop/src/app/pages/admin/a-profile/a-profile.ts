import { Component, ElementRef, ViewChild } from '@angular/core';
import { HeaderAdmin } from '../../../components/header-admin/header-admin';
import { Router } from '@angular/router';
import { Game } from '../../../services/api/game';

@Component({
  selector: 'app-a-profile',
  imports: [HeaderAdmin],
  templateUrl: './a-profile.html',
  styleUrl: './a-profile.scss',
})
export class AProfile {
  @ViewChild('fileInput') fileInput!: ElementRef;

  profileImage = 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png';
  name = '';
  email = '';
  isUploading = false;

  constructor(private router: Router, private game: Game) {}

  ngOnInit() {
    // ✅ โหลดข้อมูลจาก localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.name = user.name || '';
      this.email = user.email || '';
      this.profileImage = user.image_url || this.profileImage;
    }
  }

  // ✅ เปิด File Picker
  onImageClick() {
    this.fileInput.nativeElement.click();
  }

  // ✅ เมื่อเลือกรูปใหม่
  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const userData = localStorage.getItem('user');
    if (!userData) return alert('❌ ยังไม่ได้เข้าสู่ระบบ');

    const user = JSON.parse(userData);

    // ✅ แสดง preview ทันที
    const reader = new FileReader();
    reader.onload = (e: any) => (this.profileImage = e.target.result);
    reader.readAsDataURL(file);

    // ✅ เริ่มอัปโหลดจริง
    this.isUploading = true;
    try {
      const result = await this.game.updateProfileImage(user.id, file);

      // ✅ อัปเดตใน localStorage ด้วย
      localStorage.setItem('user', JSON.stringify(result.user));
      this.profileImage = result.user.image_url ?? this.profileImage;

      alert('✅ อัปเดตรูปภาพสำเร็จ!');
    } catch (err: any) {
      console.error('❌ Upload error:', err);
      alert('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ');
    } finally {
      this.isUploading = false;
    }
  }

  // ✅ ออกจากระบบ
  onLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}

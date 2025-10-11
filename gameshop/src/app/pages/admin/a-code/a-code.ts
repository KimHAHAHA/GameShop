import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderAdmin } from '../../../components/header-admin/header-admin';
import { Game } from '../../../services/api/game'; // ✅ import service ของคุณ

@Component({
  selector: 'app-a-code',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderAdmin],
  templateUrl: './a-code.html',
  styleUrl: './a-code.scss',
})
export class ACode implements OnInit {
  codes: any[] = [];
  newCode = '';
  newDiscount: number | null = null;
  newMaxUse: number | null = null;

  constructor(private gameService: Game) {} // ✅ ใช้ service จริง

  async ngOnInit() {
    await this.loadCodes();
  }

  async loadCodes() {
    try {
      const res: any = await this.gameService.getAllCodes(); // ✅ เรียก service ปกติ

      console.log('📦 Response จาก backend:', res);

      // ✅ Backend คืน array ตรง ๆ (ไม่ใช่ { codes: [...] })
      this.codes = Array.isArray(res) ? res : [];
    } catch (err) {
      console.error('❌ โหลดโค้ดไม่สำเร็จ:', err);
      this.codes = [];
    }
  }

  async createCode(event: Event) {
    event.preventDefault();

    if (!this.newCode || !this.newDiscount || !this.newMaxUse) {
      alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    const payload = {
      code: this.newCode,
      discount_percent: this.newDiscount,
      max_use: this.newMaxUse,
    };

    try {
      const res: any = await this.gameService.createCode(payload); // ✅ ผ่าน service
      alert(res.message || '✅ สร้างโค้ดสำเร็จ');
      this.newCode = '';
      this.newDiscount = null;
      this.newMaxUse = null;
      await this.loadCodes();
    } catch (err: any) {
      console.error('❌ สร้างโค้ดไม่สำเร็จ:', err);
      alert(err.error?.message || 'เกิดข้อผิดพลาดในการสร้างโค้ด');
    }
  }
}

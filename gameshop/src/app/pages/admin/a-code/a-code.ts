import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderAdmin } from '../../../components/header-admin/header-admin';
import { Game } from '../../../services/api/game'; // ✅ service ของคุณ

@Component({
  selector: 'app-a-code',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderAdmin],
  templateUrl: './a-code.html',
  styleUrl: './a-code.scss',
})
export class ACode implements OnInit {
  /* ---------- 🧩 ตัวแปรหลัก ---------- */
  codes: any[] = [];
  newCode = '';
  newDiscount: number | null = null;
  newMaxUse: number | null = null;

  /* ---------- ✏️ ตัวแปรสำหรับ popup แก้ไข ---------- */
  showEditPopup = false;
  editData: any = {
    id: null,
    code: '',
    discount_percent: null,
    max_use: null,
  };

  constructor(private gameService: Game) {}

  /* ---------- 🚀 โหลดข้อมูลเมื่อเริ่ม ---------- */
  async ngOnInit() {
    await this.loadCodes();
  }

  /* ---------- 📦 ดึงข้อมูลโค้ดจาก backend ---------- */
  async loadCodes() {
    try {
      const res: any = await this.gameService.getAllCodes();
      console.log('📦 Response จาก backend:', res);
      this.codes = Array.isArray(res) ? res : res.codes || [];
    } catch (err) {
      console.error('❌ โหลดโค้ดไม่สำเร็จ:', err);
      this.codes = [];
    }
  }

  /* ---------- 🆕 สร้างโค้ดใหม่ ---------- */
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
      const res: any = await this.gameService.createCode(payload);
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

  /* ---------- 🗑️ ลบโค้ด ---------- */
  async deleteCode(c: any) {
    // 🔎 ตรวจสอบว่า backend ส่ง id อะไรมา เช่น code_id หรือ id
    const id = c.id || c.code_id || c.gid;
    if (!id) {
      alert('ไม่พบ ID ของโค้ดนี้');
      return;
    }

    if (!confirm(`คุณต้องการลบโค้ด "${c.code}" หรือไม่?`)) return;

    try {
      const res: any = await this.gameService.deleteCode(id);
      alert(res.message || '✅ ลบโค้ดเรียบร้อยแล้ว');
      await this.loadCodes();
    } catch (err) {
      console.error('❌ ลบโค้ดไม่สำเร็จ:', err);
      alert('เกิดข้อผิดพลาดในการลบโค้ด');
    }
  }

  /* ---------- ✏️ เปิด popup แก้ไข ---------- */
  openEditPopup(c: any) {
    // ✅ รองรับกรณี backend ส่ง key ที่ไม่ใช่ id
    this.editData = {
      id: c.id || c.code_id || c.gid || null,
      code: c.code,
      discount_percent: c.discount_percent,
      max_use: c.max_use,
    };
    console.log('🟢 เปิด popup แก้ไข:', this.editData);
    this.showEditPopup = true;
  }

  /* ---------- ❌ ปิด popup แก้ไข ---------- */
  closeEditPopup() {
    this.showEditPopup = false;
  }

  /* ---------- 💾 บันทึกข้อมูลที่แก้ไข ---------- */
  async saveEdit() {
    const id = this.editData.id || this.editData.code_id;
    if (!id) {
      alert('ไม่พบข้อมูลโค้ดที่ต้องการแก้ไข');
      return;
    }

    const payload = {
      code: this.editData.code,
      discount_percent: this.editData.discount_percent,
      max_use: this.editData.max_use,
    };

    try {
      const res: any = await this.gameService.updateCode(id, payload);
      alert(res.message || '✅ แก้ไขโค้ดสำเร็จ');
      this.closeEditPopup();
      await this.loadCodes();
    } catch (err) {
      console.error('❌ แก้ไขโค้ดไม่สำเร็จ:', err);
      alert('เกิดข้อผิดพลาดในการแก้ไขโค้ด');
    }
  }
}

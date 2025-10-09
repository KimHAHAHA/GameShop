import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../../components/header/header';
import { Game } from '../../../services/api/game'; // ✅ ใช้ service เดิม

@Component({
  selector: 'app-u-wallet',
  standalone: true,
  imports: [Header, CommonModule, FormsModule],
  templateUrl: './u-wallet.html',
  styleUrls: ['./u-wallet.scss'],
})
export class UWallet implements OnInit {
  uid!: number;
  balance = 0;
  customAmount: number | null = null;
  isLoading = false;
  history: any[] = [];

  constructor(private gameService: Game) {}

  async ngOnInit() {
    // ✅ ดึงข้อมูลผู้ใช้จาก localStorage ผ่าน Game service
    const user = this.gameService.getUser();
    if (!user || !user.uid) {
      alert('กรุณาเข้าสู่ระบบก่อนใช้งาน Wallet');
      return;
    }

    this.uid = user.uid;
    await this.loadWalletData();
  }

  // ✅ โหลดยอดเงินและประวัติ
  async loadWalletData() {
    try {
      this.isLoading = true;
      this.balance = await this.gameService.getBalance(this.uid);
      this.history = await this.gameService.getTransactions(this.uid);
    } catch (err) {
      console.error('❌ โหลดข้อมูล wallet ล้มเหลว:', err);
    } finally {
      this.isLoading = false;
    }
  }

  // ✅ ฟังก์ชันเติมเงิน
  async onTopup() {
    if (!this.customAmount || this.customAmount <= 0) {
      alert('⚠️ กรุณากรอกจำนวนเงินให้ถูกต้อง');
      return;
    }

    try {
      this.isLoading = true;
      const res: any = await this.gameService.topup(
        this.uid,
        this.customAmount
      );

      alert(`✅ เติมเงินสำเร็จ ${this.customAmount} บาท`);
      this.balance = res.new_balance;
      this.customAmount = null;

      // ✅ โหลดประวัติใหม่
      await this.loadWalletData();
    } catch (err) {
      console.error('❌ เติมเงินล้มเหลว:', err);
      alert('เกิดข้อผิดพลาดในการเติมเงิน');
    } finally {
      this.isLoading = false;
    }
  }
}

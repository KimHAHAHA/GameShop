import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../config/constants';
import { lastValueFrom } from 'rxjs';
import { LoginRequest } from '../../model/Request/login_post_req';
import { LoginResponse } from '../../model/Response/login_get_res';
import { RegisterRequest } from '../../model/Request/register_post_req';
import { RegisterResponse } from '../../model/Response/register_post_res';
import { UpdateProfileResponse } from '../../model/Response/UpdateProfile_put_res';

@Injectable({
  providedIn: 'root',
})
export class Game {
  constructor(private constants: Constants, private http: HttpClient) {}

  public async login(payload: LoginRequest): Promise<LoginResponse> {
    const url = this.constants.API_ENDPOINT + '/users/login';
    const response = await lastValueFrom(this.http.post(url, payload));

    const result = response as LoginResponse;

    // ✅ เก็บข้อมูล user ไว้ใน localStorage
    if (result && result.user) {
      localStorage.setItem('user', JSON.stringify(result.user));
      console.log('✅ บันทึกข้อมูลผู้ใช้แล้ว:', result.user);
    }

    return result;
  }

  // ✅ ดึงข้อมูลผู้ใช้จาก localStorage (ใช้ในหน้า profile)
  public getUser() {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

  public async register(payload: RegisterRequest): Promise<RegisterResponse> {
    const url = this.constants.API_ENDPOINT + '/users/register';

    // ถ้ามีรูปภาพ -> ใช้ FormData
    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('email', payload.email);
    formData.append('password', payload.password);

    if (payload.image) {
      formData.append('image', payload.image);
    }

    const response = await lastValueFrom(
      this.http.post(url, formData, { reportProgress: true })
    );

    return response as RegisterResponse;
  }

  public async updateProfile(
    id: number,
    name: string,
    email: string
  ): Promise<UpdateProfileResponse> {
    const url = this.constants.API_ENDPOINT + '/users/update';
    const payload = { id, name, email };
    const response = await lastValueFrom(this.http.put(url, payload));
    const result = response as UpdateProfileResponse;

    // อัปเดตข้อมูลใหม่ใน localStorage
    if (result && result.user) {
      localStorage.setItem('user', JSON.stringify(result.user));
      console.log('✅ โปรไฟล์อัปเดตแล้ว:', result.user);
    }

    return result;
  }

  // ✅ อัปเดตรูปภาพ (image เท่านั้น)
  public async updateProfileImage(
    id: number,
    file: File
  ): Promise<UpdateProfileResponse> {
    const url = this.constants.API_ENDPOINT + '/users/update-image';
    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('image', file);

    const response = await lastValueFrom(this.http.put(url, formData));
    const result = response as UpdateProfileResponse;

    if (result && result.user) {
      localStorage.setItem('user', JSON.stringify(result.user));
      console.log('✅ อัปเดตรูปภาพแล้ว:', result.user);
    }

    return result;
  }

  public async addGame(formData: FormData): Promise<any> {
    const url = this.constants.API_ENDPOINT + '/game';
    const response = await lastValueFrom(this.http.post(url, formData));
    return response;
  }

  public async getAllGames(): Promise<any[]> {
    const url = this.constants.API_ENDPOINT + '/game';
    const response = await lastValueFrom(this.http.get(url));
    return response as any[];
  }

  public async getGameById(id: string): Promise<any> {
    const url = this.constants.API_ENDPOINT + `/game/${id}`;
    const response = await lastValueFrom(this.http.get(url));
    return response;
  }

  public async updateGame(id: string, formData: FormData): Promise<any> {
    const url = this.constants.API_ENDPOINT + `/game/${id}`;
    const response = await lastValueFrom(this.http.put(url, formData));
    return response;
  }

  public async searchGames(query: string): Promise<any[]> {
    const url = `${
      this.constants.API_ENDPOINT
    }/game/search?q=${encodeURIComponent(query)}`;
    const response = await lastValueFrom(this.http.get(url));
    return response as any[];
  }

  public async getBalance(uid: number): Promise<number> {
    const url = `${this.constants.API_ENDPOINT}/users/${uid}`;
    const response: any = await lastValueFrom(this.http.get(url));
    return response.wallet_balance ?? 0;
  }

  // ✅ เติมเงิน
  public async topup(uid: number, amount: number): Promise<any> {
    const body = { uid, amount };
    const response = await lastValueFrom(
      this.http.post(`${this.constants.API_ENDPOINT}/users/topup`, body)
    );
    return response;
  }

  // ✅ ดึงประวัติการทำรายการ
  public async getTransactions(uid: number): Promise<any[]> {
    const url = `${this.constants.API_ENDPOINT}/transactions/${uid}`;
    const response: any = await lastValueFrom(this.http.get(url));
    return response.history ?? []; // ✅ ดึงเฉพาะ history
  }

  public async getUserTransactions1(uid: number): Promise<any> {
    const url = `${this.constants.API_ENDPOINT}/transactions/admin/${uid}`;
    const response = await lastValueFrom(this.http.get(url));
    return response;
  }

  public async getAllUsers(): Promise<any[]> {
    const url = `${this.constants.API_ENDPOINT}/users/all`;
    const response = await lastValueFrom(this.http.get(url));
    return response as any[];
  }

  // ✅ ซื้อเกม
  public async purchaseGame(
    user_id: number,
    game_id: number,
    price?: number // ✅ เพิ่มพารามิเตอร์ optional
  ): Promise<any> {
    // ✅ ส่งข้อมูลราคาไปด้วยถ้ามี
    const body: any = { user_id, game_id };
    if (price !== undefined) {
      body.price = price;
    }

    const url = `${this.constants.API_ENDPOINT}/game/purchase`;
    const response = await lastValueFrom(this.http.post(url, body));
    return response;
  }

  // ✅ เพิ่มเกมลงตะกร้า
  public async addToCart(user_id: number, game_id: number): Promise<any> {
    const body = { user_id, game_id };
    const url = `${this.constants.API_ENDPOINT}/cart_items`;
    const response = await lastValueFrom(this.http.post(url, body));
    return response;
  }

  // ✅ ดึงเกมในตะกร้า
  public async getCart(uid: number): Promise<any[]> {
    const url = `${this.constants.API_ENDPOINT}/cart_items/${uid}`;
    const res: any = await lastValueFrom(this.http.get(url));
    return res || [];
  }

  // ✅ ลบเกมออกจากตะกร้า
  public async removeFromCart(uid: number, gameId: number): Promise<any> {
    const url = `${this.constants.API_ENDPOINT}/cart_items/${uid}/${gameId}`;
    const res: any = await lastValueFrom(this.http.delete(url));
    return res;
  }

  // ✅ Checkout (ซื้อทุกเกมในตะกร้า)
  async checkout(user_id: number, discount_code?: string) {
    const url = `${this.constants.API_ENDPOINT}/cart_items/checkout/${user_id}`;
    return await lastValueFrom(this.http.post(url, { discount_code }));
  }

  // ✅ ดึงรายชื่อเกมที่ผู้ใช้ซื้อแล้ว
  public async getUserLibrary(uid: number): Promise<any[]> {
    const url = `${this.constants.API_ENDPOINT}/game/library/${uid}`;
    const response: any = await lastValueFrom(this.http.get(url));
    return response || [];
  }

  async getTopGames(date?: string) {
    const url = date
      ? `${this.constants.API_ENDPOINT}/game/top?date=${date}`
      : `${this.constants.API_ENDPOINT}/game/top`;
    return await lastValueFrom(this.http.get(url));
  }

  async getAllCodes() {
    const url = `${this.constants.API_ENDPOINT}/discount_codes`;
    return await lastValueFrom(this.http.get(url));
  }

  // ✅ สร้างโค้ดใหม่
  async createCode(payload: any) {
    const url = `${this.constants.API_ENDPOINT}/discount_codes`;
    return await lastValueFrom(this.http.post(url, payload));
  }

  async checkDiscountCode(code: string) {
    return await lastValueFrom(
      this.http.post(
        'https://kimky-shop-backend.onrender.com/discount_codes/check',
        { code }
      )
    );
  }

  async deleteGame(id: number) {
    const url = `${this.constants.API_ENDPOINT}/game/${id}`;
    return await lastValueFrom(this.http.delete(url));
  }
}

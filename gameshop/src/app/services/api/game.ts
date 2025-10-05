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
}

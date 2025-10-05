export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  image?: File; // 👈 รองรับการอัปโหลดรูป
}

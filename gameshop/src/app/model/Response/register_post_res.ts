export interface RegisterResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    image_url?: string;
  };
}

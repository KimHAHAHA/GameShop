export interface UpdateProfileResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    image_url?: string;
  };
}

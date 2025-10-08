import { Component } from '@angular/core';
import { Header } from "../../../components/header/header";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-a-addgame',
  imports: [Header, RouterLink],
  templateUrl: './a-addgame.html',
  styleUrl: './a-addgame.scss'
})
export class AAddgame {
  previewUrl: string | ArrayBuffer | null = null;

  onImageSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    // ✅ แก้ตรงนี้ — ระบุ type ให้ชัดเจนและ cast เป็น string
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.previewUrl = e.target?.result as string | ArrayBuffer;
    };

    reader.readAsDataURL(file);
  }
}
}

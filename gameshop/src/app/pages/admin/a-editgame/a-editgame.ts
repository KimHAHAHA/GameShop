import { Component } from '@angular/core';
import { Header } from "../../../components/header/header";
import { HeaderAdmin } from "../../../components/header-admin/header-admin";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-a-editgame',
  imports: [ HeaderAdmin,RouterLink],
  templateUrl: './a-editgame.html',
  styleUrl: './a-editgame.scss'
})
export class AEditgame {
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

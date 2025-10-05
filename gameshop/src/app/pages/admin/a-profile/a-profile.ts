import { Component, ElementRef, ViewChild } from '@angular/core';
import { HeaderAdmin } from "../../../components/header-admin/header-admin";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-a-profile',
  imports: [HeaderAdmin, RouterLink],
  templateUrl: './a-profile.html',
  styleUrl: './a-profile.scss'
})
export class AProfile {
  @ViewChild('fileInput') fileInput!: ElementRef;
  profileImage = 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png';

  onImageClick() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}

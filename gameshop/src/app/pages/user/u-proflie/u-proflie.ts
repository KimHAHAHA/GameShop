import { Component, ElementRef, ViewChild } from '@angular/core';
import { Header } from "../../../components/header/header";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-u-proflie',
  imports: [Header, RouterLink],
  templateUrl: './u-proflie.html',
  styleUrl: './u-proflie.scss'
})
export class UProflie {
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

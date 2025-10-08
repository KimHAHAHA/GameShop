import { Component } from '@angular/core';
import { Header } from "../../../components/header/header";
import { RouterLink } from '@angular/router';
import { HeaderAdmin } from "../../../components/header-admin/header-admin";

@Component({
  selector: 'app-a-details',
  imports: [ RouterLink, HeaderAdmin],
  templateUrl: './a-details.html',
  styleUrl: './a-details.scss'
})
export class ADetails {
  showPopup = false;

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
}

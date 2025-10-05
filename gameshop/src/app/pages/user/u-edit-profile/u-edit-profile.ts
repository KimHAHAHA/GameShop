import { Component } from '@angular/core';
import { Header } from "../../../components/header/header";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-u-edit-profile',
  imports: [Header, RouterLink],
  templateUrl: './u-edit-profile.html',
  styleUrl: './u-edit-profile.scss'
})
export class UEditProfile {

}

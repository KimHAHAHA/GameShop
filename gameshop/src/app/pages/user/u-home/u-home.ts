import { Component } from '@angular/core';
import { Header } from "../../../components/header/header";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-u-home',
  imports: [Header,RouterLink],
  templateUrl: './u-home.html',
  styleUrl: './u-home.scss'
})
export class UHome {

}

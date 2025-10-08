import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderAdmin } from "../../../components/header-admin/header-admin";

@Component({
  selector: 'app-a-home',
  imports: [ HeaderAdmin,RouterLink],
  templateUrl: './a-home.html',
  styleUrl: './a-home.scss'
})
export class AHome {

}

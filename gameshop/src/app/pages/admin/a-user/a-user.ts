import { Component } from '@angular/core';
import { HeaderAdmin } from "../../../components/header-admin/header-admin";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-a-user',
  imports: [HeaderAdmin, RouterLink],
  templateUrl: './a-user.html',
  styleUrl: './a-user.scss'
})
export class AUser {

}

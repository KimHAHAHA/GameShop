import { Component } from '@angular/core';
import { HeaderAdmin } from "../../../components/header-admin/header-admin";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-a-profile',
  imports: [HeaderAdmin, RouterLink],
  templateUrl: './a-profile.html',
  styleUrl: './a-profile.scss'
})
export class AProfile {

}

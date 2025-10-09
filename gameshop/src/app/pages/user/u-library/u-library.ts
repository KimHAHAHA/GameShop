import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from "../../../components/header/header";

@Component({
  selector: 'app-u-library',
  imports: [RouterLink, Header],
  templateUrl: './u-library.html',
  styleUrl: './u-library.scss'
})
export class ULibrary {

}

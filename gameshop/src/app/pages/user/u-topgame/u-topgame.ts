import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from "../../../components/header/header";

@Component({
  selector: 'app-u-topgame',
  imports: [RouterLink, Header],
  templateUrl: './u-topgame.html',
  styleUrl: './u-topgame.scss'
})
export class UTopgame {

}

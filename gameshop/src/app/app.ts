import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AHome } from "./pages/admin/a-home/a-home";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AHome],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('gameshop');
}

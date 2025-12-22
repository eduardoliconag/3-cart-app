import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardAppComponent } from './components/card-app/card-app.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardAppComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = '3-card-app';
}

import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LoaderComponent} from "./components/landing/loader/loader.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations : [
    
  ]
})
export class AppComponent {




}

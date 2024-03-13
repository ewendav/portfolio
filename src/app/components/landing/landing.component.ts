import { Component } from '@angular/core';
import {LoaderComponent} from "./loader/loader.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}

import { Component } from '@angular/core';
import {LoaderComponent} from "./loader/loader.component";
import {HeroComponent} from "./hero/hero.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [LoaderComponent, HeroComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}

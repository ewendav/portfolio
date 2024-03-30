import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {LoaderComponent} from "./loader/loader.component";
import {HeroComponent} from "./hero/hero.component";
import {PortfolioComponent} from "./portfolio/portfolio.component";
import {ContactComponent} from "./contact/contact.component";
import {SharedEventsService} from "../../services/shared-events.service";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [LoaderComponent, HeroComponent, PortfolioComponent, ContactComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements AfterViewInit{


  heroEl!: HTMLElement | null
  pfEl!: HTMLElement | null
  contactEl!: HTMLElement  | null

  prevSection!: HTMLElement  | null
  nextSection!: HTMLElement  | null

  scrolling = false

  constructor(private dataService : SharedEventsService) {
  }


  ngAfterViewInit() {

    this.heroEl = document.querySelector('app-hero')
    this.pfEl = document.querySelector('app-portfolio')
    this.contactEl = document.querySelector('app-contact')
    this.nextSection = this.pfEl
    this.prevSection = this.heroEl

  }


  @HostListener('window:wheel', ['$event'])
  onWheel(event : WheelEvent){

    if(!this.scrolling && !this.dataService.itemOpen){

    this.scrolling = true


      if(this.heroEl && this.pfEl && this.contactEl && this.nextSection && this.prevSection){

      if (window.scrollY >= 0 && window.scrollY < this.pfEl.offsetTop) {
        this.prevSection = this.heroEl;
        this.nextSection = this.pfEl
      } else if (window.scrollY >= this.pfEl.offsetTop && window.scrollY < this.contactEl.offsetTop) {
        this.prevSection = this.heroEl;
        this.nextSection = this.contactEl
      } else if (window.scrollY >= this.contactEl.offsetTop) {
        this.prevSection = this.pfEl;
        this.nextSection = this.contactEl
      }

    if(event.deltaY > 0){
        this.nextSection.scrollIntoView({behavior : 'smooth', block : 'start'})
      }else{
      if(this.prevSection === this.heroEl){
        window.scrollTo({
          top : 0,
          behavior : "smooth"
        })
      }else{
        this.prevSection.scrollIntoView({behavior : 'smooth', block : 'start'})
      }
      }

    setTimeout(()=>{
      this.scrolling = false
    },500)
      }



    }


  }

}

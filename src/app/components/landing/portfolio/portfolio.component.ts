import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener, OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild, ViewChildren
} from '@angular/core';
import {PortfolioItemImgComponent} from "./portfolio-item-img/portfolio-item-img.component";
import {SharedEventsService} from "../../../services/shared-events.service";
import {CursorComponent} from "./cursor/cursor.component";
import {animate, query, stagger, state, style, transition, trigger} from "@angular/animations";
import {window} from "rxjs";

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    PortfolioItemImgComponent,
    CursorComponent
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent implements AfterViewInit, OnDestroy{

  @ViewChildren(PortfolioItemImgComponent) allItemsImg! : QueryList<PortfolioItemImgComponent>
  @ViewChild(CursorComponent) cursorEl!: CursorComponent;

  titles!: NodeListOf<HTMLElement>;
  observerH3!:any
  mousePosition : any = {x : 0, y : 0}

  constructor(private el : ElementRef,private dataService : SharedEventsService) {
  }

  ngAfterViewInit() {
    this.titles = this.el.nativeElement.querySelectorAll('h3')
    if(this.allItemsImg){
      this.dataService.setAllItemImg(this.allItemsImg);
    }
    this.initObserveur();
  }

  ngOnDestroy() {
    if(this.el){
      this.observerH3.unobserve(this.el.nativeElement)
    }
  }

  // si 90% de la section portfolio ds le visu alors anim h3
  initObserveur(){
    this.observerH3 = new IntersectionObserver((entries)=>{
      entries.forEach(entrie=>{
        if(entrie.isIntersecting){
          this.animH3()
        }
        if(!entrie.isIntersecting){
          this.cursorEl.animationState = false;
        }
      })
    }, {threshold: .90})
    if(this.el){
      this.observerH3.observe(this.el.nativeElement)
    }
  }

  animH3(){
    let delay = 0
    this.titles.forEach((title)=>{
      setTimeout(()=>{
        title.classList.add('showTitles')
      },delay)
      delay += 300
    })
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mousePosition = {
      x : event.clientX,
      y : event.clientY,
    }
  }



}

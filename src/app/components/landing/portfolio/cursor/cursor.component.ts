import {Component, ElementRef, Host, HostListener, Input, Renderer2, ViewChild} from '@angular/core';
import {SharedEventsService} from "../../../../services/shared-events.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {PortfolioItemImgComponent} from "../portfolio-item-img/portfolio-item-img.component";

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [],
  templateUrl: './cursor.component.html',
  styleUrl: './cursor.component.css',
  animations: [
    trigger('dashAnimation', [
      state('false', style({ strokeDashoffset : '1000' ,fill : 'transparent'})),
      state('true', style({  strokeDashoffset : '0' ,fill : 'antiquewhite' })),
      transition('false => true', animate('1600ms ease')),
      transition('true => false', animate('600ms ease')),
    ]),
    trigger('textAnimation', [
      state('false', style({ transform : 'translateY(100%)', opacity : '0'})),
      state('true', style({ transform : 'translateY(0%)', opacity : '1'})),
      transition('false => true', animate('800ms ease-in-out')),
      transition('true => false', animate('500ms ease-in-out')),
    ]),
    trigger('mouseDown', [
      state('true', style({ width : '6vw'})),
      state('false', style({ width : '8vw'})),
      transition('false <=> true', animate(100)),
    ]),
  ],
})
export class CursorComponent {

  @Input() text!: string

  cursorTransformValue = '';
  animationState = false;

  @Input('mousePosition')
  set mousePosition(value : any){
      this.cursorTransformValue = `translate3d(calc(${value.x}px - 50%), calc(${value.y}px - 50%), 0)`;
  }

  constructor(public dataService :  SharedEventsService) {
    this.dataService.imageHover$.subscribe((value : boolean)=>{
      this.animationState = value
    })
  }



}

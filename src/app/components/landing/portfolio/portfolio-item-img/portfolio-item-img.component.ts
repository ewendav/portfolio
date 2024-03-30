import {
  AfterViewChecked, AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  HostListener,
  Input,
  OnInit, Output, QueryList,
  Renderer2,
  ViewChild
} from '@angular/core';
import {animate, query, stagger, state, style, transition, trigger} from "@angular/animations";
import {SharedEventsService} from "../../../../services/shared-events.service";
import {takeUntil, takeWhile} from "rxjs";
import {Router} from "@angular/router";
import {ProjectComponent} from "../project/project.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-portfolio-item-img',
  standalone: true,
  imports: [
    ProjectComponent,
    NgIf
  ],
  templateUrl: './portfolio-item-img.component.html',
  styleUrl: './portfolio-item-img.component.css',
  animations: [
    trigger('spacerUp', [
      state('true', style({
        height : '0%',
      })),
      state('false', style({
        height : '0%',
      })),
      transition('* => false', [
        style({height : '0'}),
      ]),
      transition('* => true', [
        style({height : '100%'}),
        animate('600ms ease-in-out')
      ])
    ]),

    trigger('spacerDown', [
      state('true', style({
        height : '0%',
      })),
      state('false', style({
        height : '0%',
      })),
      transition('* => false', [
        style({height : '0%'}),
        animate('600ms ease-in-out')
      ]),
      transition('* => true', [
        animate('600ms ease-in-out')
      ]),
    ]),

    trigger('img', [
      state('true', style({
        height : '100%',
      })),
      state('false', style({
        height : '0%',
      })),
      transition('* => false', [
        animate('600ms ease-in-out')
      ]),
      transition('* => true', [
        animate('600ms ease-in-out')
      ]),
    ]),
  ]
})
export class PortfolioItemImgComponent implements  AfterViewInit{


  @Input() title!: string;
  @Input() bcImgSrc!: string;

  @ViewChild('spacerUp') spacerUp!: ElementRef;
  @ViewChild('spacerDown') spacerDown!: ElementRef;
  @ViewChild('img') img!: ElementRef;
  @ViewChild('itemEl') itemEl!: ElementRef;

  animationRunning : boolean = false
  public awaitEndAllAnim : boolean = false;
  public showImage : boolean = false;
  public mouseOver : boolean = false;
  public itemCLickable : boolean = false

  // item open
  public itemOpenLocal : boolean = false

  constructor(public dataService : SharedEventsService) {
  }

  ngAfterViewInit() {
  this.dataService.noImgAnimating$.subscribe(()=>{
      if(this.awaitEndAllAnim){
        if(this.mouseOver){
          this.changeImageStatus(true)
        }else{
          this.changeImageStatus(false)
        }
      }
    })
  }

  changeImageStatus(show : boolean){

    if(show && !this.dataService.itemOpen){
      if(this.mouseOver && this.dataService.areAllImgsDown()){
        this.showImage = true
        this.dataService.imageHover(true)
        this.awaitEndAllAnim = false;
      }else{
        this.awaitEndAllAnim = true;
      }
    }else{
      if(!this.mouseOver && this.dataService.areAllAnimationFinish() && !this.dataService.itemOpen){
        this.showImage = false
        this.awaitEndAllAnim = false;
      }else {
        this.awaitEndAllAnim = true;
      }
    }
  }

  onAnimationEvent(event : any){
    this.animationRunning = event.phaseName !== 'done'
    this.dataService.imgIsAnimating()
    this.itemCLickable = event.phaseName === 'done' && this.showImage
  }


  @HostListener('mouseenter')
  onMouseEnter(){
    this.mouseOver = true
    this.changeImageStatus(true)
  }

  @HostListener('mouseleave')
  onMouseLeave(){
    if(!this.itemOpenLocal){
      this.mouseOver = false
      this.dataService.imageHover(false)
      this.changeImageStatus(false)
    }
  }

  @HostListener('mousedown')
  onMouseup(){
    if(this.itemCLickable){
      this.dataService.mouseDown = true;
      this.dataService.mouseUp = false;
    }
  }

  @HostListener('mouseup')
  onMouseDown(){
    if(this.itemCLickable){
      this.dataService.mouseUp = true;
      this.dataService.mouseDown = false;
      this.dataService.changeItemState(this.title, true)
      this.dataService.setImageOpen(true)
      this.itemOpenLocal = true
    }
  }

closeItem(){
  this.dataService.changeItemState(this.title, false)
  this.dataService.setImageOpen(false)
  this.itemOpenLocal = false
}


}

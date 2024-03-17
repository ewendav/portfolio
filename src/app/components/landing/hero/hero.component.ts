import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {DraggableDirective} from "../../../directives/draggable/draggable.directive";
import {animate, style, transition, trigger} from "@angular/animations";
import {startGame} from "../../../../assets/scripts/game/game";

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  imports: [
    DraggableDirective,
  ],
  styleUrl: './hero.component.css',
  animations: [trigger('fade', [
    transition(':leave',
      animate(500,style({opacity:0}))
    ),
    transition(':enter',[
      style({opacity : 0}),
      animate(500,style({opacity:1}))
      ]
    ),
  ]),
  ]
})
export class HeroComponent implements AfterViewInit{

  @ViewChild('invA1') invA1!: ElementRef;
  @ViewChild('invA2') invA2!: ElementRef;
  @ViewChild('invB1') invB1!: ElementRef;
  @ViewChild('invB2') invB2!: ElementRef;
  @ViewChild('invC1') invC1!: ElementRef;
  @ViewChild('invC2') invC2!: ElementRef;
  invadersHelloAnimating : boolean = false;
  instructionDisplayed : boolean = false;

  @ViewChild('headerNameElement') headerNameElement!: ElementRef;
  @ViewChild('headerBracketElement1') headerBracketElement1!: ElementRef;
  @ViewChild('headerBracketElement2') headerBracketElement2!: ElementRef;

  private resetDraggableWindow= new CustomEvent('resetDraggableWndow')


  constructor() {
  }

  ngAfterViewInit() {
    startGame()
  }

  emitResetWindowEvent(elementToEmitIn : HTMLElement){
    elementToEmitIn.dispatchEvent(this.resetDraggableWindow)
  }

  displayInstruction(instructionsEl : HTMLElement, status : boolean){
    if(status && !this.instructionDisplayed){
      this.instructionDisplayed = true
      instructionsEl.style.visibility = 'visible';
      instructionsEl.style.top = ''
      instructionsEl.style.left = ''
    }else{
      this.instructionDisplayed = false
      instructionsEl.style.visibility = 'hidden';
    }
  }


  invadersHelloAnimation(){
    if(this.invA1 && this.invA2 && this.invB1 && this.invB2 && this.invC1 && this.invC2 && !this.invadersHelloAnimating){
      this.invadersHelloAnimating = true
      this.invA1.nativeElement.style.right = '-2.7vw'
      this.invB1.nativeElement.style.bottom = '-2.9vw'
      this.invC1.nativeElement.style.top = '-2.5vw'

      setTimeout(()=>{
        this.invA1.nativeElement.style.opacity = '0'
        this.invB1.nativeElement.style.opacity = '0'
        this.invC1.nativeElement.style.opacity = '0'

        this.invA2.nativeElement.style.opacity = '1'
        this.invB2.nativeElement.style.opacity = '1'
        this.invC2.nativeElement.style.opacity = '1'

        setTimeout(()=> {
          this.invA2.nativeElement.style.opacity = '0'
          this.invB2.nativeElement.style.opacity = '0'
          this.invC2.nativeElement.style.opacity = '0'

          this.invA1.nativeElement.style.opacity = '1'
          this.invB1.nativeElement.style.opacity = '1'
          this.invC1.nativeElement.style.opacity = '1'

          this.invA1.nativeElement.style.right = ''
          this.invB1.nativeElement.style.bottom = ''
          this.invC1.nativeElement.style.top = ''

          setTimeout(()=>{
            this.invadersHelloAnimating = false;
          },1000)

        },500)

      },1000)

    }

  }


  @HostListener('document:loaderGone')
  onPageShow(){
    console.log('gone')

    if(this.headerNameElement && this.headerNameElement){
      this.headerNameElement.nativeElement.style.animation = 'name 1s 200ms forwards';
        this.headerBracketElement2.nativeElement.style.animation ='bracket2 2s 1s forwards ';

        setTimeout(()=>{
          this.headerNameElement.nativeElement.style.transform = 'translateX(0)'
          this.headerNameElement.nativeElement.style.animation = 'cube 6s ease-in-out infinite';
        },3000)
    }
  }

  @HostListener('document:invaderScrollTo', ['$event'])
  onInvaderScrollTo(event : CustomEvent){
    console.log(event.detail)
  }
}

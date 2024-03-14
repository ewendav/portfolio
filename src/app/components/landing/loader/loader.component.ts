import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {NgIf} from "@angular/common";
import {filter, Subject, takeUntil} from "rxjs";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
  animations: [trigger('killComponent', [
    transition(':leave',
        animate('700ms 300ms ease',style({bottom:'-110%'}))
      ),
    ]),
  ]
})
export class LoaderComponent implements OnInit, AfterViewInit {

  @ViewChild('ball') ball!: ElementRef;
  @ViewChild('ballPath') ballPath!: ElementRef;

  private point!:DOMPoint
  distance : number = 1;
  totalLength : number = 0;

  hideLogo : boolean = false;
  stopAnimation : boolean = false;
  killComponent : boolean = false;

  loadingTime : number = 0;
  loadingTimerInterval : any;

  unSubscribeRouter$ : Subject<void> = new Subject<void>

  constructor(private router: Router) { }

  ngOnInit() {

    // timer temps de visualisation du loader
    setInterval(()=>{
      this.loadingTime += .5
    },500)

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd || event instanceof NavigationStart),
      takeUntil(this.unSubscribeRouter$)
    ).subscribe((event : any) => {
      // qd la page est chargée
      if (event instanceof NavigationEnd) {
        //si le loader a été vu plus de 2 sec
        if(this.loadingTime > 2){
          this.fnPageLoaded();
        }else{
          setTimeout(()=>{
            this.fnPageLoaded();
          },2000)
        }
      }
    });
  }

  ngAfterViewInit () {
    if(this.ball && this.ballPath){
      this.totalLength = (this.ballPath.nativeElement as SVGGeometryElement).getTotalLength();
      requestAnimationFrame(()=>{
        this.animateBallLoader()
      })
    }
  }

  animateBallLoader(){
    if(!this.killComponent){
      this.point = this.ballPath.nativeElement.getPointAtLength(this.distance);

      this.ball.nativeElement.setAttribute('cx', this.point.x.toString());
      this.ball.nativeElement.setAttribute('cy', this.point.y.toString());

      if(this.distance >= this.totalLength){
        this.distance = 0
      }
      this.distance += 0.6;

      requestAnimationFrame(() => {
        this.animateBallLoader();
      });
    }
  }

  fnPageLoaded(){
    clearInterval(this.loadingTimerInterval)
    this.unSubscribeRouter$.next()
    this.unSubscribeRouter$.complete()

    this.hideLogo = true;

    setTimeout(()=>{
      this.killComponent = true
      setTimeout(()=>{
        this.stopAnimation = true
      },500)
    },500)


  }

}

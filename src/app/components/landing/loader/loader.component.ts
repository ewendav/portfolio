import {AfterContentInit, AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent implements AfterViewInit {

  @ViewChild('ball') ball!: ElementRef;
  @ViewChild('ballPath') ballPath!: ElementRef;

  private point!:DOMPoint
  distance : number = 1;
  totalLength : number = 0;


  animateBallLoader(){
    if (this.distance > this.totalLength) {
      this.distance = 0;
    }
    console.log((this.ballPath.nativeElement as SVGGeometryElement).getPointAtLength(this.distance))

    this.point = (this.ballPath.nativeElement as SVGGeometryElement).getPointAtLength(this.distance)

    this.ball.nativeElement.setAttribute('cx', this.point.x);
    this.ball.nativeElement.setAttribute('cy', this.point.y);

/*    this.ball.nativeElement.style.left = `${this.point.x}px`;
    this.ball.nativeElement.style.top = `${this.point.y}px`;*/

    this.distance+=1

    requestAnimationFrame(
      ()=>{
        this.animateBallLoader()
      }
    )

  }

  ngAfterViewInit () {
    if(this.ball && this.ballPath){
      this.totalLength = (this.ballPath.nativeElement as SVGGeometryElement).getTotalLength();
      requestAnimationFrame(()=>{
        this.animateBallLoader()
      })
    }
  }

}

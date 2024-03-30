import {Injectable, QueryList, Renderer2} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {
  PortfolioItemImgComponent
} from "../components/landing/portfolio/portfolio-item-img/portfolio-item-img.component";

class InfoItemImg{
  public isAnimating : boolean = false;
  public isOpen : boolean = false;
  public isMouseOver : boolean = false;
  constructor(public title : string){}
}


@Injectable({
  providedIn: 'root'
})
export class SharedEventsService {

  public allItemsImg!: QueryList<PortfolioItemImgComponent>

  public mouseUp : boolean  =false
  public mouseDown : boolean  =false
  public itemOpen : boolean  =false

  setAllItemImg(allItem : QueryList<PortfolioItemImgComponent>){
    this.allItemsImg = allItem;
  }

  public noImgAnimatingSubj : Subject<any> = new Subject<any>()
  public noImgAnimating$ = this.noImgAnimatingSubj.asObservable();
  imgIsAnimating(){
      this.noImgAnimatingSubj.next(true)
  }

  public imageHoverSubj : Subject<any> = new Subject<any>()
  public imageHover$ = this.imageHoverSubj.asObservable();
  imageHover(value : boolean){
    this.imageHoverSubj.next(value);
  }

  areAllImgsDown(){
    return !this.allItemsImg.some(img => img.animationRunning || img.showImage)
  }

  areAllAnimationFinish(){
    return !this.allItemsImg.some(img => img.animationRunning)
  }

  changeItemState(title : string, state : boolean){
    if(state){
      this.allItemsImg.forEach((item)=>{
        if(item.title !== title){
          item.itemEl.nativeElement.style.width = '0'
        }else{
          item.itemEl.nativeElement.style.width = '100vw'
          setTimeout(()=>{
            this.imageHoverSubj.next(false);
          },100)
        }
      })
    }else {
          this.allItemsImg.forEach((item)=>{
            item.itemEl.nativeElement.style.width = '25vw'
          })
    }
  }

  setImageOpen(value : boolean){
    this.itemOpen = value
  }

}

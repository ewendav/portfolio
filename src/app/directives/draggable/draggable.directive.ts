import {AfterViewInit, Directive, ElementRef, HostListener, Input, OnDestroy} from '@angular/core';
import {SharedEventsService} from "../../services/shared-events.service";

@Directive({
  selector: '[appDraggable]',
  standalone: true
})
export class DraggableDirective implements AfterViewInit, OnDestroy {
  @Input() draggableElement!: HTMLElement;
  @Input() buttonsToShowOnDrag : HTMLElement | null = null;
  @Input() yLimit: number = 0;

  private pos1 = 0;
  private pos2 = 0;
  private pos3 = 0;
  private pos4 = 0;

  private afterResizeTimeout! : any

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    if (this.draggableElement) {
      this.draggableElement.onmousedown = (e) => this.dragMouseDown(e);
    }

  }

  ngOnDestroy() {
    this.closeDragElement()
    clearTimeout(this.afterResizeTimeout)
  }

  private dragMouseDown(event: MouseEvent): void {
    if(!(event.target as HTMLElement).classList.contains('win98-button')){
      event.preventDefault();
      this.pos3 = event.clientX;
      this.pos4 = event.clientY;
      if(this.buttonsToShowOnDrag){
        this.buttonsToShowOnDrag.style.visibility = 'visible';
        this.buttonsToShowOnDrag.style.opacity = '1';
      }
      document.onmouseup = () => this.closeDragElement();
      document.onmousemove = (e) => this.elementDrag(e);
    }
  }

  private elementDrag(event: MouseEvent): void {
    event.preventDefault();
    this.pos1 = this.pos3 - event.clientX;
    this.pos2 = this.pos4 - event.clientY;
    this.pos3 = event.clientX;
    this.pos4 = event.clientY;
    const elmnt = this.el.nativeElement;

    if(this.yLimit === 0 || (
      (elmnt.offsetTop - this.pos2) < (this.yLimit - this.el.nativeElement.offsetHeight) && (this.yLimit - this.el.nativeElement.offsetHeight) > 0
    )){
      elmnt.style.top = (elmnt.offsetTop - this.pos2) + "px";
    }

    elmnt.style.left = (elmnt.offsetLeft - this.pos1) + "px";
  }

  private closeDragElement(): void {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  @HostListener('resetDraggableWndow')
  onResetCall(){
    this.onResize()
  }

  @HostListener('window:resize')
  onResize(): void {
    this.el.nativeElement.style.position = 'relative'
    this.el.nativeElement.style.top = '0'
    this.el.nativeElement.style.left = '0'
    this.draggableElement.onmousedown = null

    if (this.buttonsToShowOnDrag){
      this.buttonsToShowOnDrag.style.visibility = 'hidden';
      this.buttonsToShowOnDrag.style.opacity = '0';
    }

    clearTimeout(this.afterResizeTimeout)

    this.afterResizeTimeout = setTimeout(()=>{
      if (this.draggableElement) {
        const elmnt = this.el.nativeElement;
        elmnt.style.top = (elmnt.offsetTop) + "px";
        elmnt.style.left = (elmnt.offsetLeft) + "px";
        this.el.nativeElement.style.position = 'absolute'
        this.draggableElement.onmousedown = (e) => this.dragMouseDown(e);
      }
    },50)
  }

}

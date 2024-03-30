import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit, OnDestroy{


  private hours: string = '00';
  private minutes: string = '00';
  private seconds: string = '00';
  private intervalId: any;
  chronometerValue: string = '00:00:00';
  @ViewChild('inputEl') inputEl!: ElementRef<HTMLInputElement>;
  @ViewChild('screenfetchEl') screenfetchElputEl!: ElementRef<HTMLElement>;
  @ViewChild('terminalContentEl') terminalContentEl!: ElementRef<HTMLElement>;
  @ViewChild('promptEl') promptEl!: ElementRef<HTMLElement>;

  constructor() { }

  ngOnInit() {
    this.startChronometer()
    setInterval(() => {
      this.chronometerValue = this.getChronometerValue();
    }, 1000);
  }

  ngOnDestroy() {
    this.stopChronometer()
  }


  terminalOnSubmit(){
    let prompt
    if(this.inputEl){
      switch (this.inputEl.nativeElement.value){
        case 'screenfetch':
          prompt  = this.promptEl.nativeElement.cloneNode(true) as HTMLElement
          prompt.style.position = 'relative'
          prompt.style.right = '0px'
          this.terminalContentEl.nativeElement.append(prompt)
          this.terminalContentEl.nativeElement.append(this.screenfetchElputEl.nativeElement.cloneNode(true))
          console.log('oeoeo')
          break;
        default :
          if(this.inputEl.nativeElement.value.trim() !== ''){
            prompt  = this.promptEl.nativeElement.cloneNode(true) as HTMLElement
            prompt.style.position = 'relative'
            prompt.style.right = '0px'
            this.terminalContentEl.nativeElement.append(prompt)
            let error = document.createElement('div')
            let errorTxt = document.createElement('p')
            errorTxt.innerHTML = this.inputEl.nativeElement.value + ': command not found'
            error.classList.add('commande')
            error.classList.add('error')
            error.append(
              errorTxt
            )
            this.terminalContentEl.nativeElement.append(error)

          }
          break;
      }
      this.inputEl.nativeElement.value = ''
      this.terminalContentEl.nativeElement.scrollTop= this.terminalContentEl.nativeElement.scrollHeight

    }
  }











  startChronometer() {
    this.intervalId = setInterval(() => {
      this.seconds = this.formatTime(+this.seconds + 1);

      if (+this.seconds === 0) {
        this.minutes = this.formatTime(+this.minutes + 1);
      }

      if (+this.minutes === 0 && +this.seconds === 0) {
        this.hours = this.formatTime(+this.hours + 1);
      }
    }, 1000);
  }

  stopChronometer() {
    clearInterval(this.intervalId);
  }

  getChronometerValue(): string {
    return `${this.hours}:${this.minutes}:${this.seconds}`;
  }

  private formatTime(time: number): string {
    return time < 10 ? '0' + time : String(time);
  }


}

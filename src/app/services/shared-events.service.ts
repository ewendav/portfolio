import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedEventsService {


  helloWindowDraggedSubject : Subject<boolean> = new Subject<boolean>
  helloWindowDragged$ : Observable<boolean> = this.helloWindowDraggedSubject.asObservable();
  gameWindowDraggedSubject : Subject<boolean> = new Subject<boolean>
  gameWindowDragged$ : Observable<boolean> = this.gameWindowDraggedSubject.asObservable();

  helloWindowResetSubject : Subject<boolean> = new Subject<boolean>
  helloWindowReset$ : Observable<boolean> = this.helloWindowDraggedSubject.asObservable();
  gameWindowResetSubject : Subject<boolean> = new Subject<boolean>
  gameWindowReset$ : Observable<boolean> = this.gameWindowDraggedSubject.asObservable();
  constructor() { }

  sendWindowDragged(status : boolean, name : string){
    if(name === 'game'){
      this.gameWindowDraggedSubject.next(status)
    }else{
      this.helloWindowDraggedSubject.next(status)
    }
  }


  resetWindow(name : string){
    if(name === 'game') {
      this.gameWindowResetSubject.next(true)
    }else{
      this.helloWindowResetSubject.next(true)
    }
  }

}

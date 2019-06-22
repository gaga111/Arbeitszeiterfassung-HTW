import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private snummer = new BehaviorSubject<Number>(0);
  meineSnr = this.snummer.asObservable();

  constructor() {}

  setSnr(nr) {
   this.snummer.next(nr);
  }


}

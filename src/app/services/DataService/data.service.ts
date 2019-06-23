import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private snummer = new BehaviorSubject<Number>(0);
  private username = new BehaviorSubject<String>("");
  private uservorname = new BehaviorSubject<String>("");
  private userfak = new BehaviorSubject<String>("");
  meineSnr = this.snummer.asObservable();
  userName = this.username.asObservable();
  userVorname = this.uservorname.asObservable();
  userFak = this.userfak.asObservable();
  constructor() {}

  setSnr(nr) {
   this.snummer.next(nr);
  }
  setName(n) {
    this.username.next(n);
   }
   setVorname(vn) {
    this.uservorname.next(vn);
   }
   setFak(fk) {
    this.userfak.next(fk);
   }


}

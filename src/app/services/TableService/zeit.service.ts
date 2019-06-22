import { Injectable } from '@angular/core';
import { Zeit } from './Zeit';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ZeitService {

  constructor(private http : HttpClient) { }

getTime(snr : Zeit): Observable<any> {
  console.log("SENT "+snr.snr);
     return this.http.post("http://141.56.131.34/src/getTime.php",
     snr, { responseType: 'text' });
   }
  
  insertTime(zeit: Zeit): Observable<any> {

    return this.http.post("http://ivm108.informatik.htw-dresden.de/ewa/G02/insertUser.php",
    zeit, { responseType: 'text' });

  } 



}

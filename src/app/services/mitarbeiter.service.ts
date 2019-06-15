import { Injectable } from '@angular/core';
import { Mitarbeiter } from './mitarbeiter';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MitarbeiterService {

  constructor(private http : HttpClient) { }


  getMitarbeiter(): Observable<Mitarbeiter[]> {
    return this.http.get<Mitarbeiter[]>("http://141.56.131.34/src/getma.php");
  }


  insertMitarbeiter(user: Mitarbeiter): Observable<any> {

    return this.http.post("http://ivm108.informatik.htw-dresden.de/ewa/G02/insertUser.php",
    user, { responseType: 'text' });

  } 



}

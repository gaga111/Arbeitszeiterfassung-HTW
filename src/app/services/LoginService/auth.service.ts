import { Injectable } from '@angular/core';
import { Credentials} from '../LoginService/credentials';
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }
 
  authenticateUser(user: Credentials): Observable<any> {
    console.log("SENT "+ user);
    return this.http.post("http://141.56.131.34/src/auth.php",
    user, { responseType: 'text' });
   

  } 
}

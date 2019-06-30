import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../services/LoginService/auth.service';
import { Credentials } from '../services/LoginService/credentials';
import { DataService} from '../services/DataService/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private DataServ: DataService,private AuthServ: AuthService,private router: Router) {}

  ngOnInit() {
  
  }
  login(name: string,psw:string){
    var credentials = new Credentials();
    credentials.name = name;
    credentials.pws = psw;
    this.AuthServ.authenticateUser(credentials).subscribe(data =>
      {
        
        this.DataServ.setSnr(name.slice(1));
         
          if (data.toString() ){
            this.router.navigate(['/Arbeitszeiterfassung']);
       
          }
         
         });
    }

}


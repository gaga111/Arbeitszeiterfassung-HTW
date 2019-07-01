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
    var string : String = "";
    this.AuthServ.authenticateUser(credentials).subscribe(data =>
      {
        string = JSON.parse(data);
        if (string == "erfolg"){
          document.getElementById("span").style.display = "none";
          console.log(string);
        this.DataServ.setSnr(name.slice(1));
         
          if (data.toString() ){
            this.router.navigate(['/Arbeitszeiterfassung']);
       
          }
        }else{
          document.getElementById("span").style.display = "block";
        }
         
         });
    }

}


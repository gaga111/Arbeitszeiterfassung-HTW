import { Component,OnInit } from '@angular/core';
import { Mitarbeiter } from '../services/MAService/mitarbeiter';
import { MitarbeiterService} from '../services/MAService/mitarbeiter.service';
//import { Router } from '@angular/router';

@Component({
  selector: 'navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})


export class NaviComponent implements OnInit {
  mitarbeiter : Mitarbeiter[];
  snr = "";
  name = "";
  myname = "";
  anrede : string;
  soll : Number;
  ist: number;
  jahr: number;
  mon: number ;
  tag: number;
  error = 0;
  error2 = 0;
    constructor( private MAServ : MitarbeiterService, /* private router: Router */ ) { }
  
    ngOnInit() {

    this.MAServ.getMitarbeiter().subscribe(data =>
      {
          this.mitarbeiter = data;
        //  console.log(this.mitarbeiter);
         });
  
    }
  
  nam(e: string){
  this.name = e;
  }
  /*
  psw(e: any){
  
  this.error = 1;
  this.error2 = 1;
  if (this.name != ""){
  
  for (let i = 0; i< this.users.length;i++){
  
   if(this.users[i].name == this.name){
     this.error = 0;
    if (e != "" )
  
   if (e ==  this.users[i].password ){
    this.error2= 0;
  
  this.session.updateName(this.name );
   this.session.updateID(this.users[i].id);
   this.session.updatePass( this.users[i].password );
  this.router.navigate(['/home']);
   }
  
   }
  
  }
  }
  
  }
  */
  }
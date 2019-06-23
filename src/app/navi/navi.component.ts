import { Component,OnInit } from '@angular/core';
import { Mitarbeiter } from '../services/MAService/mitarbeiter';
import { MitarbeiterService} from '../services/MAService/mitarbeiter.service';
import { Router } from '@angular/router';

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
    constructor( private MAServ : MitarbeiterService, private router: Router ) { }
  
    ngOnInit() {

    this.MAServ.getMitarbeiter().subscribe(data =>
      {
          this.mitarbeiter = data;
        //  console.log(this.mitarbeiter);
         });
       //  this.router.navigateByUrl('/meineDaten');
  
    }
  

  
  }
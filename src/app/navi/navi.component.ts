import { Component,OnInit } from '@angular/core';
import { Mitarbeiter } from '../services/MAService/mitarbeiter';
import { MitarbeiterService} from '../services/MAService/mitarbeiter.service';
import { Router } from '@angular/router';
import { DataService} from '../services/DataService/data.service';

@Component({
  selector: 'navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})


export class NaviComponent implements OnInit {
  mitarbeiter : Mitarbeiter[];
  snr : Number;
  name = "";
  myname = "";
  anrede : string;
  soll : Number;
  ist: Number;
  jahr: number;
  mon: number ;
  tag: number;
  error = 0;
  error2 = 0;
  userName : String = "";
  userVorname : String = "";
    constructor(private DataServ: DataService, private MAServ : MitarbeiterService, private router: Router ) { }
  
    ngOnInit() {
    
      this.DataServ.meineSnr.subscribe(nr => this.snr = nr);
      document.getElementById("timetable").style.display = "block";
      this.MAServ.getMitarbeiter().subscribe(data =>
        {
            for(var i = 0;i< data.length-1;i++){
            //  console.log(data[i]['S-Nr']);
              if(data[i]['S-Nr'] == "12345"){
                this.DataServ.setName(data[i]['Nachname']);
                this.DataServ.userName.subscribe(nm => this.userName = nm);
                this.DataServ.setVorname(data[i]['Vorname']);
                this.DataServ.userVorname.subscribe(vn => this.userVorname = vn);
                this.DataServ.setFak(data[i]['Fak']);
              
              }
      
            }
            
      
           });

       //  this.router.navigateByUrl('/meineDaten');
  
    }
  showMeineDaten(){
    document.getElementById("timetable").style.display = "none";
    document.getElementById("meineDaten").style.display = "block";
    document.getElementById("kontakt").style.display = "none";
    document.getElementById("bhb").style.display = "none";
    document.getElementById("berichte").style.display = "none";
  }
  showAZE(){
    document.getElementById("timetable").style.display = "block";
    document.getElementById("meineDaten").style.display = "none";
    document.getElementById("kontakt").style.display = "none";
    document.getElementById("bhb").style.display = "none";
    document.getElementById("berichte").style.display = "none";
  }

  showBerichte(){
    document.getElementById("timetable").style.display = "none";
    document.getElementById("meineDaten").style.display = "none";
    document.getElementById("kontakt").style.display = "none";
    document.getElementById("bhb").style.display = "none";
    document.getElementById("berichte").style.display = "block";
  }
  showBHB(){
    document.getElementById("timetable").style.display = "none";
    document.getElementById("meineDaten").style.display = "none";
    document.getElementById("kontakt").style.display = "none";
    document.getElementById("bhb").style.display = "block";
    document.getElementById("berichte").style.display = "none";
  }
  
  showKontakt(){
    document.getElementById("timetable").style.display = "none";
    document.getElementById("meineDaten").style.display = "none";
    document.getElementById("kontakt").style.display = "block";
    document.getElementById("bhb").style.display = "none";
    document.getElementById("berichte").style.display = "none";
  }
  }
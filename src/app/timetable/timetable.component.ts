import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Zeit } from '../services/TableService/Zeit';
import { ZeitService} from '../services/TableService/zeit.service';
import { DataService} from '../services/DataService/data.service';
import { MitarbeiterService} from '../services/MAService/mitarbeiter.service';
import { d } from '@angular/core/src/render3';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  Zeit : Zeit[];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );
  

  currentDate  = 0;
  daysInMonth = 0;
  days = new Array();
  currentMonth: String = "";
  mm: String = "";
  currentYear: String = "";
  beginn = new Array();
  ist : String = "0";
  ende = new Array();
  mySnr: Number = 0;
  //: String = "0";
  abwesend = new Array();

  constructor(private MAServ: MitarbeiterService, private DataServ: DataService,private ZTServ : ZeitService,private breakpointObserver: BreakpointObserver) {}

ngOnInit(){

this.DataServ.setSnr(12345);
this.DataServ.meineSnr.subscribe(nr => this.mySnr = nr);
console.log("MYS"+ this.mySnr);
this.MAServ.getMitarbeiter().subscribe(data =>
  {
      
      console.log(data);
     // this.parseUserTimes(this.Zeit);
     });
  

this.getCurrentDate();
var z = new Zeit();
z.snr = this.mySnr.toString();
this.ZTServ.getTime(z).subscribe(data =>
  {
      this.Zeit = JSON.parse(data.slice(9));
      console.log(this.Zeit.length + " Datensätze erhalten");
      this.parseUserTimes(this.Zeit);
     });
  }

parseUserTimes(time){
  for(var i=0;i< time.length-1;i++){
    if(time[i]['Jahr'] == this.currentYear && time[i]['Monat']== this.mm){
  
   var start = (<HTMLInputElement>document.getElementById(`${"beginn"+time[i]['Tag']+"."+time[i]['Monat']}`));
   var ende = (<HTMLInputElement>document.getElementById(`${"ende"+time[i]['Tag']+"."+time[i]['Monat']}`));
  //console.log(`${"beginn"+time[i]['Tag']+"."+time[i]['Monat']}`);
   start.value = time[i]['Start'];
   ende.value = time[i]['Ende'];
  /* this.Zeit[i].snr = time[i]['SNr'];
   this.Zeit[i].Unterbr = time[i]['Unterbrechung'];
   this.Zeit[i].abwesend = time[0]['Abwesend'];
   this.Zeit[i].ende = time[0]['Ende'];
   this.Zeit[i].ist = time[0]['Ist'];
   this.Zeit[i].jahr = time[0]['Jahr'];
   this.Zeit[i].mon = time[0]['Monat'];
   this.Zeit[i].start = time[0]['Start'];
   this.Zeit[i].tag = time[0]['Tag'];*/

    }  

  }
  
}

getCurrentDate(){
  const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember"
];

  var today = new Date();
  var dd = String(today.getDate());
  this.mm = String(today.getMonth() + 1); //January is 0!
  this.currentMonth =  monthNames[today.getMonth()];
  var yyyy = today.getFullYear();
  this.currentYear = yyyy.toString();
  this.currentDate = parseFloat(dd + '.' + this.mm) ;
  this.daysInMonth=  parseInt(new Date(yyyy,today.getMonth()+1, 0).getDate().toString())
  for (var i = 1; i < this.daysInMonth+2; i++) {
    this.beginn.push("");
    this.ende.push("");
    this.abwesend.push(0);
    var day = i -1 +'.'+this.mm;
    if (i == 1) {
    this.days.push("Heute");
    }else {
    this.days.push(parseFloat(day));
    }
   //console.log(day);
  }
//console.log(this.days);


}


setStartTime(time : String, datum: String){
  //console.log(`${datum}`);
  datum   = `${datum}`;
  var val = (<HTMLInputElement>document.getElementById(`${"ende"+datum}`)); 
  val.value = "";
  document.getElementById(`${"ist"+datum}`).innerHTML = "";
  if (datum =="Heute"){
    datum = this.currentDate.toString();
    //console.log(datum);
  }
  var indx = parseInt(datum.split(".")[0]) +1;
  this.beginn[indx] = time;
  this.ende[indx] = '';
  this.checkRowRules(datum,indx);
}

setEndTime(time : String, datum: String){
  datum   = `${datum}`;
  //console.log("ende"+time);
  if (datum =="Heute"){
    datum = this.currentDate.toString();
  }
  var indx = parseInt(datum.split(".")[0]) +1;
  this.ende[indx] = time;
  this.checkRowRules(datum,indx);
  this.berechneIst(this.beginn[indx],time,datum);
}

checkAbwesendheit(datum : String){
  datum   = `${datum}`;
  if (datum =="Heute"){
    datum = this.currentDate.toString();
  }
  var indx = parseInt(datum.split(".")[0]) +1;
  if (this.abwesend[indx] == 0){ 
    this.abwesend[indx] = 1;    // Abwesend
  } else {
    this.abwesend[indx] = 0;   // Anwesend
  }
  this.checkRowRules(datum,indx);
}

berechneIst(start,ende,id){
 // Unterbrechung !
 console.log("id"+ id );
  var pause = 30 ;
  var gesamt = 24*60;
  ​start = start.split(':');
  ende = ende.split(':');
  var HHStart = parseInt(start[0])*60;
  var HHEnde = parseInt(ende[0])*60;
  var MMStart = parseInt(start[1]);
  var MMEnde = parseInt(ende[1]);
  var diff = 0;
  diff = ((HHEnde+MMEnde) - (HHStart+MMStart) ); 

  if (diff < 0  ){
    alert("Arbeitsendezeit darf die Startzeit nicht unterschreiten!");
    if (id == this.currentDate.toString()){
      id = "Heute";
     }
     var val = (<HTMLInputElement>document.getElementById(`${"beginn"+id}`)); 
     val.value = "";
     var val2 = (<HTMLInputElement>document.getElementById(`${"ende"+id}`)); 
     val2.value = "";
    document.getElementById(`${"ist"+id}`).innerHTML = "";
    this.ist= `${hh}:${mm}`;
  }
  else if (!diff) {
    if (id == this.currentDate.toString()){
      id = "Heute";
     }
    document.getElementById(`${"ist"+id}`).innerHTML = "";
  }
  else {
  diff = ((HHEnde+MMEnde) - (HHStart+MMStart) ); 
  var hh = Math.floor(diff / 60);
  var mm =  diff % 60;
  this.ist= `${hh}:${mm}`;
  if (id == this.currentDate.toString()){
    id = "Heute";
   }
  document.getElementById(`${"ist"+id}`).innerHTML = this.ist.toString();
  this.ist= `${hh}:${mm}`;
  }

}

checkRowRules(id : String,indx) {

  if (id == this.currentDate.toString()){  // Heute
    id = "Heute";
  }
  if( this.beginn[indx] != '' && this.abwesend[indx] == 0 && this.ende[indx] == '' ){ // Anwesend,  Start eingetragen , Ende nicht eingetragen
    document.getElementById(`${"ausf"+id}`).style.display = "none";
   document.getElementById(`${"endEing"+id}`).style.display = "block";
   document.getElementById(`${"grund"+id}`).style.display = "none";
   var element =  <HTMLInputElement> document.getElementById("ende"+`${id}`);
   element.disabled = false;

  }
  else if(this.beginn[indx] == '' && this.abwesend[indx] == 0  ){// Anwesend  , Start nicht eingetragen
    document.getElementById(`${"ausf"+id}`).style.display = "block";
    document.getElementById(`${"endEing"+id}`).style.display = "none";
    document.getElementById(`${"grund"+id}`).style.display = "none";
    var element =  <HTMLInputElement> document.getElementById("ende"+`${id}`);
    element.disabled = true;
  }
  else if(this.ende[indx] != '' && this.beginn[indx] != '' ){// Anwesend  ,Start eingetragen, Ende  eingetragen
    document.getElementById(`${"ausf"+id}`).style.display = "none";
    document.getElementById(`${"endEing"+id}`).style.display = "none";
    document.getElementById(`${"grund"+id}`).style.display = "none";
 
  }
  else if(  this.abwesend[indx] == 1  ){ // Abwesend
    document.getElementById(`${"ausf"+id}`).style.display = "none";
    document.getElementById(`${"endEing"+id}`).style.display = "none";
    document.getElementById(`${"grund"+id}`).style.display = "block";
  }

}


}

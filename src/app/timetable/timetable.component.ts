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
  today = new Date();
  todayMonth = this.today.getMonth() + 1; 
  month = this.todayMonth  ; 
  currentYear: String = "";
  beginn = new Array();
  soll : String = "0";
  ende = new Array();
  mySnr: Number = 0;
  abwesend = new Array();
  unterbrechung : String = "0:0";

  

  constructor(private MAServ: MitarbeiterService, private DataServ: DataService,private ZTServ : ZeitService,private breakpointObserver: BreakpointObserver) {}

ngOnInit(){

this.DataServ.meineSnr.subscribe(nr => this.mySnr = nr);
console.log("MYS"+ this.mySnr);
  

this.getCurrentDate(this.today,this.todayMonth);
var z = new Zeit();
z.snr = this.mySnr.toString();
this.ZTServ.getTime(z).subscribe(data =>
  {
      this.Zeit = JSON.parse(data.slice(9));
      console.log(this.Zeit.length + " Datensätze erhalten");
      this.parseUserTimes(this.Zeit,this.todayMonth);
     });
  }

parseUserTimes(time ,mon){
  for(var i=0;i< time.length-1;i++){
    if(time[i]['Jahr'] == this.currentYear && time[i]['Monat']== mon ){
     // console.log(time[i]);
   var datum = `${time[i]['Tag']+"."+time[i]['Monat']}`;
   var start = (<HTMLInputElement>document.getElementById(`${"beginn"+time[i]['Tag']+"."+time[i]['Monat']}`));
   var ende = (<HTMLInputElement>document.getElementById(`${"ende"+time[i]['Tag']+"."+time[i]['Monat']}`));
   var untrbr = (<HTMLInputElement>document.getElementById(`${"untrbr"+time[i]['Tag']+"."+time[i]['Monat']}`));
   var istval = (<HTMLInputElement>document.getElementById(`${"spalteIst"+time[i]['Tag']+"."+time[i]['Monat']}`));
   //console.log(`${"beginn"+time[i]['Tag']+"."+time[i]['Monat']}`);
   
    if (start ){
      this.beginn.push(time[i]['Start']);
      this.ende.push(time[i]['Ende']);
      if (time[0]['Abwesend']){
        this.abwesend.push(1);
      }else {
        this.abwesend.push(0);
      }
   
      start.value = time[i]['Start'];
      ende.value = time[i]['Ende'];
      untrbr.value =time[i]['Unterbrechung'];
      istval.innerHTML = time[i]['Ist'];
      this.soll = time[i]['Soll'];
      this.checkRowRules(datum,time[i]['Tag']);
      //this.berechneIst(time[i]['Start'],time[i]['Ende'],datum,time[i]['Unterbrechung']);
     
      }else {
      this.beginn.push("");
      this.ende.push("");
      this.abwesend.push(0);
     
      }

   
  
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

showLastMonth(){

 this.month = this.month-1;
 if (this.month < this.todayMonth){
  document.getElementById("nextMonBtn").style.display = "block";
 }else {
  document.getElementById("nextMonBtn").style.display = "none";
 }
    this.getCurrentDate(this.today,this.month);
   var that = this;
    setTimeout(function(){ 
      that.parseUserTimes(that.Zeit,that.month );
    
    }, 1000);

}

showNextMonth(){
  this.month = this.month+1;
  
     this.getCurrentDate(this.today,this.month);
    var that = this;
     setTimeout(function(){ 
       that.parseUserTimes(that.Zeit,that.month );
     
     }, 1000);
     if (this.month +1 == this.todayMonth){
      document.getElementById("nextMonBtn").style.display = "block";
     }else {
      document.getElementById("nextMonBtn").style.display = "none";
     }
 
 }

getCurrentDate(today,mon){
  const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember"
];


  
  var dd = String(today.getDate());
  var mm = String(mon); //January is 0!
 
  this.currentMonth =  monthNames[mon-1];
 // console.log(this.currentMonth);
  var yyyy = today.getFullYear();
  this.currentYear = yyyy.toString();
  this.currentDate = parseFloat(dd + '.' + String(this.todayMonth));
  console.log(this.currentDate);
  this.daysInMonth=  parseInt(new Date(yyyy,mon , 0).getDate().toString());
  this.days = [];
  var ii = this.daysInMonth +2;
  if (mon == this.todayMonth ) {  // Aktueller Monat 

    for (var i = 1; i < ii; i++) {
  
      var day = i -1 +'.'+mm;
      if (i == 1  ) { 
      this.days.push("Heute");
      }else {
      this.days.push(parseFloat(day));
      }
    }
  } 
    else {      //Vormonat  
  
      for (var i = 1; i < ii; i++) {
       
        var day = i -1 +'.'+mm;
        var day0 = 0 +'.'+mm;
     //   console.log(this.currentDate);
      //   console.log(day);
        this.days.push(parseFloat(day));
        var that = this;
        setTimeout(function(){ 
          (<HTMLInputElement>document.getElementById(`${"spalteStart"+day0}`)).innerHTML= ""; 
          (<HTMLInputElement>document.getElementById(`${"spalteDatum"+day0}`)).innerHTML= ""; 
          (<HTMLInputElement>document.getElementById(`${"spalteEnde"+day0}`)).innerHTML= ""; 
          (<HTMLInputElement>document.getElementById(`${"spalteUntrbr"+day0}`)).innerHTML= ""; 
          (<HTMLInputElement>document.getElementById(`${"spalteAbw"+day0}`)).innerHTML= ""; 
          (<HTMLInputElement>document.getElementById(`${"spalteSoll"+day0}`)).innerHTML= ""; 
          (<HTMLInputElement>document.getElementById(`${"spalteIst"+day0}`)).innerHTML= ""; 
          (<HTMLInputElement>document.getElementById(`${"spalteDiff"+day0}`)).innerHTML= "";
          (<HTMLInputElement>document.getElementById(`${"spalteVermerk"+day0}`)).innerHTML= "";  
          (<HTMLInputElement>document.getElementById(`${"spalteAchtung"+day0}`)).innerHTML= ""; 
          (<HTMLInputElement>document.getElementById(`${"spalteEdit"+day0}`)).innerHTML= ""; 
       
        }, 1000);
      
      }
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
  var el = <HTMLInputElement> document.getElementById(`${"untrbr"+datum}`)
  el.disabled = false;

  //console.log("ende"+time);
  if (datum =="Heute"){
    datum = this.currentDate.toString();
  }
  var indx = parseInt(datum.split(".")[0]) +1;
  this.ende[indx] = time;
  this.checkRowRules(datum,indx);
  this.berechneIst(this.beginn[indx],time,datum,this.unterbrechung);
}

setUnterbrechung( datum: String, untrbr: String){
  datum   = `${datum}`;
  untrbr   = `${untrbr}`;
  this.unterbrechung = untrbr;
  //console.log("ende"+time);
  if (datum =="Heute"){
    datum = this.currentDate.toString();
  }
  var indx = parseInt(datum.split(".")[0]) +1;
  var ende = this.ende[indx] ;
  this.checkRowRules(datum,indx);
  if(!untrbr){
      untrbr = "0:0";
    }
  this.berechneIst(this.beginn[indx],ende,datum,untrbr);
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

setGrund(datum : String){
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


berechneIst(start,ende,id, unterbrechung){
  var untrbrInMin = 0;
  if(unterbrechung){
  unterbrechung = unterbrechung.split(':');
  var untrbrHH = parseInt(unterbrechung[0])*60;
  var untrbrMM = parseInt(unterbrechung[1]);
   untrbrInMin =  untrbrHH + untrbrMM;
  }
  var pause = 30 ;
  var gesamt = 24*60;
  ​start = start.split(':');
  ende = ende.split(':');
  var HHStart = parseInt(start[0])*60;
  var HHEnde = parseInt(ende[0])*60;
  var MMStart = parseInt(start[1]);
  var MMEnde = parseInt(ende[1]);
  var diff = 0;
  diff = ((HHEnde+MMEnde) - (HHStart+MMStart) - pause - untrbrInMin); 

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
  var hh = Math.floor(diff / 60);
  var mm =  diff % 60;
  if (mm < 10){
    this.ist= `${hh}:0${mm}`;
  }else {
  this.ist= `${hh}:${mm}`;
  }
  if (id == this.currentDate.toString()){
    id = "Heute";
   }
  document.getElementById(`${"ist"+id}`).innerHTML = this.ist.toString();
 
  }

}

checkRowRules(id : String,indx) {
 // console.log("check "+id);
  if (id == this.currentDate.toString()){  // Heute
    id = "Heute";
  }
  if(  document.getElementById(`${"ausf"+id}`)){
  if( this.beginn[indx] != '' && this.abwesend[indx] == 0 && this.ende[indx] == '' ){ // Anwesend,  Start eingetragen , Ende nicht eingetragen
   //console.log("check " +1);
    document.getElementById(`${"ausf"+id}`).style.display = "none";
   document.getElementById(`${"endEing"+id}`).style.display = "block";
   document.getElementById(`${"grund"+id}`).style.display = "none";
   var element =  <HTMLInputElement> document.getElementById("ende"+`${id}`);
   element.disabled = false;

  }
  else if(this.beginn[indx] == '' && this.abwesend[indx] == 0  ){// Anwesend  , Start nicht eingetragen
   // console.log("check " +2);
    document.getElementById(`${"ausf"+id}`).style.display = "block";
    document.getElementById(`${"endEing"+id}`).style.display = "none";
    document.getElementById(`${"grund"+id}`).style.display = "none";
    var element =  <HTMLInputElement> document.getElementById("ende"+`${id}`);
    element.disabled = true;
  }
  else if(this.ende[indx] != '' && this.beginn[indx] != '' ){// Anwesend  ,Start eingetragen, Ende  eingetragen
   // console.log("check " +3);
    document.getElementById(`${"ausf"+id}`).style.display = "none";
    document.getElementById(`${"endEing"+id}`).style.display = "none";
    document.getElementById(`${"grund"+id}`).style.display = "none";
 
  }
  else if(  this.abwesend[indx] == 1  ){ // Abwesend
    console.log("check " +4);
    document.getElementById(`${"ausf"+id}`).style.display = "none";
    document.getElementById(`${"endEing"+id}`).style.display = "none";
    document.getElementById(`${"grund"+id}`).style.display = "block";
  }
  }
}


}

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
  vormonatIstArray = new Array();
  currentMonth: String = "";
  today = new Date();
  todayMonth = this.today.getMonth() + 1; 
  month = this.todayMonth  ; 
  currentYear: String = "";
  beginn = new Array();
  soll : String = "0";
  ist = new Array();
  diff = new Array();
  ende = new Array();
  mySnr: Number = 0;
  abwesend = new Array();
  unterbrechung : String = "0:0";
  sollSaldo = 0;
  istSaldo = 0;
  Saldo : String = "0";
  vormonat : String = "0";
  datensatz = new Zeit();
  vormonatSaldo =  0;
  vormonatSollSaldo = 0;
  newBeginn: String = "";
  newEnde : String= "";
  newIst : String= "";

  

  constructor(private MAServ: MitarbeiterService, private DataServ: DataService,private ZTServ : ZeitService,private breakpointObserver: BreakpointObserver) {}

ngOnInit(){
  
this.DataServ.meineSnr.subscribe(nr => this.mySnr = nr);
console.log("MYS"+ this.mySnr);
  

this.getCurrentDate(this.today,this.todayMonth);
var that = this;
setTimeout(function(){ 
  that.berechneDreiWochenAbstand(that.todayMonth);
}, 1000);

var z = new Zeit();
z.snr = this.mySnr.toString();
this.ZTServ.getTime(z).subscribe(data =>
  {
  
      this.Zeit = JSON.parse(data);
      console.log(this.Zeit.length + " Datensätze erhalten");
      this.parseUserTimes(this.Zeit,this.todayMonth);
      
     });
  }

berechneDreiWochenAbstand(mon){

 var tage = this.currentDate.toString().split(".")[0];
 var currentMon = this.currentDate.toString().split(".")[1];
 var days=  parseFloat(new Date(this.today.getFullYear(),mon , 0).getDate().toString());
 var lastday = 0;

 

  if ( mon == currentMon){ //Aktueller Mon
   lastday = parseFloat(tage) - 21;
   
  }
  else if (mon == (parseFloat(currentMon) - 1).toString()){ //Vormonat
   
      lastday = days + (parseFloat(tage) - 21);

      for (var i = lastday; i < days+1; i++){
        var el = <HTMLInputElement> document.getElementById(`${"beginn"+i+"."+mon}`);
         el.disabled = true;
         var el2 = <HTMLInputElement> document.getElementById(`${"bearb"+i+"."+mon}`);
         el2.disabled = false;
         
      }
    
 
    
  }
  if (lastday > 0){
    console.log("lastday "+lastday);

    for (var i = 0; i < lastday; i++){
      var d = i +1;
      var heute = <HTMLInputElement> document.getElementById("beginnHeute");
      if(heute){
       heute.disabled = true;
      }
      var el = <HTMLInputElement> document.getElementById(`${"beginn"+d+"."+mon}`);
       el.disabled = true;
       var el2 = <HTMLInputElement> document.getElementById(`${"bearb"+d+"."+mon}`);
       el2.disabled = true;
       
    }
 
  }
  
}

  berechneVormonatSaldo() {
   /* var time = this.Zeit;
    var mon = this.todayMonth - 1;
    var Vormonatsoll;
    for (var i = 0; i < time.length - 1; i++) {
      if (time[i]['Jahr'] == this.currentYear && time[i]['Monat'] == mon) { //Vormonat

        if (time[i]['Soll']) {
          Vormonatsoll = time[i]['Soll'];
        }
        this.vormonatIstArray.push(time[i]['Ist']);
      }

    }


    this.vormonatSollSaldo = 0;
    this.vormonatSaldo = 0;
    var ist = 0 ;
    var vormonatIstSaldo =0;
    var days = parseFloat(new Date(this.today.getFullYear(), mon, 0).getDate().toString());
    Vormonatsoll = Vormonatsoll.split(':');
    var hhInMin = parseInt(Vormonatsoll[0]) * 60;
    var min = parseInt(Vormonatsoll[1]);
    for (var i = 0; i < days; i++) {
      this.vormonatSollSaldo = this.vormonatSollSaldo + hhInMin + min;

 ​       ist = this.vormonatIstArray[i].split(':');
        var hhInMin = parseInt(ist[0])*60;
        var min = parseInt(ist[1]);
        vormonatIstSaldo = vormonatIstSaldo+ hhInMin + min ;
        this.vormonatSaldo = this.vormonatSollSaldo - vormonatIstSaldo;
        
      //  console.log("Vormonatssaldo"+this.vormonatSaldo);

    }
    var saldoSt = Math.floor(this.vormonatSaldo / 60);
    var saldoMin =  this.vormonatSaldo% 60;
    console.log("Vormonatssaldo"+saldoSt,saldoMin);
/*,sa
    this.Saldo = "";
    //  console.log(soll,ist);
     var dif = soll - ist;
     var saldoSt = Math.floor(dif / 60);
     var saldoMin =  dif % 60;
     
     if (dif < 0){ //Fehlende Stunde
      this.Saldo = `${-saldoSt}St ${-saldoMin}Min`;
      document.getElementById("Saldo").style.color= "green";
     }else if (dif >= 0){ // OK oder Überstunden
      this.Saldo = `-${saldoSt}St ${saldoMin}Min`;
      document.getElementById("Saldo").style.color= "red";
    }*/

  }

parseUserTimes(time ,mon){
this.abwesend = [];
  for(var i=0;i< time.length;i++){
    if(time[i]['Jahr'] == this.currentYear && time[i]['Monat']== mon ){ //Aktueller Monat

      if (time[i]['Abwesend']){
        this.abwesend.push(1);
      }else {
        this.abwesend.push(0);
      }
   var datum = `${time[i]['Tag']+"."+time[i]['Monat']}`;
   var start = (<HTMLInputElement>document.getElementById(`${"beginn"+time[i]['Tag']+"."+time[i]['Monat']}`));
   var ende = (<HTMLInputElement>document.getElementById(`${"ende"+time[i]['Tag']+"."+time[i]['Monat']}`));
   var untrbr = (<HTMLInputElement>document.getElementById(`${"untrbr"+time[i]['Tag']+"."+time[i]['Monat']}`));
   var istval = (<HTMLInputElement>document.getElementById(`${"spalteIst"+time[i]['Tag']+"."+time[i]['Monat']}`));
   if (time[i]['Soll']){
   this.DataServ.setSollSt(time[i]['Soll']);
   this.DataServ.sollSt.subscribe(vn => this.soll = vn);
   }
    if (start ){
      this.beginn.push(time[i]['Start']);
      this.ist.push(time[i]['Ist']);
      this.ende.push(time[i]['Ende']);
      
   
      start.value = time[i]['Start'];
      ende.value = time[i]['Ende'];
      untrbr.value =time[i]['Unterbrechung'];
      istval.innerHTML = time[i]['Ist'];
      var dat = `${time[i]['Tag']+"."+time[i]['Monat']}`;
      this.berechneDiff(time[i]['Ist'],dat)
      this.soll = time[i]['Soll'];
      this.checkRowRules(datum,time[i]['Tag']);
      this.berechneIstSaldo(time[i]['Ist']);
     
      }else {
     
      this.beginn.push("");
      this.ende.push("");
      this.ist.push("");
     
      }

    }  

  }
  this.berechneSollSaldo(this.soll,mon);
  this.berechneSaldo(this.sollSaldo.toString(),this.istSaldo.toString());
  this.berechneVormonatSaldo() ;
  
}

showLastMonth(){

  document.getElementById("vorMonBtn").style.display = "none";
 this.month = this.month-1;
 if (this.month < this.todayMonth){
  document.getElementById("nextMonBtn").style.display = "block";
 }else {
  document.getElementById("nextMonBtn").style.display = "none";
 }
    this.getCurrentDate(this.today,this.month);
    this.istSaldo = 0;
   var that = this;
   
    setTimeout(function(){ 
      that.parseUserTimes(that.Zeit,that.month );
      //that.berechneDreiWochenAbstand(that.month);
    
    }, 1000);
    setTimeout(function(){ 
      
       that.berechneDreiWochenAbstand(that.month);
       that.vormonat = that.month.toString();
    
    }, 1000);

}

showNextMonth(){
  this.month = this.month+1;
  this.vormonat = "0";
  document.getElementById("vorMonBtn").style.display = "block";
     this.getCurrentDate(this.today,this.month);
    var that = this;
     setTimeout(function(){ 
       that.parseUserTimes(that.Zeit,that.month );
       that.berechneDreiWochenAbstand(that.month);
   
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
  
  console.log("current Date"+this.currentDate);
  this.daysInMonth=  parseInt(new Date(yyyy,mon , 0).getDate().toString());
  this.days = [];
  var ii = this.daysInMonth +2;
  if (mon == this.todayMonth ) {  // Aktueller Monat 
    
    for (var i = 1; i < ii; i++) {
      var day = i -1 +'.'+mm;
      this.abwesend.push("0");
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
        this.abwesend.push("0");
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
  //console.log("setStart");
  //console.log(`${datum}`);
  this.newBeginn = "";
  datum   = `${datum}`;
  var val = (<HTMLInputElement>document.getElementById(`${"ende"+datum}`)); 
  val.value = "";
  document.getElementById(`${"spalteIst"+datum}`).innerHTML = "";
  document.getElementById(`${"spalteDiff"+datum}`).innerHTML = "";
  if (datum =="Heute"){
    datum = this.currentDate.toString();
  }
  var indx = parseInt(datum.split(".")[0]) +1;
  this.beginn[indx] = time;
  this.newBeginn = time;
  console.log("start"+this.beginn[indx]);
  this.ende[indx] = '';
  this.checkRowRules(datum,indx);
}

setEndTime(time : String, datum: String){
  datum   = `${datum}`;
  this.newEnde = "";
  var el = <HTMLInputElement> document.getElementById(`${"untrbr"+datum}`)
  el.disabled = false;

  //console.log("ende"+time);
  if (datum =="Heute"){
    datum = this.currentDate.toString();
  }
  var indx = parseInt(datum.split(".")[0]) +1;
  this.ende[indx] = time;
  this.newEnde = time;
  console.log("ende"+this.ende[indx]);
  this.checkRowRules(datum,indx);
  //console.log("Param" + this.beginn[indx],time,datum,this.unterbrechung);
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
  var beginn =  <HTMLInputElement> document.getElementById("beginn"+`${datum}`);
  if (this.abwesend[indx] == 0){ 
    this.abwesend[indx] = 1;    // Abwesend

    if(beginn.disabled == false ){
  
    var ende =  <HTMLInputElement> document.getElementById("ende"+`${datum}`);
    ende.disabled = false;
    ende.value = "";
    ende.disabled = true;
    beginn.value = "";
    }

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
  ​start = start.split(':');
  ende = ende.split(':');
  var HHStart = parseInt(start[0])*60;
  var HHEnde = parseInt(ende[0])*60;
  var MMStart = parseInt(start[1]);
  var MMEnde = parseInt(ende[1]);
  var diff = 0;
  var ist = "";
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
     document.getElementById(`${"spalteIst"+id}`).innerHTML = "";
     ist= `${hh}:${mm}`;
  }
  else if (!diff) {
    if (id == this.currentDate.toString()){
      id = "Heute";
     }
    document.getElementById(`${"spalteIst"+id}`).innerHTML = "";
  }
  else {
  var hh = Math.floor(diff / 60);
  var mm =  diff % 60;
  if (mm < 10){
    ist= `${hh}:0${mm}`;
  }else {
    ist= `${hh}:${mm}`;
  }

  this.ist[parseInt(id.split(".")[0])+1] = ist.toString();
 
  if (id == this.currentDate.toString()){
    id = "Heute";
   }
   this.newIst = "";
   this.newIst = ist.toString();
  document.getElementById(`${"spalteIst"+id}`).innerHTML = ist.toString();
  this.berechneDiff(ist.toString(),id);
 
 
  }

}

berechneDiff(ende,datum){
  
   datum   = `${datum}`;
  ​var start = this.soll.split(':');
  ende = ende.split(':');
  var HHStart = parseInt(start[0])*60;
  var HHEnde = parseInt(ende[0])*60;
  var MMStart = parseInt(start[1]);
  var MMEnde = parseInt(ende[1]);
  var diff = 0;
  var differenz = "";
  diff = ((HHEnde+MMEnde) - (HHStart+MMStart) ); 
  //console.log(diff);

  if (!diff) {
    if (datum == this.currentDate.toString()){
      datum = "Heute";
     }
    document.getElementById(`${"spalteDiff"+datum}`).innerHTML = "";
  }
  else {
    if( diff < 0)
   {
    diff = ((HHStart+MMStart) - (HHEnde+MMEnde) ); 
   }
  var hh = Math.floor(diff / 60);
  var mm =  diff % 60;
  if (mm < 10 && ((HHEnde+MMEnde) - (HHStart+MMStart) ) < 0){
    differenz= `-${hh}:0${mm}`;
    document.getElementById(`${"spalteDiff"+datum}`).style.color= "red";
  }else if (mm < 10 && ((HHEnde+MMEnde) - (HHStart+MMStart) ) >= 0){
    differenz= `+${hh}:0${mm}`;
    document.getElementById(`${"spalteDiff"+datum}`).style.color= "green";
  }else if (mm > 10 && ((HHEnde+MMEnde) - (HHStart+MMStart) ) < 0)
  {
   differenz= `-${hh}:${mm}`;
   document.getElementById(`${"spalteDiff"+datum}`).style.color= "red";
  }else {
    differenz= `+${hh}:${mm}`;
    document.getElementById(`${"spalteDiff"+datum}`).style.color= "green";
  }
  if (datum == this.currentDate.toString()){
    datum = "Heute";
   }
  document.getElementById(`${"spalteDiff"+datum}`).innerHTML = differenz.toString();
 
  }

}

berechneSollSaldo(soll,mon){

  this.sollSaldo = 0;
  var days=  parseFloat(new Date(this.today.getFullYear(),mon , 0).getDate().toString());
 ​soll = soll.split(':');
 var hhInMin = parseInt(soll[0])*60;
 var min = parseInt(soll[1]);
 for (var i=0;i<days;i++){
  this.sollSaldo = this.sollSaldo+ hhInMin + min ;
}
 
 var sollSt = Math.floor(this.sollSaldo / 60);
 var sollMin =  this.sollSaldo % 60;
 
 document.getElementById("sollSaldo").innerHTML = `${sollSt}St ${sollMin}Min`;

}

berechneIstSaldo(ist){
 
 ​ist = ist.split(':');
 var hhInMin = parseInt(ist[0])*60;
 var min = parseInt(ist[1]);
  this.istSaldo = this.istSaldo+ hhInMin + min ;
 var istSt = Math.floor(this.istSaldo / 60);
 var istMin =  this.istSaldo % 60;
 
 document.getElementById("istSaldo").innerHTML = `${istSt}St ${istMin}Min`;

}

berechneSaldo(soll,ist){
  this.Saldo = "";
//  console.log(soll,ist);
 var dif = soll - ist;
 var saldoSt = Math.floor(dif / 60);
 var saldoMin =  dif % 60;
 
 if (dif < 0){ //Fehlende Stunde
  this.Saldo = `${-saldoSt}St ${-saldoMin}Min`;
  document.getElementById("Saldo").style.color= "green";
 }else if (dif >= 0){ // OK oder Überstunden
  this.Saldo = `-${saldoSt}St ${saldoMin}Min`;
  document.getElementById("Saldo").style.color= "red";
}
document.getElementById("Saldo").innerHTML = this.Saldo.toString();
this.sollSaldo = 0;
this.istSaldo = 0;

}

bearbeiten(datum){
  var id   = `${datum}`;
  var start = <HTMLInputElement> document.getElementById(`${"beginn"+id}`);
  start.disabled = false;
  var start = <HTMLInputElement> document.getElementById(`${"bearb"+id}`);
  start.hidden = true;
  var start = <HTMLInputElement> document.getElementById(`${"speichern"+id}`);
  start.hidden = false;
  
}

speichern(datum){
  var id   = `${datum}`;
  var indx = parseInt(id.split(".")[0]) ;
  var bearbBtn = <HTMLInputElement> document.getElementById(`${"bearb"+id}`);
  bearbBtn.hidden = false;
  var speichernBtn = <HTMLInputElement> document.getElementById(`${"speichern"+id}`);
  speichernBtn.hidden = true;
  var beginn = <HTMLInputElement> document.getElementById(`${"beginn"+id}`);
  beginn.disabled = true;
  if (id =="Heute"){
    id = this.currentDate.toString();
    indx = parseInt(id.split(".")[0])+1 ;
 
  }
  this.datensatz.Unterbr = this.unterbrechung;
  this.datensatz.start = this.newBeginn;
  this.datensatz.ende = this.newEnde;
  this.datensatz.snr = this.mySnr.toString();
  this.datensatz.jahr = this.currentYear;
  this.datensatz.mon = id.split(".")[1];
  this.datensatz.tag = id.split(".")[0];
  this.datensatz.soll = this.soll;
  this.datensatz.ist =this.newIst;
  console.log("DS"+this.datensatz.start);
  console.log("DS"+this.datensatz.ende);

  this.ZTServ.insertTime(this.datensatz)
         	     .subscribe( data => {
        		            console.log(data);
         			 },  error => { console.log(error); });
  
  
}

checkRowRules(id : String,indx) {

  if (id == this.currentDate.toString()){  // Heute
    id = "Heute";
  }
  if(  document.getElementById(`${"ausf"+id}`)){
  if( this.beginn[indx] != '' && (!this.abwesend[indx] || this.abwesend[indx] == '0') && this.ende[indx] == '' ){ // Anwesend,  Start eingetragen , Ende nicht eingetragen
    document.getElementById(`${"ausf"+id}`).style.display = "none";
   document.getElementById(`${"endEing"+id}`).style.display = "block";
   document.getElementById(`${"grund"+id}`).style.display = "none";
   var ende =  <HTMLInputElement> document.getElementById("ende"+`${id}`);
   ende.disabled = false;
   ende.value = "";


  }
  else if(this.beginn[indx] == '' && this.abwesend[indx] == 0  ){// Anwesend  , Start nicht eingetragen

    document.getElementById(`${"ausf"+id}`).style.display = "block";
    document.getElementById(`${"endEing"+id}`).style.display = "none";
    document.getElementById(`${"grund"+id}`).style.display = "none";
    var element =  <HTMLInputElement> document.getElementById("ende"+`${id}`);
    element.disabled = true;
  }
  else if(this.ende[indx] != '' && this.beginn[indx] != '' ){// Anwesend  ,Start eingetragen, Ende  eingetragen

    console.log(this.currentDate);
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


}

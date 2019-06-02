import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );
  

  
  currentDate: String = "";
  daysInMonth = 0;
  days = new Array();
  currentMonth: String = "";
  currentYear: String = "";

  constructor(private breakpointObserver: BreakpointObserver) {}

ngOnInit(){
this.getCurrentDate();
}


getCurrentDate(){
  const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember"
];
  var today = new Date();
  var dd = String(today.getDate());
  var mm = String(today.getMonth() + 1); //January is 0!
  this.currentMonth =  monthNames[today.getMonth()];
  var yyyy = today.getFullYear();
  this.currentYear = yyyy.toString();
  this.currentDate = dd + '.' + mm ;
  this.daysInMonth=  parseInt(new Date(yyyy,today.getMonth()+1, 0).getDate().toString())
  for (var i = 1; i < this.daysInMonth+1; i++) {
    var day = i+'.'+mm;
    this.days.push(day);
   //console.log(day);
  }
console.log(this.days);


}


  

}

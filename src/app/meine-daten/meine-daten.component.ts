import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meine-daten',
  templateUrl: './meine-daten.component.html',
  styleUrls: ['./meine-daten.component.css']
})
export class MeineDatenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("meineDaten");
  }

}

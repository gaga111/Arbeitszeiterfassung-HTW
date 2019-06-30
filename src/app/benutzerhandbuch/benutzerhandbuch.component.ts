import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-benutzerhandbuch',
  templateUrl: './benutzerhandbuch.component.html',
  styleUrls: ['./benutzerhandbuch.component.css']
})
export class BenutzerhandbuchComponent implements OnInit {

  constructor() { }
  height : number;

  ngOnInit() {
    this.height = window.screen.height ;
  }

}

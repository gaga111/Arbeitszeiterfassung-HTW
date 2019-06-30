import { Component, OnInit } from '@angular/core';
import { DataService} from '../services/DataService/data.service';

@Component({
  selector: 'app-meine-daten',
  templateUrl: './meine-daten.component.html',
  styleUrls: ['./meine-daten.component.css']
})
export class MeineDatenComponent implements OnInit {
  userName : String = "";
  userVorname : String = "";
  userFak: String = "";
  snr: Number;
  soll: String = "";

  constructor(private DataServ: DataService) { }

  ngOnInit() {
    this.DataServ.userName.subscribe(nm => this.userName = nm);
    this.DataServ.userVorname.subscribe(vn => this.userVorname = vn);
    this.DataServ.meineSnr.subscribe(nr => this.snr = nr);
    this.DataServ.userFak.subscribe(fk => this.userFak = fk);
    this.DataServ.sollSt.subscribe(s => this.soll = s);
    
  }

}

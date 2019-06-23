import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NaviComponent } from './navi/navi.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatInputModule, MatFormFieldModule,MatFormFieldControl } from '@angular/material';
import { TimetableComponent } from './timetable/timetable.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import {MatTooltipModule} from '@angular/material/tooltip';
import { KontaktComponent } from './kontakt/kontakt.component';
import { BerichteComponent } from './berichte/berichte.component';
import { BenutzerhandbuchComponent } from './benutzerhandbuch/benutzerhandbuch.component';
import { MeineDatenComponent } from './meine-daten/meine-daten.component'; 
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'Arbeitszeiterfassung', component: NaviComponent },
  { path: 'meineDaten', component: MeineDatenComponent },
  { path: 'Kontakt',     component: KontaktComponent },
  { path: 'Berichte',     component: BerichteComponent },
  { path: 'Benutzerhandbuch',  component: BenutzerhandbuchComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    TimetableComponent,
    KontaktComponent,
    BerichteComponent,
    BenutzerhandbuchComponent,
    MeineDatenComponent,
  ],
 
  imports: [
    RouterModule.forRoot(
      appRoutes,
     // { enableTracing: true } // <-- debugging purposes only
    ),
    MatIconModule,
    MatTooltipModule,
    HttpClientModule,
    MatSelectModule,
    FormsModule,
    MatCheckboxModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

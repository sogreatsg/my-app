import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { PatientComponent } from './patient/patient.component';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    RouterModule.forRoot([
      { path: '', component: HomepageComponent },
      { path: 'patient/:uid', component: PatientComponent },
    ])
  ],
  providers: [],
  declarations: [ AppComponent, PatientComponent, HomepageComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
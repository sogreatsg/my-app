import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  title = 'my-app';
  constructor(db: AngularFireDatabase) {
    db.list('users').valueChanges().forEach(element => {
      console.log(element)
    });;
   
  }
}

import { Element } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  usersList: AngularFireList<any>;
  users :any[] = [];
  usersFilter:any = [];
  filterValue:any
  
  
  constructor(db: AngularFireDatabase) {
    this.usersList = db.list('users');
  }

  displayedColumns: string[] = ['Name', 'E-mail', 'Address','Phone'];

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.usersFilter = this.users.filter(x=>
      x.name.toLowerCase().includes(this.filterValue.toLowerCase()) 
    )
  }
  ngOnInit(): void {

    this.usersList.valueChanges().subscribe(items => {
      this.users = items;
      if(this.filterValue){
        this.usersFilter = this.users.filter(x=>
          x.name.toLowerCase().includes(this.filterValue.toLowerCase()) 
        )
      }else{
        this.usersFilter = items
      }
      
      });
     
  }
}

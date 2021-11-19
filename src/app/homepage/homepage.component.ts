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
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  title = 'my-app';
  usersList: AngularFireList<any>;
  users: any = [];
  usersFilter: any = [];
  filterValue: any


  constructor(db: AngularFireDatabase) {
    this.usersList = db.list('users');
  }

  displayedColumns: string[] = ['name', 'heart_rate', 'spo2', 'timestamp'];

  applyFilter(event: any) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.usersFilter = this.users.filter((x: any) =>
      x.name.toLowerCase().includes(this.filterValue.toLowerCase())
    )
  }
  ngOnInit(): void {

    this.usersList.valueChanges().subscribe(items => {
      this.users = []
      items.forEach((element: any) => {
        if (element.transaction) {
          var transaction: any
          transaction = element.transaction
          transaction = Object.keys(transaction).map(function (index) {
            return transaction[index];
          })
          this.users.push({ "name": element.name, "heart_rate": transaction[transaction.length - 1].heart_rate, "spo2": transaction[transaction.length - 1].spo2, "timestamp": transaction[transaction.length - 1].timestamp,"uid":element.uid })
        } else {
          this.users.push({ "name": element.name, "heart_rate": "ไม่พบข้อมูล", "spo2": "ไม่พบข้อมูล", "timestamp": "ไม่พบข้อมูล","uid":element.uid })
        }
      })
      this.usersFilter = this.users
      if (this.filterValue) {
        this.usersFilter = this.users.filter((x: any) =>
          x.name.toLowerCase().includes(this.filterValue.toLowerCase())
        )
      } else {
        this.usersFilter = this.users
      }

    });

  }

}

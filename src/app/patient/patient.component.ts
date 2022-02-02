import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  RTD: AngularFireDatabase
  userModel: any[] = []
  chatModel: any[] = []
  historyModel: any[] = []


  uid: any

  displayedColumnsHistory: string[] = ['timestamp', 'heart_rate', 'spo2', 'location'];
  displayedColumnsUser: string[] = ['name', 'email', 'address','phone'];
  displayedColumnsChat: string[] = ['user', 'message', 'timestamp'];
  constructor(private route: ActivatedRoute, db: AngularFireDatabase) {
    this.RTD = db
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.uid = routeParams.get('uid');
    this.RTD.list('users', ref => ref.orderByKey().equalTo(this.uid)).valueChanges().subscribe(user => {
      this.userModel = user
      var chat = this.userModel[0].chat
      this.chatModel = Object.keys(chat).map(function (index) {
        let value = chat[index];
        return value;
      });
    })

    this.RTD.list('users/' + this.uid + '/transaction/').valueChanges().subscribe(data => {
      
      this.historyModel = data.sort((n1:any, n2:any) => {
        if(moment(n1.timestamp).isBefore(moment(n2.timestamp))){
          return 1;
        }else{
          return -1;
        }
      })
    })
  }
  public sendMessege(inputMessege: any) {
    var dateNow = (moment(Date.now())).format('DD/MM/yyyy HH:mm:ss')
    this.RTD.list('users/' + this.uid + '/chat/').push({ user: "doctor", message: inputMessege, timestamp: dateNow });;
  }

  public googleMap(location:any){
    window.open("http://maps.google.com/maps?q="+location)
  }

   public strToDate(dtStr:any) {
    if (!dtStr) return null
    let dateParts = dtStr.split("/");
    let timeParts = dateParts[2].split(" ")[1].split(":");
    dateParts[2] = dateParts[2].split(" ")[0];
    return (dateParts[2], dateParts[1] - 1, +dateParts[0], timeParts[0], timeParts[1], timeParts[2]);
  }
}

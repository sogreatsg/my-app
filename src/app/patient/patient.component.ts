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
  RTD:AngularFireDatabase
  userModel:any ={}
  chatModel:any[] = []
  uid:any
  displayedColumns: string[] = ['User','Message', 'Time'];
  constructor(private route: ActivatedRoute,db: AngularFireDatabase) { 
    this.RTD = db
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.uid = routeParams.get('uid');
    
    this.RTD.list('users', ref => ref.orderByKey().equalTo(this.uid)).valueChanges().subscribe(user =>{
      this.userModel = user[0]
      this.userModel.chat
      var chat = this.userModel.chat
      this.chatModel = Object.keys(chat).map(function(index){
        let value = chat[index];
        return value;
    });})
  }
  public sendMessege(inputMessege:any){
    var dateNow =(moment(Date.now())).format('DD/MM/yyyy HH:mm:ss')
    this.RTD.list('users/'+this.uid+'/chat/').push({ user: "doctor",message:inputMessege,timestamp:dateNow });;
  }
}

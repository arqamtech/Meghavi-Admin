import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { ChangePassPage } from '../../Auth/change-pass/change-pass';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  name: string;
  mail: string;
  pass: string;



  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public menuCtrl: MenuController,
    public navParams: NavParams
  ) {
    this.menuCtrl.enable(true);
    this.getAdmin();
  }


  getAdmin() {
    this.db.object(`Admin Data/Admins/${firebase.auth().currentUser.uid}`).snapshotChanges().subscribe(snap => {
      let temp: any = snap.payload.val();
      this.name = temp.Name;
      this.mail = temp.Email;
      this.pass = temp.Password;
    })
  }


  changePass() { this.navCtrl.push(ChangePassPage); }
}

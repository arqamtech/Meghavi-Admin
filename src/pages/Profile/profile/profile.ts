import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { ChangePassPage } from '../../Auth/change-pass/change-pass';
import { EditProfilePage } from '../edit-profile/edit-profile';


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
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    public navParams: NavParams
  ) {
    this.menuCtrl.enable(true);
    this.getAdmin();
  }


  getAdmin() {
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();

    this.db.object(`Admin Data/Admins/${firebase.auth().currentUser.uid}`).snapshotChanges().subscribe(snap => {
      let temp: any = snap.payload.val();

      this.name = temp.Name;
      this.mail = temp.Email;
      this.pass = temp.Password;
    })
    loading.dismiss();

  }

  editProfile() { this.navCtrl.push(EditProfilePage); }
  changePass() { this.navCtrl.push(ChangePassPage); }
}

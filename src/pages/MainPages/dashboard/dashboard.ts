import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { UsersPage } from '../users/users';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  ll: string = null;
  users: number = 0;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
    public navParams: NavParams
  ) {
    this.menuCtrl.enable(true);
    this.getUsers();
    this.getLastlogin();
  }

  getLastlogin() {
    this.db.object(`Admin Data/Admins/${firebase.auth().currentUser.uid}/Last Login`).snapshotChanges().subscribe(snap => {
      let temp: any = snap.payload.val();
      this.ll = temp;
    })

  }

  getUsers() {

    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();
    this.db.list(`Users`).snapshotChanges().subscribe(snap => {
      this.users = snap.length;
      loading.dismiss();
    })
  }

  gtUsers() { this.navCtrl.push(UsersPage); }
}

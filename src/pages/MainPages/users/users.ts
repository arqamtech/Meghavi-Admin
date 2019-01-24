import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { AddUsersPage } from '../../Users/add-users/add-users';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  Users: Array<any> = [];


  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
    public navParams: NavParams
  ) {
    this.menuCtrl.enable(true);
    this.getUsers();
  }

  getUsers() {

    // let loading = this.loadingCtrl.create({
    //   content: 'Logging In...'
    // });
    // loading.present();


    this.db.list(`Users`).snapshotChanges().subscribe(snap => {
      this.Users = [];
      snap.forEach(snip => {
        let temp: any = snip.payload.val();
        temp.key = snip.key;
        console.log(temp);
        
        this.Users.push(temp);
      })
      // loading.dismiss();
    })
  }

  addUser() { this.navCtrl.push(AddUsersPage); }

}

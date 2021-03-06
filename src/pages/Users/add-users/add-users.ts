import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-add-users',
  templateUrl: 'add-users.html',
})
export class AddUsersPage {

  userLabel = "User's";

  name: string;
  mail: string;
  phone: string;


  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    public navParams: NavParams
  ) {
    this.menuCtrl.enable(true);
  }


  checkData() {
    if (this.name) {
      if (this.mail) {
        if (this.phone) {
          if (this.phone.length == 10) {
            this.addUser();
          } else { this.presentToast("Enter a valid Phonenumber") }
        } else { this.presentToast("Enter" + this.userLabel + "Phonenumber") }
      } else { this.presentToast("Enter" + this.userLabel + "Email") }
    } else { this.presentToast("Enter" + this.userLabel + "Name") }
  }



  addUser() {
    let loading = this.loadingCtrl.create({
      content: 'Adding User...'
    });
    loading.present();


    firebase.database().ref("Users").push({
      Name: this.name,
      Email: this.mail,
      Phone: this.phone,
      TimeStamp: moment().format()
    }).then(() => {
      this.navCtrl.pop().then(() => {
        this.presentToast(this.userLabel + " " + "Added")
        loading.dismiss();

      });

    })
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: "bottom",
      showCloseButton: false,
    });
    toast.present();
  }

}

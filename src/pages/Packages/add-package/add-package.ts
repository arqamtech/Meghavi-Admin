import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-add-package',
  templateUrl: 'add-package.html',
})
export class AddPackagePage {

  name: string;
  price: string;
  desc: string;

  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {

  }



  checkData() {
    if (this.name) {
      if (this.price) {
        if (this.desc) {
          this.addUser();
        } else { this.presentToast("Enter a description for the package") }
      } else { this.presentToast("Enter the package's price") }
    } else { this.presentToast("Enter a name for Package") }
  }


  addUser() {
    let loading = this.loadingCtrl.create({
      content: 'Adding Package...'
    });
    loading.present();


    firebase.database().ref("Packages").push({
      Name: this.name,
      Price: this.price,
      Description: this.desc,
      TimeStamp: moment().format()
    }).then(() => {
      this.navCtrl.pop().then(() => {
        this.presentToast("Package Added")
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

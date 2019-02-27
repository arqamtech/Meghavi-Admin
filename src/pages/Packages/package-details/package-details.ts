import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-package-details',
  templateUrl: 'package-details.html',
})
export class PackageDetailsPage {


  package = this.navParams.get("package");

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
    console.log(this.package);
    if (!this.package.Bookings) { this.package.Bookings = "No Bookings yet"; }
  }



  delConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure you want to Delete this Package ?',
      buttons: [
        {
          text: 'No, Its a mistake',
          handler: () => {

          }
        },
        {
          text: "Yes, I'm sure",
          handler: () => {
            this.delPack();
          }
        }
      ]
    });
    confirm.present();
  }


  delPack() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    firebase.database().ref("Packages").child(this.package.key).remove().then(() => {
      this.navCtrl.pop();
      this.presentToast("Package Deleted")
      loading.dismiss();
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

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  name: string;
  mail: string;

  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
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
    firebase.database().ref(`Admin Data/Admins/${firebase.auth().currentUser.uid}`).once("value", snap => {
      let temp: any = snap.val();

      this.name = temp.Name;
      this.mail = temp.Email;
    })
    loading.dismiss();

  }

  checkData() {
    if (this.name) {
      if (this.mail) {
        this.update();
      } else { this.presentToast("Email Not Provided"); }
    } else { this.presentToast("Name Not Provided"); }
  }


  update() {
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();

    firebase.database().ref("Admin Data/Admins").child(firebase.auth().currentUser.uid).child("Name").set(this.name).then(() => {
      firebase.auth().currentUser.updateEmail(this.mail).catch((e) => {
        let tm = e.message;
        this.presentToast(tm);
        loading.dismiss();
      }).then(() => {
        firebase.database().ref("Admin Data/Admins").child(firebase.auth().currentUser.uid).child("Email").set(this.mail).then(() => {
          this.navCtrl.pop();
          this.presentToast("Admin Updated");
          loading.dismiss();
        })
      })
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

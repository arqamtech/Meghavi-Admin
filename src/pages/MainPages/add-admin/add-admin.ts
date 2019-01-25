import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';




@IonicPage()
@Component({
  selector: 'page-add-admin',
  templateUrl: 'add-admin.html',
})
export class AddAdminPage {



  name: string;
  mail: string;
  pass: string = this.genPass();

  adminMail: string;
  adminPass: string;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public db: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
    this.getAdmin();
    console.log(firebase.auth().currentUser.uid);
    
  }


  getAdmin() {
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();

    this.db.object(`Admin Data/Admins/${firebase.auth().currentUser.uid}`).snapshotChanges().subscribe(snap => {
      let temp: any = snap.payload.val();
      this.adminMail = temp.Email;
      this.adminPass = temp.Password;
    })
    loading.dismiss();

  }


  checkData() {
    if (this.name) {
      if (this.mail) {
        this.addAdmin();
      } else { this.presentToast("Enter an Email") }
    } else { this.presentToast("Enter a Name") }

  }

  addAdmin() {
    let loading = this.loadingCtrl.create({
      content: 'Creating an Admin...'
    });
    loading.present();


    firebase.auth().createUserWithEmailAndPassword(this.mail, this.pass).then(() => {
      firebase.database().ref("Admin Data/Admins").child(firebase.auth().currentUser.uid).set({
        Name: this.name,
        Email: this.mail,
        Password: this.pass,
      }).then(() => {
        firebase.auth().signInWithEmailAndPassword(this.adminMail, this.adminPass).then(() => {
          this.name = null;
          this.mail = null;
          this.pass = null;
          loading.dismiss();

        })
      })
    })


  }


  genPass() {
    let len = 16;
    let charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: "top",
      showCloseButton: false,
    });
    toast.present();
  }

}

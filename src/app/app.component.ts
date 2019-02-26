import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoaderPage } from '../pages/Support/loader/loader';
import { DashboardPage } from '../pages/MainPages/dashboard/dashboard';
import { AddAdminPage } from '../pages/MainPages/add-admin/add-admin';
import { UsersPage } from '../pages/MainPages/users/users';
import { ProfilePage } from '../pages/Profile/profile/profile';
import { LoginPage } from '../pages/Auth/login/login';
import * as firebase from 'firebase';
import { PackagesPage } from '../pages/MainPages/packages/packages';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoaderPage;
  activePage: any;

  full: boolean = true;

  pages: Array<{ title: string, component: any, icon: any }>;


  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();
    this.pages = [
      { title: 'DashBoard', component: DashboardPage, icon: "ios-analytics" },
      { title: 'Packages', component: PackagesPage, icon: "ios-cube" },
      { title: 'Users', component: UsersPage, icon: "ios-people" },

      // { title: 'Add Admin', component: AddAdminPage, icon: "ios-person" },
      // { title: 'Profile', component: ProfilePage, icon: "ios-people" },
    ];
    this.activePage = this.pages[1];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase.database().ref("Admin Data").child("Admins").child(user.uid).once('value', itemSnap => {
            if (itemSnap.exists()) {
              var welMsg = "Welcome" + " " + itemSnap.val().Name;
              // Managing Root Page
              this.rootPage = PackagesPage;


              this.presentToast(welMsg);
            } else {
              firebase.auth().signOut().then(() => {
                this.rootPage = LoginPage;
                this.presentToast("You are not registered a Admin")
              })
            }
          });
        }
        else {
          this.rootPage = LoginPage;
        }
      });
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    this.activePage = page;

  }
  checkActive(page) {
    return page == this.activePage;
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

  signOutConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure you want to Logout ?',
      buttons: [
        {
          text: 'No, Its a mistake',
          handler: () => {

          }
        },
        {
          text: "Yes, I'm sure",
          handler: () => {
            this.signOut();
          }
        }
      ]
    });
    confirm.present();
  }


  signOut() {
    firebase.auth().signOut().then(() => {
      this.nav.setRoot(LoginPage);
      this.presentToast("Signed Out");
    }).catch((error) => {
      console.log(error.message);
    });


  }


}

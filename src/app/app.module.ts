import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { firebaseCred } from './firebaseCred';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { LoginPage } from '../pages/Auth/login/login';
import { DashboardPage } from '../pages/MainPages/dashboard/dashboard';
import { UsersPage } from '../pages/MainPages/users/users';
import { AddUsersPage } from '../pages/Users/add-users/add-users';
import { EditUsersPage } from '../pages/Users/edit-users/edit-users';
import { LoaderPage } from '../pages/Support/loader/loader';
import { ProfilePage } from '../pages/Profile/profile/profile';
import { EditProfilePage } from '../pages/Profile/edit-profile/edit-profile';
import { AddAdminPage } from '../pages/MainPages/add-admin/add-admin';
import { ChangePassPage } from '../pages/Auth/change-pass/change-pass';
import { PackagesPage } from '../pages/MainPages/packages/packages';
import { AddPackagePage } from '../pages/Packages/add-package/add-package';
import { EditPackagePage } from '../pages/Packages/edit-package/edit-package';
import { PackageDetailsPage } from '../pages/Packages/package-details/package-details';


firebase.initializeApp(firebaseCred);

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    DashboardPage,
    UsersPage,
    AddUsersPage,
    EditUsersPage,
    LoaderPage,
    ProfilePage,
    EditProfilePage,
    AddAdminPage,
    ChangePassPage,
    PackagesPage,
    AddPackagePage,
    EditPackagePage,
    PackageDetailsPage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseCred),
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    DashboardPage,
    UsersPage,
    AddUsersPage,
    EditUsersPage,
    LoaderPage,
    ProfilePage,
    EditProfilePage,
    AddAdminPage,
    ChangePassPage,
    PackagesPage,
    AddPackagePage,
    EditPackagePage,
    PackageDetailsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }

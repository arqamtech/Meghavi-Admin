import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-package-details',
  templateUrl: 'package-details.html',
})
export class PackageDetailsPage {


  package = this.navParams.get("package");

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    console.log(this.package);
    if (!this.package.Bookings) { this.package.Bookings = "No Bookings yet"; }
  }


}

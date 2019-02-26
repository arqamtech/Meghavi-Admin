import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { AddPackagePage } from '../../Packages/add-package/add-package';
import { PackageDetailsPage } from '../../Packages/package-details/package-details';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-packages',
  templateUrl: 'packages.html',
})
export class PackagesPage {

  packages: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
    public menuCtrl: MenuController,
  ) {
    this.menuCtrl.enable(true);
    this.getPackages();
  }


  getPackages() {

    let loading = this.loadingCtrl.create({
      content: 'Logging In...'
    });
    loading.present();


    this.db.list(`Packages`).snapshotChanges().subscribe(snap => {
      this.packages = [];
      snap.forEach(snip => {
        let temp: any = snip.payload.val();
        temp.key = snip.key;
        console.log(temp);

        this.packages.push(temp);
      })
      loading.dismiss();
    })
  }


  addPackage() { this.navCtrl.push(AddPackagePage); }
  details(p) { this.navCtrl.push(PackageDetailsPage, { package: p }); }
}

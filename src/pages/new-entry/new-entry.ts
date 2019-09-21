import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-new-entry",
  templateUrl: "new-entry.html"
})
export class NewEntryPage {
  // estado
  entry = {
    value: "",
    category: 1
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad NewEntryPage");
  }

  submitForm() {
    console.log("Submit Button");
    console.log(this.entry);

    //this.navCtrl.pop();
    this.goBack();
  }

  goBack() {
    console.log("go back");
    // fecha a tela atual "pop"
    this.navCtrl.pop();
  }
}

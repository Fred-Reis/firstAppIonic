import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { NewEntryPage } from "../new-entry/new-entry";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(public navCtrl: NavController) {}

  // função em ts
  addEntry() {
    console.log("Adicionar nova entrada");
    // cria navegação entre paginas "push"
    this.navCtrl.push(NewEntryPage);
  }

  // exeDebbug() {
  //   console.log("Debbug Mode");

  //   let res = this.soma();

  //   console.log(`O valor da soma ${res}`);
  // }

  // soma() {
  //   let valor = 0;
  //   valor += 1;
  //   valor += 10;

  //   return valor;
  // }
}

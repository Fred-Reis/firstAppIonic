import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { NewEntryPage } from "../new-entry/new-entry";

// importnando o modulo do SQLite
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  // precisa adicionar no constructor de forma public o modulo que sera chamado dentro da classe
  constructor(public navCtrl: NavController,
    public sqlite: SQLite) {}

  // função em ts
  addEntry() {
    console.log("Adicionar nova entrada");
    // cria navegação entre paginas "push"
    this.navCtrl.push(NewEntryPage);
  }

  testDb() {
    console.log("criação DB");

    // comando para criação de banco de dados
    this.sqlite.create({
      // nome do DB
      name: 'data.db',
      location:'default'
    })
    // promises
    .then(() => {
      console.log('DB criado')
    });
  }
}

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
  constructor(public navCtrl: NavController, public sqlite: SQLite) {}

  // função em ts
  addEntry() {
    console.log("Adicionar nova entrada");
    // cria navegação entre paginas "push"
    this.navCtrl.push(NewEntryPage);
  }

  testDb() {
    console.log("criação DB");

    // comando para criação de banco de dados
    this.sqlite
      .create({
        // nome do DB
        name: "data.db",
        location: "default"
      })
      .then((db: SQLiteObject) => {
        // promises
        console.log("DB criado");

        // comando sql pra criar a tabela
        db.sqlBatch([
          [
            "CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, amount DECIMAL, description TEXT)"
          ]
        ])
          .then(() => {
            console.log("tabelas criadas");

            // insere um valor na tabela
            const value = 100.2;
            const description = "Alimentação";

            const sqlInsert =
              "INSERT INTO entries (amount, description) VALUES (?, ?)";
            const datainsert = [value, description];

            db.executeSql(sqlInsert, datainsert)
              .then(() => {
                console.log("valores inseridos");

                const sql = "SELECT amount, description FROM entries;";
                const data = [];

                db.executeSql(sql, data).then((values: any) => {
                  console.log(values.rows.length);

                  for (var i = 0; i < values.rows.length; i++) {
                    console.log(JSON.stringify(values.rows.item(i)));
                  }
                });
              })
              .catch(e => {
                console.error("erro ao inserir valores no DB", e);
              });
          })
          .catch(e => {
            console.error("erro ao executar comando sql", e);
          });
      })
      .catch(e => {
        // promises
        console.error("erro ao criar DB", e);
      });
  }
}

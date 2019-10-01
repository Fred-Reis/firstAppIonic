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
  constructor(public navCtrl: NavController, public sqlite: SQLite) { }

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
        this.createTable(db)
          .then(() => {
            console.log("tabelas criadas");

            // insere um valor na tabela
            const value = 10.2;
            const description = "Alimentação";

            this.insert(db, value, description)
              .then(() => {
                console.log("valores inseridos");

                this.select(db)
                  .then((values: any) => {
                    console.log(values.rows.length);

                    for (var i = 0; i < values.rows.length; i++) {
                      console.log(JSON.stringify(values.rows.item(i)));
                    }

                    this.update(999, 'alterado', 5, db)
                      .then(() => {

                        this.select(db)
                          .then((values: any) => {

                            console.log(values.rows.length);

                            for (var i = 0; i < values.rows.length; i++) {
                              console.log(JSON.stringify(values.rows.item(i)));
                            }
                          });
                      })
                  });
              })
          })
      })
      .catch(e => {
        // promises
        console.error("erro ao criar DB", e);
      });
  }
  createTable(db) {
    console.log("DB criado");

    // comando sql pra criar a tabela
    return db.sqlBatch([

      "CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, amount DECIMAL, description TEXT)"

    ])
      .catch(e => console.error('erro ao criar a tabela', JSON.stringify(e)))
  }

  insert(db, amount, description) {
    const sql = "INSERT INTO entries (amount, description) VALUES (?, ?)";
    const data = [amount, description];

    return db.executeSql(sql, data)
      .catch(e => console.error('erro ao inserir na tabela', JSON.stringify(e)))

  }

  update(db, amount, id, description) {
    const sql = "UPDATE entries SET amount = ?, description = ? WHERE id = ?"
    const data = [amount, description, id]

    return db.executeSql(sql, data)
      .catch(e => console.error('erro ao inserir na tabela', JSON.stringify(e)))
  }

  select(db) {
    const sql = "SELECT id, amount, description FROM entries;";
    const data = [];

    return db.executeSql(sql, data)
      .catch(e => console.error('erro ao buscar dados da tabela', JSON.stringify(e)))
  }
}

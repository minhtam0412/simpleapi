const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const app = express();
const PORT = 8899;
const db = require("./config/db");

app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect(db.url, (err, database) => {
    if (err) {
        console.log(err);
        return
    }

    database = database.db("news");
    require("./app/routes")(app, database);

    app.listen(PORT, () => {
        console.log("Server listening on port: " + PORT);
    })
});



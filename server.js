const ejs = require('ejs');
const express = require("express");
const mongoose = require('mongoose');
const multer = require('multer');

const Photo = require('./model/Photo');
mongoose.connect("mongodb://localhost:27017/sheetsdb", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
    .then((result) => console.log('Connected to DB'))
    .catch((error) => console.log('DBerror ' + error));

var date = new Date();
const app = express();
app.set("view engine", "ejs");
app.use(express.static("."));

app.get("/", function (request, response) {
    Photo.find().then((result) => { response.render("index", { data: result }) })
        .catch((err) => {
            response.send(err)
        });
});

app.use(multer({ dest: "imgs" }).single("photo"));

app.post("/", function (request, response) {
    let filedata = request.file;
    if (!filedata)
        console.log("error while uploading");
    else
        console.log('file', filedata.filename, 'uploaded');
    const datasheet = new Photo({
        name: filedata.filename + date.getFullYear() + date.getMonth() + date.getDate(),
        photo: "imgs/" + filedata.filename,
        size: filedata.size,
    });
    datasheet.save()
        .then(function (doc) {
            console.log('file', doc.name, 'saved');
            response.redirect("/");
        })
        .catch(function (err) {
            console.log(err);
            mongoose.disconnect();
        });
});


app.listen(3000, function () {
    console.log("Server started listening on 3000");
});
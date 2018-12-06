
var con=require("./db");
var cors = require('cors')
var multer = require('multer');
var path = require('path');

var express = require('express')
var bodyParser = require('body-parser')
var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', '*');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', '*');

    // Pass to next layer of middleware
    next();
});

var storage = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, file.originalname+ '-' + Date.now()+".jpg");
        }
    }
);

const upload = multer({
    dest: 'uploads/',
    storage: storage// this saves your file into a directory called "uploads"
});
var type = upload.single('file');


app.post('/upload', type, (req, res) => {
    // console.log(req);
    // console.log(req.file.path);
    console.log(req.file);
    if (req.file)
        res.send({"path":path.basename(req.file.path)});
    else
        res.send({"path":"default-dp.jpg"})

});



app.get('/get_contacts',function(req,resp){
    con.query("Select * from contacts",function(error,rows,fields) {

        if (!!error) {
            console.log("Unable to perform the query")
        }
        else {
            resp.json(rows)
        }
    });

});

app.post('/add_new_contact',function(req,res){
    var first_name=req.body.first_name;
    var last_name=req.body.last_name;
    var address=req.body.address;
    var phone=req.body.phone;
    var img=req.body.img;
    var facebook=req.body.facebook;


    var sql = "INSERT INTO contacts (first_name, last_name,address,phone,img,facebook) VALUES ?";
    var values = [
        [first_name, last_name,address,phone,img,facebook],
    ];
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
    res.send(req.body)
});



app.post('/delete_contact',function(req,res){

    console.log(req.body);

    var sql = "DELETE FROM contacts WHERE id = ?";
    var values = [
        [req.body.id],
    ];
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Contact Has Been Deleted: " + result.affectedRows);
    });
    res.send(req.body)
});

app.get('/image/:tagId',function(req,res){

    console.log(req.params.tagId);

    res.sendFile(path.join(path.normalize(__dirname+'/uploads/'+req.params.tagId)));


});

app.listen(3000);
console.log("Server Is Running...")
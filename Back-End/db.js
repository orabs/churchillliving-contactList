
var mysql = require('mysql');
port = process.env.PORT || 4205;

if (port === 4205) {

    var connection = mysql.createConnection({
        host: 'localhost',
        password: '',
        database: 'contactList'
    });
} else {

    //same as above, with live server details
}

connection.connect(function (error,tempCont)  {
    if (!!error) {
        tempCont.release();
        console.log("Error , Unable connect to the database")

    }
    else {
        console.log("Connected to the database")
    }

});

module.exports = connection;
const fs = require('fs');
const express = require('express');
const app = express();
// Run the app by serving the static files
// in the dist directory

app.use(express.static(__dirname));
// Start the app by listening on the default
// Heroku port

var porta = process.env.PORT || 8080;

//console.log("__dirname", __dirname + "/app/sistema/config.json");
//export NODE_ENV=development

var obj = {
   "env" : process.env.NODE_ENV
};
var json = JSON.stringify(obj);
fs.writeFile(__dirname + "/config/config.json", json, "utf8", function readFileCallback(error, success){
  console.log("error", error);
  console.log("success", success);
});


//console.log("NODE_ENV", process.env.NODE_ENV);

app.listen(porta, function(){
  console.log("servidor rodando", porta);
});
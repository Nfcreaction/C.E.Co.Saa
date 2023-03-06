const bodyParser = require('body-parser')
const express = require('express')
const https = require('https')
const path = require('path')
const http = require('http')
const ejs = require('ejs')
const app = express()

const server = http.createServer(app);

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('views', __dirname + '/views')
app.use(express.static('public'))
app.set('view engine', 'ejs')


app.route("/")
	.get((req, res)=>{
		res.render("index");
	});


server.listen(10000);
server.on('listening', () => console.log(`Servidor ejecuntado`));	
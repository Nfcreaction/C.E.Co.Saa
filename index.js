//modules
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const express = require('express')
const https = require('https')
const mysql = require('mysql')
const path = require('path')
const http = require('http')
const ejs = require('ejs')
const app = express()
const server = http.createServer(app);

//set
app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('views', __dirname + '/views')
app.use(express.static('public'))
app.set('view engine', 'ejs')

//routes
app.route("/")
.get((req, res)=>{
	res.render("index");
})

app.route("/panel")
.get((req, res)=>{
	if(req.cookies.access == "true"){
		res.render("panel")
	} else {
		res.redirect("/login")
	}
})

app.route("/login")	
.get((req, res)=>{
	res.render("login", {
		msg: ""
	})
})

.post((req, res)=>{
	let user = req.body.user
	let pass = req.body.pass

	if(user != "" & pass != "") {
		console.log("Hay datos")
	} else {
		res.render("login", {
			msg: "Complete los campos"
		})
	}	
	db.query("SELECT * FROM admin", (err, result)=>{
		if(err) throw err;
		if (result[0].usuario == user) {
			if (result[0].password == pass) {
				res.cookie('access', true, {
				  maxAge: 60 * 60 * 1000, // Duración de una hora
				  httpOnly: true, // Protocolo http
				  secure: true, // Conexión segura https
				  sameSite: true, // No se enviará en peticiones cross-site
				});
				res.cookie('User', req.body.user, {
				  maxAge: 60 * 60 * 1000, // Duración de una hora
				  httpOnly: true, // Protocolo http
				  secure: true, // Conexión segura https
				  sameSite: true, // No se enviará en peticiones cross-site
				});		
				res.redirect("/panel")
			} else {
				res.render("login", {
					msg: "Los datos ingresados no son correctos"
				})
			}
		} else {
			res.render("login", {
				msg: "Los datos ingresados no son correctos"
			})
		}
	})		
})

//db
const config = {
	host: "localhost",
	user: "root",
	database: "C.E.Co.Saa"
}
const db = mysql.createConnection(config)
db.connect((err)=>{
	if (err) throw err
	console.log("Base de datos conectada")
})

//init server
server.listen(10000, ()=>{
	console.log("Servidor ejecutando en el puerto 10000")
});
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

app.post("/noticia/subir", (req, res)=>{

	let sql = `INSERT INTO noticias (titulo, subtitulo, nota) VALUES ('${req.body.titulo}', '${req.body.subtitulo}', '${req.body.nota}')`
	db.query(sql, (err, result)=>{
		if(err) throw err;
		console.log("Noticia subida")
	})
})

app.get("/noticias", (req, res)=>{
	db.query("SELECT * FROM noticias", (err, result)=>{
		if(err) throw err;
		res.json(result)
	})
})

<<<<<<< HEAD
app.get("/noticia/:id", (req, res)=>{
	let sql = `SELECT * FROM noticias WHERE _id=${req.params.id}`
	db.query(sql, (err, result)=>{
=======
app.get("/noticia/:titulo", (req, res)=>{
	console.log(req.parser.titulo)
	let sql = `SELECT * FROM noticias WHERE _id=${req.parser.titulo}`
	de.query(sql, (err, result)=>{
>>>>>>> 87f9b950af294d8629e8aaf5d5f889fec7a2f5c2
		if (err) throw err;
		res.render("noticia", {
			titulo: result[0]["titulo"],
			subtitulo: result[0]["subtitulo"],
			nota: result[0]["nota"]
		})
	})
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
				res.cookie('acces', 'true', {
				  maxAge: 60 * 60 * 1000,
				})
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
	port: "3306",
	user: "root",
	database: "centro"
}
const db = mysql.createConnection(config)
db.connect((err)=>{
	if (err) throw err
	console.log("Base de datos conectada")
})

//init server
server.listen(80)
server.on("listening", ()=>{
	console.log("Servidor ejecutando en el puerto 80")
})

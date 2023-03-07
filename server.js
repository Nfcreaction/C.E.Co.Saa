const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const express = require('express')
const {Pool} = require('pg')
const https = require('https')
const path = require('path')
const http = require('http')
const ejs = require('ejs')
const app = express()
const server = http.createServer(app);

app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('views', __dirname + '/views')
app.use(express.static('public'))
app.set('view engine', 'ejs')


app.route("/")
.get((req, res)=>{
	res.render("index");
});


var Pass = "et17de13"

app.route("/panel")
.get((req, res)=>{
	if (req.cookies.access == "true") {
		res.render("panel")
	} else{
		res.render("login")
	}
})

app.route("/login")	
.get((req, res)=>{
	res.render("login")
})
.post((req, res)=>{
	let user = req.body.user
	let pass = req.body.pass

	if (pass = Pass) {
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
		res.render("login")
	}

})

app.post("/noticia", (req, res)=>{
	console.log(req.body)
	res.end()
})


server.listen(10000);
server.on('listening', () => console.log(`Servidor ejecuntado`));	

const config = {
	user: "admin",
	host: "dpg-cg3n7kqk728j7kn1bb0g-a",
	password: "klbBWrU2Z7GMSdg31eYmtYV9Z2qE5rUr",
	database: "files_um9q",
	port: 5432
}

const db = new Pool(config)

const execute = async (query) => {
    try {
        await db.connect();     // gets connection
        await db.query(query);  // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await db.end();         // closes connection
    }
};

const text = `
    CREATE TABLE IF NOT EXISTS "users" (
	    "id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
	    "role" VARCHAR(15) NOT NULL,
	    PRIMARY KEY ("id")
    );`;

execute(text).then(result => {
    if (result) {
        console.log('Table created');
    }
});

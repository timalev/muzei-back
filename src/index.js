const express = require("express")
const app = express()

const formidable = require('formidable');
const fs = require('fs');

const path = require("path")
const hbs = require("hbs")
const connection = require("./mysqldb")
const cors = require('cors');

const multer = require('multer');

const tempelatePath = path.join(__dirname, '../templates')


app.use(cors());
app.use(express.json())
app.set("view engine", "hbs")
app.set("views", tempelatePath)
app.use(express.urlencoded({extended: false}))


app.use('/src/uploads', express.static('uploads'));



const storage = multer.diskStorage({
	
	destination: function (req,file,cb) {
		cb(null,'uploads');

	},
	filename: function (req, file, cb){
		cb(null, file.originalname);
	}


});

app.get("/", (req, res) => {
    res.render("login")
})




app.post("/adduser", (req, res) => {

	let stuser = "true";
	let stadmin = "false";
    
	if (req.body.type=="пользователь")
	{
		stuser = "false";
		stadmin = "true";
	}
	

	const user = [req.body.email,req.body.user, stuser, stadmin, req.body.type];
    const sql = "INSERT INTO users(emails, uid, statususer, statusadmin, status) VALUES(?, ?, ?, ?, ?)";
 
connection.query(sql, user, function(err, results) {
    if(err) console.log(err);
    //else console.log("Данные добавлены");
});
	//connection.end();


	 res.setHeader('Access-Control-Allow-Origin', '*'); /* @dev First, read about security */
     res.setHeader('Access-Control-Allow-Credentials', true);
     res.setHeader('Access-Control-Allow-Methods','*'); // 30 days
     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'); //
         
     res.send("ok")


	
	//res.render("login")
})


const upload = multer({ storage });



app.post("/uploadImage", upload.single("image"), (req, res) => {
    
	//console.log(req.body.muzey + " / " + req.body.descr + " / ");

	let add_photo = "";

	if (req.file!=null)
	{
		add_photo = ", photos='" + req.file.originalname + "'";
	}

	//res.json({message: 'Image uploaded successfully'});

	


	if (req.body.upd!='')
	{
		const sql = "UPDATE muzei SET names = '" + req.body.muzey + "', descr='" + req.body.descr + "' " + add_photo + " WHERE id = " + req.body.upd;
		
		connection.query(sql, function (err, result) {
			if (err) console.log(err);
			console.log(result.affectedRows + " record(s) updated");
			});

	}else{


		const muzey = [req.body.muzey,req.body.descr,req.file.originalname,req.body.usr];


	 const sql = "INSERT INTO  muzei(names, descr, photos, users) VALUES(?, ?, ?, ?)";
	 
	 connection.query(sql, muzey, function(err, results) {
		 if(err) console.log(err);
		 else console.log("Данные добавлены");
		 });

	}



	 res.setHeader('Access-Control-Allow-Origin', '*'); 
     res.setHeader('Access-Control-Allow-Credentials', true);
     res.setHeader('Access-Control-Allow-Methods','*'); // 30 days
     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'); //
         
     res.send("ok")


	
	//res.render("login")
})




app.post("/uploadVist", upload.single("image"), (req, res) => {
    
	//console.log(req.body.muz + " / " + req.body.descr + " / ");

	let add_photo = "";

	if (req.file!=null)
	{
		add_photo = ", photos='" + req.file.originalname + "'";
	}

	//res.json({message: 'Image uploaded successfully'});

	


	if (req.body.upd!='')
	{
		const sql = "UPDATE vistavki SET muz = '" + req.body.muz + "', names = '" + req.body.vist + "', descr='" + req.body.descr + "' " + add_photo + " WHERE id = " + req.body.upd;
		
		connection.query(sql, function (err, result) {
			if (err) console.log(err);
			console.log(result.affectedRows + " record(s) updated");
			});

	}else{


		const vist = [req.body.muz,req.body.vist,req.body.descr,req.file.originalname,req.body.usr];


	 const sql = "INSERT INTO vistavki(muz, names, descr, photos, users) VALUES(?, ?, ?, ?, ?)";
	 
	 connection.query(sql, vist, function(err, results) {
		 if(err) console.log(err);
		 else console.log("Данные добавлены");
		 });

	}

	 res.setHeader('Access-Control-Allow-Origin', '*'); 
     res.setHeader('Access-Control-Allow-Credentials', true);
     res.setHeader('Access-Control-Allow-Methods','*'); // 30 days
     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'); //
         
     res.send("ok")
})


app.get("/getdatabyid", async (req, res) =>{

	let id = req.query.id;

	//console.log(id);

	connection.query("SELECT * FROM muzei WHERE id=" + id,
    function(err, results, fields) {
    //console.log(err);
    // console.log(results); // собственно данные
    //console.log(fields); // мета-данные полей 

	res.send(JSON.stringify(results));

});

});


app.get("/getdatabyidv", async (req, res) =>{

	let id = req.query.idv;

	connection.query("SELECT * FROM vistavki WHERE id=" + id,
    function(err, results, fields) {

	res.send(JSON.stringify(results));
});




});

// api метод получения списка музеев для админов

app.get("/getmuzei", (req, res) => {

	let user = req.query.user;

	connection.query("SELECT * FROM muzei WHERE users='" + user + "'",
    function(err, results, fields) {
	res.send(JSON.stringify(results));
   
})
});

// api метод получения списка музеев для пользователей

app.get("/getallmuzei", (req, res) => {

	let user = req.query.user;

	connection.query("SELECT * FROM muzei",
    function(err, results, fields) {
    console.log(results);  
	res.send(JSON.stringify(results));
   
})
});


// api удаления музея

app.get("/delmuz", (req, res) => {

    let sql = "DELETE FROM muzei WHERE id=" + req.query.dm;
	
	connection.query(sql, function (err, result) {
    if (err) throw err;
	res.send("Number of records deleted: " + result.affectedRows);

  });

});

app.get("/delvis", (req, res) => {

    let sql = "DELETE FROM vistavki WHERE id=" + req.query.dv;
	
	connection.query(sql, function (err, result) {
    if (err) throw err;
	res.send("Number of records deleted: " + result.affectedRows);

  });

});



app.get("/getvistavki", (req, res) => {

	let user = req.query.user;

	//console.log(user);

	connection.query("SELECT * FROM vistavki WHERE users='" + user + "'",
    function(err, results, fields) {
	res.send(JSON.stringify(results));

})
});


// api метод возвращает все выставки определенного музея


app.get("/getvistavkibymuz", (req, res) => {
	
	let sql = "SELECT * FROM vistavki WHERE muz=" + req.query.muz;

    // let sql = "SELECT * FROM vistavki WHERE users='" + req.query.user + "' AND muz=" + req.query.muz;
	
	connection.query(sql, function (err, result) {
    if (err) throw err;
	res.send(JSON.stringify(result));

  });

});



// api метод получения записи музея

app.get("/getmuzeirec", (req, res) => {

	let user = req.query.user;
	let id = req.query.id;
	//console.log("SELECT * FROM muzei WHERE users='" + user + "' AND id=" + id);

	connection.query("SELECT * FROM muzei WHERE id=" + id,
    function(err, results, fields) {

	res.send(JSON.stringify(results));
     
})
});


// api метод получения записи выставки

app.get("/getvistrec", (req, res) => {

	let id = req.query.id;
	connection.query("SELECT * FROM vistavki WHERE  id=" + id,
    function(err, results, fields) {
	res.send(JSON.stringify(results));
     
})
});


// api метод записи на выставку

app.get("/booking", (req, res) => {

	const zapis = [req.query.id ,req.query.user];
    
	const sql = "INSERT INTO booking(vistavka, users) VALUES(?, ?)";
	 
	 connection.query(sql, zapis, function(err, results) {
		 if(err) console.log(err);
		 else 
		 {	 
		// console.log("Данные добавлены");

		 res.send("Запись успешно добавлена!");
		 }
		 });
});


// api метод получения статуса пользователя

app.get("/getstatus", (req, res) => {

	let user = req.query.user;
	
	//console.log("SELECT * FROM users WHERE  uid='" + user + "'");
	
	connection.execute("SELECT * FROM users WHERE  uid='" + user + "'",
    function(err, results, fields) {
	res.send(JSON.stringify(results));
     
})
		 

});





	 




app.listen(3000, () =>{
    
    
    console.log("port conected")
})

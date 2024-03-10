const express = require("express")
const app = express()

const formidable = require('formidable');
const fs = require('fs');

const path = require("path")
const hbs = require("hbs")

const cors = require('cors');

const multer = require('multer');

const tempelatePath = path.join(__dirname, '../templates')


app.use(cors());
app.use(express.json())
app.set("view engine", "hbs")
app.set("views", tempelatePath)
app.use(express.urlencoded({extended: false}))


app.use('/src/uploads', express.static('uploads'));


const mssql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: 'BiZone__12',
        server: 'localhost', 
        database: 'muzei2' ,
		charset: 'utf8',
	  synchronize: true,
        trustServerCertificate: true,
    };


const pool = mssql.connect(config);	

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


app.get("/testapi", (req, res) => {

mssql.connect(config, function (err) {
    
        if (err) console.log(err);
        var request = new mssql.Request();
		   

        request.query("SELECT * FROM  users", function (err, result) {
            
            if (err) console.log(err)
			else console.log(result.recordset);
			
			res.send(JSON.stringify(result.recordset));

       
            
        });
    });
	
	
	 res.setHeader('Access-Control-Allow-Origin', '*'); /* @dev First, read about security */
     res.setHeader('Access-Control-Allow-Credentials', true);
     res.setHeader('Access-Control-Allow-Methods','*'); // 30 days
     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'); //
       
	 

})

app.post("/adduser", (req, res) => {

	let stuser = "true";
	let stadmin = "false";
    
	if (req.body.type=="пользователь")
	{
		stuser = "false";
		stadmin = "true";
	}
 
 
	 mssql.connect(config, function (err) {
    
        if (err) console.log(err);
        var request = new mssql.Request();
		   

        request.query("INSERT INTO users (emails, uid, statususer, statusadmin, status) VALUES('" + req.body.email + "','" + req.body.user + "', '" + stuser + "', '" + stadmin + "', '" + req.body.type + "')", function (err, recordset) {
            
            if (err) console.log(err)
			else console.log(recordset);

       
            
        });
    });
	

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
	
	
    let sql = "UPDATE muzei SET names = '" + req.body.muzey + "', descr='" + req.body.descr + "' " + add_photo + " WHERE id = " + req.body.upd;


	if (req.body.upd=='')
	{
		sql = "INSERT INTO  muzei(names, descr, photos, users) VALUES('" + req.body.muzey + "','" + req.body.descr + "','" + req.file.originalname + "','" + req.body.usr + "')";
	}
	
	 mssql.connect(config, function (err) {
    
        if (err) console.log(err);
        var request = new mssql.Request();
		   
        request.query(sql, function (err, recordset) {
            
            if (err) console.log(err)
			else console.log(recordset);
        });
    });

	 res.setHeader('Access-Control-Allow-Origin', '*'); 
     res.setHeader('Access-Control-Allow-Credentials', true);
     res.setHeader('Access-Control-Allow-Methods','*'); // 30 days
     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'); //
         
     res.send("ok")

})


// // api метод добавления нового музея


app.post("/uploadVist", upload.single("image"), (req, res) => {
    
	//console.log(req.body.muz + " / " + req.body.descr + " / ");

	let add_photo = "";

	if (req.file!=null)
	{
		add_photo = ", photos='" + req.file.originalname + "'";
	}

	//res.json({message: 'Image uploaded successfully'});
	
	let sql = "UPDATE vistavki SET muz = '" + req.body.muz + "', names = '" + req.body.vist + "', descr='" + req.body.descr + "' " + add_photo + " WHERE id = " + req.body.upd;


	if (req.body.upd=='')
	{
		sql = "INSERT INTO vistavki(muz, names, descr, photos, users) VALUES('" + req.body.muz + "', '" + req.body.vist + "', '" + req.body.descr + "', '" + req.file.originalname + "', '" + req.body.usr + "')";
	}
	
	mssql.connect(config, function (err) {
    
        if (err) console.log(err);
        var request = new mssql.Request();
		   

        request.query(sql, function (err, recordset) {
            
            if (err) console.log(err)
			else console.log(recordset);

        });
    });
	

	 res.setHeader('Access-Control-Allow-Origin', '*'); 
     res.setHeader('Access-Control-Allow-Credentials', true);
     res.setHeader('Access-Control-Allow-Methods','*'); // 30 days
     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'); //
         
     res.send("ok")
})


app.get("/getdatabyid", async (req, res) =>{

	let id = req.query.id;
	
	mssql.connect(config, function (err) {
    
        if (err) console.log(err);
        var request = new mssql.Request();
		   
        request.query("SELECT * FROM muzei WHERE id=" + id, function (err, results) {
            
            if (err) console.log(err)
			else console.log(results);
			
			res.send(JSON.stringify(results.recordset));            
        });
    });

});


app.get("/getdatabyidv", async (req, res) =>{

	let id = req.query.idv;
	
	mssql.connect(config, function (err) {
    
        if (err) console.log(err);
        var request = new mssql.Request();
		   
        request.query("SELECT * FROM vistavki WHERE id=" + id, function (err, results) {
            
            if (err) console.log(err)
			else console.log(results);
			
			res.send(JSON.stringify(results.recordset));            
        });
    });
});

// api метод получения списка музеев для админов

app.get("/getmuzei", (req, res) => {

	let user = req.query.user;
	
	 	 mssql.connect(config, function (err) {
    
        if (err) console.log(err);
        var request = new mssql.Request();
		   
        request.query("SELECT * FROM muzei WHERE users='" + user + "'", function (err, results) {
            
            if (err) console.log(err)
			else console.log(results);
			
			res.send(JSON.stringify(results.recordset));
  
        });
    });
});

// api метод получения списка музеев для пользователей

app.get("/getallmuzei", (req, res) => {

	let user = req.query.user;
	
	
	 	mssql.connect(config, function (err) {
    
        if (err) console.log(err);
        var request = new mssql.Request();
		   
        request.query("SELECT * FROM muzei", function (err, results) {
            
            if (err) console.log(err)
			else console.log(results);
			
			res.send(JSON.stringify(results.recordset));            
        });
    });

});


// api удаления музея

app.get("/delmuz", (req, res) => {

    let sql = "DELETE FROM muzei WHERE id=" + req.query.dm;
	
		mssql.connect(config, function (err) {
    
        if (err) console.log(err);
        var request = new mssql.Request();
		   

        request.query(sql, function (err, recordset) {
            
            if (err) console.log(err)
			else console.log(recordset);

        });
    });
	
});

// api метод удаления выставки


app.get("/delvis", (req, res) => {

    let sql = "DELETE FROM vistavki WHERE id=" + req.query.dv;
	
		mssql.connect(config, function (err) {
    
        if (err) console.log(err);
        var request = new mssql.Request();
		   
        request.query(sql, function (err, recordset) {
            
            if (err) console.log(err)
			else console.log(recordset);

        });
    });


});

// api метод получения списка выставок для пользователей

app.get("/getvistavki", (req, res) => {

	let user = req.query.user;

	mssql.connect(config, function (err) {
    
        if (err) console.log(err);
        var request = new mssql.Request();
		   
        request.query("SELECT * FROM vistavki WHERE users='" + user + "'", function (err, results) {
            
            if (err) console.log(err)
			else console.log(results);
			
			res.send(JSON.stringify(results.recordset));            
        });
    });

	
	
});


// api метод возвращает все выставки определенного музея


app.get("/getvistavkibymuz", (req, res) => {
	
	let sql = "SELECT * FROM vistavki WHERE muz=" + req.query.muz;

    // let sql = "SELECT * FROM vistavki WHERE users='" + req.query.user + "' AND muz=" + req.query.muz;
	
	mssql.connect(config, function (err) {
    
        if (err) console.log(err);
        var request = new mssql.Request();
		   
        request.query(sql, function (err, results) {
            
            if (err) console.log(err)
			else console.log(results);
			
			res.send(JSON.stringify(results.recordset));            
        });
    });
	
});



// api метод получения записи музея

app.get("/getmuzeirec", (req, res) => {

	let user = req.query.user;
	let id = req.query.id;
	//console.log("SELECT * FROM muzei WHERE users='" + user + "' AND id=" + id);
	
	mssql.connect(config, function (err) {
    
        if (err) console.log(err);
        var request = new mssql.Request();
		   
        request.query("SELECT * FROM muzei WHERE id=" + id, function (err, results) {
            
            if (err) console.log(err)
			else console.log(results);
			
			res.send(JSON.stringify(results.recordset));            
        });
    });
	
	


});


// api метод получения записи выставки

app.get("/getvistrec", (req, res) => {

	let id = req.query.id;
	
	mssql.connect(config, function (err) {
    
        if (err) console.log(err);
        var request = new mssql.Request();
		   
        request.query("SELECT * FROM vistavki WHERE  id=" + id, function (err, results) {
            
            if (err) console.log(err)
			else console.log(results);
			
			res.send(JSON.stringify(results.recordset));            
        });
    });
	
	
 
});


// api метод записи на выставку

app.get("/booking", (req, res) => {

	const zapis = [req.query.id ,req.query.user];
    
	const sql = "INSERT INTO booking(vistavka, users) VALUES('" + req.query.id + "', '" + req.query.user + "')";
	
	mssql.connect(config, function (err) {
    
        if (err) console.log(err);
        var request = new mssql.Request();
		   

        request.query(sql, function (err, recordset) {
            
            if (err) console.log(err)
			else {
				console.log(recordset);
				res.send("Запись успешно добавлена!");
			}

        });
    });
	
	

});


// api метод получения статуса пользователя

app.get("/getstatus", (req, res) => {

	let user = req.query.user;
	
	
	
	 	 mssql.connect(config, function (err) {
    
        if (err) console.log(err);
        var request = new mssql.Request();
		   

        request.query("SELECT * FROM users WHERE  uid='" + user + "'", function (err, results) {
            
            if (err) console.log(err)
			else console.log(results);
			
			res.send(JSON.stringify(results.recordset));

       
            
        });
    });
	

		 

});





	 




app.listen(3000, () =>{
    
    
    console.log("port conected")
})

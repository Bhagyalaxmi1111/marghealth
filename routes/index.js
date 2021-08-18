const fs = require('fs');
const db=require('../config/db.config');
const medicinetbl=db.medicinetbl;
const sequelize=db.sequelize;
const csv = require('fast-csv');
var path = require('path');

const multer = require('multer');
const express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/api/getAll', async(req, res, next) =>{
   await medicinetbl.findAll({}).then((data)=>{
            res.send({error:false,Data:data,message:"Data found" });

    }).catch((err)=>{
        res.send({error:true,data:[],message:"Error while retriving data" });
    })

 
});
router.post('/api/searchByNameAndBatchNumber', async(req, res, next) =>{
    let search=req.body.search;
   await sequelize
    .query(`SELECT * from medicinetbl where  c_name like ? or c_batch_no like ?`, {
      replacements: [`%${search}%`,`%${search}%`],
      type: sequelize.QueryTypes.SELECT,
    })
    .then(function (data) {
      if (data.length > 0) {
        res.send({error:false, message: "success", data: data });
      } else {
        res.send({error:true, message: "data not Found",data: data });
      }
    })
    .catch((err) => {
      res.status(200).send({
        error:true,
        message: "Error while retrieving data"+err,
      });
    });
 
  
 });

global.__basedir = __dirname;
 
// -> Multer Upload Storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	   cb(null,'D:/Node js Training/marghealth/uploads/')
	},
	filename: (req, file, cb) => {
	   cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
	}
});
 
const upload = multer({storage: storage});

// -> Express Upload RestAPIs
router.post('/api/uploadfile', upload.single("uploadfile"), async(req, res) =>{
	console.log(req.file.filename);
   await importCsvData2MySQL(req.file.filename);
	res.json({
				msg: 'File uploaded/import successfully!', file: req.file
			});
});

// -> Import CSV File to MySQL database
function importCsvData2MySQL(filePath){
    
    let stream = fs.createReadStream("D:/Node js Training/marghealth/uploads/"+ filePath);
   
    let csvData = [];
    let csvStream = csv
        .parse()
        .on("data", function (data) {
            csvData.push(data);
        })
        .on("end", function () {
            // Remove Header ROW
            csvData.shift();
            csvData.map(async(row)=>{
                let data={
                    c_name:`${row[0]}`,
                    c_batch_no:`${row[1]}`,
                    d_expiry_date:`${row[2]}`,
                    n_balance_qty: `${row[3]}`,
                    c_packaging:`${row[4]}`,
                    c_unique_code: `${row[5]}`,
                    c_schemes: `${row[6]}`,
                    n_mrp: `${row[7]}`,
                    c_manufacturer:`${row[8]}`,
                    hsn_code:`${row[9]}`
                }
              await   medicinetbl.create(data).then((d)=>{
                    //    console.log(d)
                }).catch((err)=>{
                    console.log(err);
                });
            })
			fs.unlinkSync("D:/Node js Training/marghealth/uploads/"+ filePath)
        });
 
    stream.pipe(csvStream);
}

module.exports = router;

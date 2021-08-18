const Sequelize=require("sequelize");
sequelize=new Sequelize({
    dialect:"mysql",
    database:"marghealthdb",
    username:"root",
    host:"localhost",
    port:"3307",
    password:"",
    logging:true,
    operatorsAliases:0,
    pool:{
        max:100,
        min:1,
        idle:200000,
        acquire:200000,
    },
    retry:{max:3},
    // dialectOptions: {
    //   options: {
    //     encrypt: false, // Use this if you're on Windows Azure
    //   //   instanceName: "MSSQLSERVER",
    //   },
    // }, 
});
sequelize
    .authenticate()
    .then(()=>{
        console.log("connection has been successfully established");
    })
    .catch((err)=>{
        console.error("Unable to connect to the database:", err);
     })

const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;
db.medicinetbl=require("../model/medicinetbl.model")(sequelize,Sequelize);
module.exports=db;
//const { Sequelize } = require("sequelize/types");

module.exports = (sequelize, Sequelize) => {
    const model = sequelize.define(
        "medicinetbl", {
        c_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        c_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        c_batch_no: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        d_expiry_date:{
            type:Sequelize.DATEONLY,
            allowNull:false,   
        },
        n_balance_qty: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        c_packaging: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        c_unique_code: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        c_schemes: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        n_mrp: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        c_manufacturer: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        hsn_code: {
            type: Sequelize.STRING,
            allowNull: false,
        }
        
    },
    {
        freezeTableName: true,
        timestamps: false,
      }
    );
    return model;
}

/* const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./index"); */
module.exports=(sequelize,DataTypes)=>{
    const Support_Email_Address = sequelize.define('Support_Email_Address', {
        url: {
            type: DataTypes.STRING,
            allowNull: true
          },
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true
        },
        
        brand_id: {
            type: DataTypes.BIGINT,
            allowNull: true
          },

        default: {
            type: DataTypes.BOOLEAN,
            allowNull: true
          },
        name: {
            type: DataTypes.STRING,
            allowNull: true
          },
        email: {
            type: DataTypes.STRING,
            allowNull: true
          },
        forwarding_status: {
            type: DataTypes.STRING,
            allowNull: true
          },
        spf_status: {
            type: DataTypes.STRING,
            allowNull: true
          },
        cname_status: {
            type: DataTypes.STRING,
            allowNull: true
          },
        domain_verification_status: {
            type: DataTypes.STRING,
            allowNull: true
          },
        domain_verification_code:{
            type: DataTypes.STRING,
            allowNull: true
          },
        
      }, {
        sequelize,
        tableName: 'support_email_address',
        timestamps: false,

      });
      return Support_Email_Address;
    }
    
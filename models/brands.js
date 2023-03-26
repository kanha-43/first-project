/* const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./index"); */
module.exports=(sequelize,DataTypes)=>{
    const Brands = sequelize.define('Brands', {
        url: {
            type: DataTypes.STRING,
            allowNull: true
          },
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
          },
        brand_url: {
            type: DataTypes.STRING,
            allowNull: true
          },
        subdomain: {
            type: DataTypes.STRING,
            allowNull: true
          },
        host_mapping: {
            type: DataTypes.STRING,
            allowNull: true
          },
        has_help_center: {
            type: DataTypes.STRING,
            allowNull: true
          },
        help_center_state: {
            type: DataTypes.STRING,
            allowNull: true
          },  
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: true
          },
        default: {
            type: DataTypes.BOOLEAN,
            allowNull: true
          },
        
        is_deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true
          },
        logo: {
            type: DataTypes.STRING,
            allowNull: true
          },
        ticket_form_ids: {
            type: DataTypes.JSON,
            allowNull: true
          },
        signature_template: {
            type: DataTypes.TEXT,
            allowNull: true
          },
        
        
      }, {
        sequelize,
        tableName: 'brands',
        timestamps: false,

      });
      return Brands;
    }
    
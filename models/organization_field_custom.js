/* const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./index"); */
module.exports=(sequelize,DataTypes)=>{
    const Organization_field_custom = sequelize.define('Organization_field_custom', {
        custom_field_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          
          
          references: {
            model: 'organization_fields',
            key: 'id'
          }
        },
        /* 'conditions.all': {
          type: DataTypes.JSON,
          allowNull: true
        } */
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey:true,
          },
        name: {
            type: DataTypes.STRING,
            allowNull: true
          },
        raw_name: {
            type: DataTypes.STRING,
            allowNull: true
          },
        value: {
            type: DataTypes.STRING,
            allowNull: true
            }
      }, {
        sequelize,
        tableName: 'organization_field_custom',
        timestamps: false,
        /* indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
              { name: "id" },
            ]
          },
        ] */
      });
      return Organization_field_custom;
    }
    
      //console.log(Conditions_all === sequelize.models.Conditions_all);
    
      //module.exports=Conditions_all
    
    
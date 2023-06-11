/* const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./index"); */
module.exports=(sequelize,DataTypes)=>{
    const Macros_Action = sequelize.define('Macros_Action', {
        action_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          references: {
            model: 'macros',
            key: 'id'
          }
        },
        field: {
          type: DataTypes.STRING,
          allowNull: true
        },
        field_id:{
          type: DataTypes.BIGINT,
          allowNull: true
        },
        value: {
            type: DataTypes.JSON,
            allowNull: true
          },
        value_extract: {
            type: DataTypes.STRING,
            allowNull: true
          },
          
      }, {
        sequelize,
        tableName: 'macros_action',
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
      return Macros_Action;
    }
    
    /* field: {
            type: DataTypes.STRING,
            allowNull: true
          },
        operator: {
            type: DataTypes.STRING,
            allowNull: true
          },
        value: {
            type: DataTypes.STRING,
            allowNull: true
            } */
    
    //console.log(Action === sequelize.models.Action);
    
    //module.exports=Action
    
    
/* const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./index"); */
module.exports=(sequelize,DataTypes)=>{
    const Trigger_Cond_all = sequelize.define('Trigger_Cond_all', {
        condition_all_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          
          references: {
            model: 'triggers',
            key: 'id'
          }
        },
        /* 'conditions.all': {
          type: DataTypes.JSON,
          allowNull: true
        } */
        field: {
            type: DataTypes.STRING,
            allowNull: true
          },
        field_id: {
            type: DataTypes.BIGINT,
            allowNull: true
              },
        operator: {
            type: DataTypes.STRING,
            allowNull: true
          },
        value: {
            type: DataTypes.STRING,
            allowNull: true
            },
          
      }, {
        sequelize,
        tableName: 'trigger_cond_all',
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
      return Trigger_Cond_all;
    }
    
      //console.log(Conditions_all === sequelize.models.Conditions_all);
    
      //module.exports=Conditions_all
    
    
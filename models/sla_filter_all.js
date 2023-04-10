/* const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./index"); */
module.exports=(sequelize,DataTypes)=>{
    const Sla_filter_all = sequelize.define('Sla_filter_all', {
        filter_all_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          
          references: {
            model: 'sla_policies',
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
        operator: {
            type: DataTypes.STRING,
            allowNull: true
          },
        value: {
            type: DataTypes.STRING,
            allowNull: true
            }
      }, {
        sequelize,
        tableName: 'sla_filter_all',
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
      return Sla_filter_all;
    }
    
      //console.log(Conditions_all === sequelize.models.Conditions_all);
    
      //module.exports=Conditions_all
    
    
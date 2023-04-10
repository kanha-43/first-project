/* const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./index"); */
module.exports=(sequelize,DataTypes)=>{
    const Sla_policy_metrics = sequelize.define('Sla_policy_metrics', {
        sla_id: {
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
        priority: {
            type: DataTypes.STRING,
            allowNull: false,
          
          },
        metric: {
            type: DataTypes.STRING,
            allowNull: true
          },
        target: {
            type: DataTypes.INTEGER,
            allowNull: true
          },
        business_hours: {
            type: DataTypes.STRING,
            allowNull: true
            }
      }, {
        sequelize,
        tableName: 'sla_policy_metrics',
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
      return Sla_policy_metrics;
    }
    
      //console.log(Conditions_all === sequelize.models.Conditions_all);
    
      //module.exports=Conditions_all
    
    
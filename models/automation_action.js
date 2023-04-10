/* const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./index"); */
module.exports=(sequelize,DataTypes)=>{
    const Automation_Action = sequelize.define('Automation_Action', {
        action_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          references: {
            model: 'automations',
            key: 'id'
          }
        },
        field: {
          type: DataTypes.STRING,
          allowNull: true
        },
        value: {
            type: DataTypes.JSON,
            allowNull: true
          }
      }, {
        sequelize,
        tableName: 'automation_action',
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
      return Automation_Action;
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
    
    
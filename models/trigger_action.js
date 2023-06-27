/* const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./index"); */
module.exports=(sequelize,DataTypes)=>{
    const Trigger_Action = sequelize.define('Trigger_Action', {
        action_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          references: {
            model: 'triggers',
            key: 'id'
          }
        },
        field: {
          type: DataTypes.STRING,
          allowNull: true
        },
        value: {
            type: DataTypes.STRING,
            allowNull: true
          }
      }, {
        sequelize,
        tableName: 'trigger_action',
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
      return Trigger_Action;
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
    
    
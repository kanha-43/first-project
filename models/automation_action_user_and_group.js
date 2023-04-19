/* const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./index"); */
module.exports=(sequelize,DataTypes)=>{
    const Automation_Action_user_and_group = sequelize.define('Automation_Action_user_and_group', {
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
        notification_group_name: {
            type: DataTypes.STRING,
            allowNull: true
          },
        email_subject: {
            type: DataTypes.STRING,
            allowNull: true
          },
        email_body: {
            type: DataTypes.TEXT,
            allowNull: true
          },
      }, {
        sequelize,
        tableName: 'automation_action_user_and_group',
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
      return Automation_Action_user_and_group;
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
    
    
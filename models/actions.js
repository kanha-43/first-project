/* const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./index"); */
module.exports=(sequelize,DataTypes)=>{
const Action = sequelize.define('Action', {
    action_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'master',
        key: 'id'
      }
    },
    field: {
      type: DataTypes.STRING,
      allowNull: true
    },
    /* value: {
        type: DataTypes.JSON,
        allowNull: true
      } */
  }, {
    sequelize,
    tableName: 'action',
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
  return Action;
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


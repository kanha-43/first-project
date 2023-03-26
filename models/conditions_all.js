/* const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./index"); */
module.exports=(sequelize,DataTypes)=>{
const Conditions_all = sequelize.define('Conditions_all', {
    condition_all_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      
      references: {
        model: 'master',
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
    tableName: 'conditions_all',
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
  return Conditions_all;
}

  //console.log(Conditions_all === sequelize.models.Conditions_all);

  //module.exports=Conditions_all


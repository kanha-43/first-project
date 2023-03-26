/* const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./index");
 */

module.exports=(sequelize,DataTypes)=>{
const Conditions_any = sequelize.define('Conditions_any', {
    condition_any_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      
      references: {
        model: 'master',
        key: 'id'
      }
    },
    /* 'conditions.any': {
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
    tableName: 'conditions_any',
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
return Conditions_any;
}
 // console.log(Conditions_any === sequelize.models.Conditions_any);

  //module.exports=Conditions_any

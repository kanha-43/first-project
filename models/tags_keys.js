/* const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./index"); */
module.exports=(sequelize,DataTypes)=>{
    const Tags_keys = sequelize.define('Tags_keys', {
        
        name: {
          type: DataTypes.STRING,
          allowNull: true
        },
        count: {
            type: DataTypes.STRING,
            allowNull: true
          }
      }, {
        sequelize,
        tableName: 'tags_keys',
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
      return Tags_keys;
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
    
    
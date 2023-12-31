/* const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./index"); */
module.exports=(sequelize,DataTypes)=>{
    const Schedules_Intervals = sequelize.define('Schedules_Intervals', {
      schedule_id: {
        type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'schedules',
        key: 'id'
      }
    },
        start_time: {
            type: DataTypes.STRING,
          allowNull: true
        },
        end_time: {
            type: DataTypes.STRING,
            allowNull: true
          },
        start_day: {
            type: DataTypes.STRING,
            allowNull: true
          },
        end_day: {
            type: DataTypes.STRING,
            allowNull: true
          }
      }, {
        sequelize,
        tableName: 'schedules_intervals',
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
      return Schedules_Intervals;
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
    
    
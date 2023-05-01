module.exports=(sequelize,DataTypes)=>{
    const Schedules = sequelize.define('Schedules', {
        
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true
        },
        
        name: {
            type: DataTypes.STRING,
            allowNull: true
          },
        time_zone: {
            type: DataTypes.STRING,
            allowNull: true
          },
        /* intervals: {
            type: DataTypes.JSON,
            allowNull: true
          }, */
         
      }, {
        sequelize,
        tableName: 'schedules',
        timestamps: false,

      });
      return Schedules;
    }
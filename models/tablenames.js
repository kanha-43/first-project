module.exports=(sequelize,DataTypes)=>{
    const tableName = sequelize.define('tableName', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
          },
        name: {
            type: DataTypes.STRING,
            allowNull: true
          },
        
        
        
      }, {
        sequelize,
        tableName: 'tablename',
        timestamps: false,

      });
      return tableName;
    }
    
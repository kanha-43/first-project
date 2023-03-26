module.exports=(sequelize,DataTypes)=>{
    const Tags = sequelize.define('Tags', {
        name: {
            type: DataTypes.STRING,
            allowNull: true
          },
        count: {
          type: DataTypes.INTEGER,
          allowNull: true,
          /* references: {
            model: 'master',
            key: 'id'
          } */
        },
        
              
      }, {
        sequelize,
        tableName: 'tags',
        timestamps: false,

      });
      return Tags;
    }
    
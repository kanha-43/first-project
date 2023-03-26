module.exports=(sequelize,DataTypes)=>{
    const Groups = sequelize.define('Groups', {
        url: {
            type: DataTypes.STRING,
            allowNull: true
          },
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true
        },
        is_public: {
            type: DataTypes.BOOLEAN,
            allowNull: true
          },
        name: {
            type: DataTypes.STRING,
            allowNull: true
          },
        description: {
            type: DataTypes.STRING,
            allowNull: true
          },
        
        default: {
            type: DataTypes.BOOLEAN,
            allowNull: true
          }, 
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true
          },
        
      }, {
        sequelize,
        tableName: 'grps',
        timestamps: false,

      });
      return Groups;
    }
    
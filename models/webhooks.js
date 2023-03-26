module.exports=(sequelize,DataTypes)=>{
    const Webhooks = sequelize.define('Webhooks', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
          },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
          },
        status: {
            type: DataTypes.STRING,
            allowNull: true
          },
        
        
        subscription: {
            type: DataTypes.JSON,
            allowNull: true
          },
        created_by:{
            type: DataTypes.STRING,
            allowNull: true
        },
        updated_by:{
            type: DataTypes.STRING,
            allowNull: true
        },
        endpoint: {
            type: DataTypes.STRING,
            allowNull: true
          }, 
        http_method: {
            type: DataTypes.STRING,
            allowNull: true
          },
        request_format: {
            type: DataTypes.STRING,
            allowNull: true
          },
        authentication: {
            type: DataTypes.JSON,
            allowNull: true
          },
        
      }, {
        sequelize,
        tableName: 'webhooks',
        timestamps: false,

      });
      return Webhooks;
    }
    
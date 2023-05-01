module.exports=(sequelize,DataTypes)=>{
    const Dynamic_content_items = sequelize.define('Dynamic_content_items', {
        url: {
            type: DataTypes.STRING,
            allowNull: true
          },
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true
        },
        
        name: {
            type: DataTypes.STRING,
            allowNull: true
          },
        placeholder: {
            type: DataTypes.STRING,
            allowNull: true
          },
        locale_id: {
            type: DataTypes.INTEGER,
            allowNull: true
          },
        outdated: {
            type: DataTypes.BOOLEAN,
            allowNull: true
          },
          
        
         
      }, {
        sequelize,
        tableName: 'dynamic_content_item',
        timestamps: false,

      });
      return Dynamic_content_items;
    }
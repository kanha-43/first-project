module.exports=(sequelize,DataTypes)=>{
    const Dynamic_Content_Variants = sequelize.define('Dynamic_Content_Variants', {
        dynamic_content_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
              model: 'dynamic_content_items',
              key: 'id'
            }
          },
        url: {
            type: DataTypes.STRING,
            allowNull: true
          },
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true
        },
        content:{
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
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: true
          },
        
        default: {
            type: DataTypes.BOOLEAN,
            allowNull: true
          },
        
        
        
        
      }, {
        sequelize,
        tableName: 'dynamic_content-variants',
        timestamps: false,

      });
      return Dynamic_Content_Variants;
    }
    
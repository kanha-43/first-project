module.exports=(sequelize,DataTypes)=>{
    const All_Public_Locales = sequelize.define('All_Public_Locales', {
        url: {
            type: DataTypes.STRING,
            allowNull: true
          },
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        locale: {
            type: DataTypes.STRING,
            allowNull: true
          },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
          },
        native_name: {
            type: DataTypes.STRING,
            allowNull: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
          },
        presentation_name: {
            type: DataTypes.STRING,
            allowNull: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
          },
          
        rtl: {
            type: DataTypes.BOOLEAN,
            allowNull: true
          },
        default: {
            type: DataTypes.BOOLEAN,
            allowNull: true
          },
        
        
        
        
      }, {
        sequelize,
        tableName: 'all_public_locales',
        timestamps: false,

      });
      return All_Public_Locales;
    }
    
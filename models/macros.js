module.exports=(sequelize,DataTypes)=>{
    const Macros = sequelize.define('Macros', {
      // Model attributes are defined here
      url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      id: {
        type: DataTypes.BIGINT,
        //allowNull: false,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
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
      position: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      }, 
      actions: {
        type: DataTypes.JSON,
        allowNull: true
      },
      restriction: {
        type: DataTypes.STRING,
        allowNull: true
      },  
      raw_title: {
        type: DataTypes.STRING,
        allowNull: true
      },
      
    }, {
        sequelize,
        tableName: 'macros',
        timestamps: true,
        
      });
      return Macros;
    }
    
    // `sequelize.define` also returns the model
    //console.log(Master === sequelize.models.Master);
    
    
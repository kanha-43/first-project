module.exports=(sequelize,DataTypes)=>{
    const User_fields = sequelize.define('User_fields', {
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
      type: {
        type: DataTypes.STRING,
        allowNull: true
      },
      key: {
        type: DataTypes.STRING,
        allowNull: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      raw_title: {
        type: DataTypes.STRING,
        allowNull: true
      },
      raw_description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      
      position: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      system: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      regexp_for_validation: {
        type: DataTypes.STRING,
        allowNull: true
      },
      
      
    }, {
        sequelize,
        tableName: 'user_fields',
        timestamps: true,
       
      });
      return User_fields;
    }
    
    // `sequelize.define` also returns the model
    //console.log(Master === sequelize.models.Master);
    
    
module.exports=(sequelize,DataTypes)=>{
    const Automations = sequelize.define('Automations', {
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
      /* actions: {
        type: DataTypes.JSON,
        allowNull: true
      },
      'conditions.all': {
        type: DataTypes.JSON,
        allowNull: true 
      },
      'conditions.any': {
        type: DataTypes.JSON,
        allowNull: true
      }, */
      position: {
        type: DataTypes.INTEGER,
        allowNull: true
      }, 
      raw_title: {
        type: DataTypes.STRING,
        allowNull: true
      },
      
    }, {
        sequelize,
        tableName: 'automations',
        timestamps: true,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
              { name: "id" },
            ]
          },
        ]
      });
      return Automations;
    }
    
    // `sequelize.define` also returns the model
    //console.log(Master === sequelize.models.Master);
    
    
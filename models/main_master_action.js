module.exports=(sequelize,DataTypes)=>{
    const MainMasterAction = sequelize.define('MainMasterAction', {
      // Model attributes are defined here
      Criteria_ID: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Field_Business_Name: {
        type: DataTypes.STRING,
        //allowNull: false,
       
      },
      
      Value_Business_reference: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Conditions_API_Name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      
      Value_API_reference: {
        type: DataTypes.STRING,
        allowNull: true 
      },
      field6: {
        type: DataTypes.JSON,
        allowNull: true
      },
      
    }, {
        sequelize,
        tableName: 'main_master_action',
        timestamps: true,
        /* indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
              { name: "Criteria_ID" },
            ]
          },
        ] */
      });
      return MainMasterAction;
    }
    
    // `sequelize.define` also returns the model
    //console.log(Master === sequelize.models.Master);
    
    
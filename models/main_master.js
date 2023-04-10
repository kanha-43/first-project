module.exports=(sequelize,DataTypes)=>{
    const MainMaster = sequelize.define('MainMaster', {
      // Model attributes are defined here
      Criteria_ID: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Field_Business_Name: {
        type: DataTypes.STRING,
        //allowNull: false,
       
      },
      Operator_business_reference: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Value_Business_reference: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Conditions_API_Name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Operator_API_Reference: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Value_API_reference: {
        type: DataTypes.STRING,
        allowNull: true 
      },
      Value_Type: {
        type: DataTypes.JSON,
        allowNull: true
      },
      Category: {
        type: DataTypes.STRING,
        allowNull: true
      },
    }, {
        sequelize,
        tableName: 'main_master',
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
      return MainMaster;
    }
    
    // `sequelize.define` also returns the model
    //console.log(Master === sequelize.models.Master);
    
    
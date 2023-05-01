module.exports=(sequelize,DataTypes)=>{
    const Sla_Policies = sequelize.define('Sla_Policies', {
        url: {
            type: DataTypes.STRING,
            allowNull: true
          },
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true
          /* references: {
            model: 'master',
            key: 'id'
          } */
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true
          },
        description: {
            type: DataTypes.STRING,
            allowNull: true
          },
        position: {
            type: DataTypes.INTEGER,
            allowNull: true
          },
          /* 'filter.all': {
            type: DataTypes.JSON,
            allowNull: true 
          },
          'filter.any': {
            type: DataTypes.JSON,
            allowNull: true
          },
          policy_metrics:{
            type: DataTypes.JSON,
            allowNull: true
          }, */
        
        
        
        
      }, {
        sequelize,
        tableName: 'sla_policies',
        timestamps: false,

      });
      return Sla_Policies;
    }
    
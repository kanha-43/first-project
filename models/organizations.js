module.exports=(sequelize,DataTypes)=>{
    const Organizations = sequelize.define('Organizations', {
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
        shared_tickets: {
            type: DataTypes.BOOLEAN,
            allowNull: true
          },
        shared_comments: {
            type: DataTypes.BOOLEAN,
            allowNull: true
          },
        external_id: {
            type: DataTypes.STRING,
            allowNull: true
          },
        
        domain_names: {
            type: DataTypes.JSON,
            allowNull: true
          },
        details: {
            type: DataTypes.STRING,
            allowNull: true
          },
        notes: {
            type: DataTypes.STRING,
            allowNull: true
          },
        
        group_id: {
            type: DataTypes.STRING,
            allowNull: true
          }, 
        tags: {
            type: DataTypes.JSON,
            allowNull: true
          },
          org_fields_in_contract:{
            type:DataTypes.STRING,
            allowNull: true
        },
        org_fields_product_type:{
          type:DataTypes.STRING,
          allowNull: true
      },
      org_fields_purchase_date:{
          type:DataTypes.STRING,
          allowNull: true
      },
      org_fields_support_type:{
          type:DataTypes.STRING,
          allowNull: true
      }

        
      }, {
        sequelize,
        tableName: 'organizations',
        timestamps: false,

      });
      return Organizations;
    }
    
module.exports=(sequelize,DataTypes)=>{
    const Ticket_forms = sequelize.define('Ticket_forms', {
      // Model attributes are defined here
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
      
      raw_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      display_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      raw_display_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      end_user_visible: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      ticket_field_ids: {
        type: DataTypes.JSON,
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
      in_all_brands: {
        type: DataTypes.BOOLEAN,
        allowNull: true 
      },
      restricted_brands_ids: {
        type: DataTypes.JSON,
        allowNull: true
      },
      
     
      
    }, {
        sequelize,
        tableName: 'ticket_forms',
        timestamps: true,
     
      });
      return Ticket_forms;
    }
    
    // `sequelize.define` also returns the model
    //console.log(Master === sequelize.models.Master);
    
    
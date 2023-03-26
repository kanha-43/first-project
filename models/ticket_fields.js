module.exports=(sequelize,DataTypes)=>{
    const Ticket_fields = sequelize.define('Ticket_fields', {
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
      title: {
        type: DataTypes.STRING,
        allowNull: true
      },
      raw_title: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
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
      required: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      collapsed_for_agents: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      regexp_for_validation: {
        type: DataTypes.STRING,
        allowNull: true
      },
      title_in_portal: {
        type: DataTypes.STRING,
        allowNull: true 
      },
      raw_title_in_portal: {
        type: DataTypes.STRING,
        allowNull: true
      },
      visible_in_portal: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      editable_in_portal: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      required_in_portal: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      
      tag: {
        type: DataTypes.STRING,
        allowNull: true
      }, 
     
      removable: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      key: {
        type: DataTypes.STRING,
        allowNull: true
      }, 
      agent_description: {
        type: DataTypes.STRING,
        allowNull: true
      }, 
    }, {
        sequelize,
        tableName: 'ticket_fields',
        timestamps: true,
     
      });
      return Ticket_fields;
    }
    
    // `sequelize.define` also returns the model
    //console.log(Master === sequelize.models.Master);
    
    
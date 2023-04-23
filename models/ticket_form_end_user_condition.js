module.exports=(sequelize,DataTypes)=>{
    const Ticket_forms_end_user_cond = sequelize.define('Ticket_forms_end_user_cond', {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      ticket_form_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
            references: {
              model: 'ticket_forms',
              key: 'id'
            }
      },
      parent_field_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      
      },
      parent_field_type: {
        type: DataTypes.STRING,
        allowNull: true,

      },
      value: {
        type: DataTypes.STRING,
        allowNull: true
      },
      
      
      
      
    }, {
        sequelize,
        tableName: 'ticket_forms_end_user_con',
        timestamps: true,
     
      });
      return Ticket_forms_end_user_cond;
    }
    
    // `sequelize.define` also returns the model
    //console.log(Master === sequelize.models.Master);
    
    
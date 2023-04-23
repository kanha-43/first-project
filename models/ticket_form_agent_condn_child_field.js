module.exports=(sequelize,DataTypes)=>{
    const Ticket_forms_agent_cond_child_field = sequelize.define('Ticket_forms_agent_cond_child_field', {
      // Model attributes are defined here
      
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
            /* references: {
              model: 'ticket_forms_agent_cond',
              key: 'parent_field_id'
            } */
      },
      child_id:{
        type: DataTypes.BIGINT,
        allowNull: true
      },
      is_required:{
        type: DataTypes.BOOLEAN,
        allowNull:true
      },
      required_on_statuses_type:{
        type: DataTypes.STRING,
        allowNull:true
      },
      required_on_statuses_status:{
        type: DataTypes.STRING,
        allowNull:true
      }
      
      
    }, {
        sequelize,
        tableName: 'ticket_forms_agent_cond_child_field',
        timestamps: true,
     
      });
      return Ticket_forms_agent_cond_child_field;
    }
    
    // `sequelize.define` also returns the model
    //console.log(Master === sequelize.models.Master);
    
    
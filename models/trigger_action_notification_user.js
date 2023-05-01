module.exports=(sequelize,DataTypes)=>{
    const Trigger_action_notn_email = sequelize.define('trigger_action_notn_email', {
        action_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          references: {
            model: 'trigger_action',
            key: 'action_id'
          }
        },
        email_usertype: {
          type: DataTypes.STRING,
          allowNull: true
        },
        email_subject: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email_body: {
            type: DataTypes.TEXT,
            allowNull: true
        }
      }, {
        sequelize,
        tableName: 'trigger_action_notn_email',
        timestamps: false,
 
      });
      return Trigger_action_notn_email;
    }
    
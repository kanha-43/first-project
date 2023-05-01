
module.exports=(sequelize,DataTypes)=>{
    const Trigger_action_notn_webhook = sequelize.define('trigger_action_notn_webhook', {
        action_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          references: {
            model: 'trigger_action',
            key: 'action_id'
          }
        },
        webhook_id: {
          type: DataTypes.STRING,
          allowNull: true
        },
        webhook_table: {
            type: DataTypes.TEXT,
            allowNull: true
          },
        
      }, {
        sequelize,
        tableName: 'trigger_action_notn_webhook',
        timestamps: false,
 
      });
      return Trigger_action_notn_webhook;
    }
    
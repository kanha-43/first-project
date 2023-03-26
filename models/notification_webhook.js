
module.exports=(sequelize,DataTypes)=>{
    const Notification_webhook = sequelize.define('notification_webhook', {
        action_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          references: {
            model: 'action',
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
        tableName: 'notification_webhook',
        timestamps: false,
 
      });
      return Notification_webhook;
    }
    
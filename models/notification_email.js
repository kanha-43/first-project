module.exports=(sequelize,DataTypes)=>{
    const Notification_email = sequelize.define('notification_email', {
        action_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          references: {
            model: 'action',
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
        tableName: 'notification_email',
        timestamps: false,
 
      });
      return Notification_email;
    }
    
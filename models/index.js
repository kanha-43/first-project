const {Sequelize, DataTypes}=require("sequelize");

const sequelize = new Sequelize('assignment', 'root', 'root', {
    host: 'localhost',
    logging:false,
    dialect: "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  }catch (error) {
    console.error('Unable to connect to the database:', error);
  }
const db={}
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.master=  require('./master')(sequelize,DataTypes)
db.action=  require('./actions')(sequelize,DataTypes)
db.condition_all= require('./conditions_all')(sequelize,DataTypes)
db.condition_any= require('./conditions_any')(sequelize,DataTypes)
db.notification_email=require('./notification_email')(sequelize,DataTypes)
db.notification_webhook=require('./notification_webhook')(sequelize,DataTypes)

db.support_email_add= require('./support_email_add')(sequelize,DataTypes)
db.brands= require('./brands')(sequelize,DataTypes)
db.locales= require('./locales')(sequelize,DataTypes)
db.all_public_locales= require('./all_public_locales')(sequelize,DataTypes)
db.tags= require('./tags')(sequelize,DataTypes)
db.groups=require('./groups')(sequelize,DataTypes)
db.macros=require("./macros")(sequelize,DataTypes)
db.sla_policies=require("./sla_policies")(sequelize,DataTypes)
db.schedules=require("./schedules")(sequelize,DataTypes)
db.ticket_fields=require("./ticket_fields")(sequelize,DataTypes)
db.user_fields=require("./user_fields")(sequelize,DataTypes)
db.triggers=require("./triggers")(sequelize,DataTypes)
db.automations=require("./automations")(sequelize,DataTypes)
db.dynamic_content_items=require("./dynamic_content_items")(sequelize,DataTypes)
db.webhooks=require("./webhooks")(sequelize,DataTypes)
db.organizations=require("./organizations")(sequelize,DataTypes)
db.organization_fields=require("./organization_fields")(sequelize,DataTypes)


//db.sequelize.sync({force:true})
module.exports=db
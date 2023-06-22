const {Sequelize, DataTypes}=require("sequelize");

const sequelize = new Sequelize('assignment', 'root', 'root', {
    host: 'localhost',
    logging:false,
    dialect: "mysql" // one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' 
  });
  /* const sequelize = new Sequelize("ZD_DB","controller","6pxKCmdj3ZE9pP3ZwP2q",{
    host: 'tecrivuletmysqldev.cs5arscht7ca.us-east-1.rds.amazonaws.com',
    logging:false,
    dialect: "mysql", */
    /* charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci' */

 // })

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
db.ticket_master=require("./ticket_master")(sequelize,DataTypes)

db.automation_action=require('./automation_action')(sequelize,DataTypes)
db.automation_cond_all=require('./automation_cond_all')(sequelize,DataTypes)
db.automation_cond_any=require('./automation_cond_any')(sequelize,DataTypes)

db.macros_action=require('./macros_action')(sequelize,DataTypes)

db.organization_field_custom=require("./organization_field_custom")(sequelize,DataTypes)

//db.tags_keys=require("./tags_keys")(sequelize,DataTypes)

db.dynamic_content_variants=require('./dynamic_content_variants')(sequelize,DataTypes)

db.schedules_intervals=require("./schedules_intervals")(sequelize,DataTypes)


db.trigger_action=require('./trigger_action')(sequelize,DataTypes)
db.trigger_cond_all=require('./trigger_cond_all')(sequelize,DataTypes)
db.trigger_cond_any=require('./trigger_cond_any')(sequelize,DataTypes)
db.trigger_action_notification_user_grp=require('./trigger_action_notification_user')(sequelize,DataTypes)
db.trigger_action_notification_webhook=require('./trigger_action_notification_webhook')(sequelize,DataTypes)

db.sla_filter_all=require('./sla_filter_all')(sequelize,DataTypes)
db.sla_filter_any=require('./sla_filter_any')(sequelize,DataTypes)
db.sla_policy_metrics=require('./sla_policy_metrics')(sequelize,DataTypes)
db.automation_action_user_and_group=require('./automation_action_user_and_group')(sequelize,DataTypes)

db.ticket_forms=require('./ticket_forms')(sequelize,DataTypes)
db.ticket_form_end_user_condition=require('./ticket_form_end_user_condition')(sequelize,DataTypes)
db.ticket_form_end_user_child=require('./ticket_form_end_user_condn_child_field')(sequelize,DataTypes)
db.ticket_form_agent_condition=require('./ticket_form_agent_conditions')(sequelize,DataTypes)
db.ticket_form_agent_child=require('./ticket_form_agent_condn_child_field')(sequelize,DataTypes)

//main master
db.main_master=require('./main_master')(sequelize,DataTypes)

//main master action
db.main_master_action=require('./main_master_action')(sequelize,DataTypes)
/* db.sequelize.define({
  // Prevent Sequelize from altering existing tables
  freezeTableName: true,
  // Prevent Sequelize from adding timestamps to tables
  //timestamps: false,
}) */

db.sequelize.sync({
    /* force:true */
    
   alter: true,
    force: false,
  })
  [
    {
      "Conditions_API_Name": "locale_id"
    },
    {
      "Conditions_API_Name": "locale_id"
    },
    {
      "Conditions_API_Name": "organization.custom_fields.support_type"
    },
    {
      "Conditions_API_Name": "organization.custom_fields.support_type"
    },
    {
      "Conditions_API_Name": "organization.custom_fields.support_type"
    },
    {
      "Conditions_API_Name": "organization.custom_fields.support_type"
    },
    {
      "Conditions_API_Name": "assignee_id"
    },
    {
      "Conditions_API_Name": "assignee_id"
    },
    {
      "Conditions_API_Name": "assignee_id"
    },
    {
      "Conditions_API_Name": "assignee_id"
    },
    {
      "Conditions_API_Name": "ticket_form_id"
    },
    {
      "Conditions_API_Name": "ticket_form_id"
    },
    {
      "Conditions_API_Name": "group_id"
    },
    {
      "Conditions_API_Name": "group_id"
    },
    {
      "Conditions_API_Name": "type"
    },
    {
      "Conditions_API_Name": "type"
    },
    {
      "Conditions_API_Name": "type"
    },
    {
      "Conditions_API_Name": "type"
    },
    {
      "Conditions_API_Name": "type"
    },
    {
      "Conditions_API_Name": "priority"
    },
    {
      "Conditions_API_Name": "priority"
    },
    {
      "Conditions_API_Name": "priority"
    },
    {
      "Conditions_API_Name": "priority"
    },
    {
      "Conditions_API_Name": "priority"
    },
    {
      "Conditions_API_Name": "status"
    },
    {
      "Conditions_API_Name": "status"
    },
    {
      "Conditions_API_Name": "status"
    },
    {
      "Conditions_API_Name": "status"
    },
    {
      "Conditions_API_Name": "status"
    },
    {
      "Conditions_API_Name": "status"
    },
    {
      "Conditions_API_Name": "satisfaction_score"
    },
    {
      "Conditions_API_Name": "set_tags"
    },
    {
      "Conditions_API_Name": "set_tags"
    },
    {
      "Conditions_API_Name": "current_tags"
    },
    {
      "Conditions_API_Name": "current_tags"
    },
    {
      "Conditions_API_Name": "remove_tags"
    },
    {
      "Conditions_API_Name": "remove_tags"
    },
    {
      "Conditions_API_Name": ""
    },
    {
      "Conditions_API_Name": "follower"
    },
    {
      "Conditions_API_Name": "set_schedule"
    },
    {
      "Conditions_API_Name": "notification_user"
    },
    {
      "Conditions_API_Name": "notification_user"
    },
    {
      "Conditions_API_Name": "notification_user"
    },
    {
      "Conditions_API_Name": "notification_user"
    },
    {
      "Conditions_API_Name": "notification_user"
    },
    {
      "Conditions_API_Name": "notification_user"
    },
    {
      "Conditions_API_Name": "notification_group"
    },
    {
      "Conditions_API_Name": "notification_group"
    },
    {
      "Conditions_API_Name": "notification_webhook"
    },
    {
      "Conditions_API_Name": ""
    },
    {
      "Conditions_API_Name": "brand_id"
    },
    {
      "Conditions_API_Name": "custom_fields_7375500650775"
    },
    {
      "Conditions_API_Name": "custom_fields_1900001921265"
    },
    {
      "Conditions_API_Name": "custom_fields_1900001921265"
    },
    {
      "Conditions_API_Name": "requester.custom_fields.social_messaging_user_info"
    },
    {
      "Conditions_API_Name": "requester.custom_fields.social_messaging_user_info"
    },
    {
      "Conditions_API_Name": "requester.custom_fields.social_messaging_user_info"
    },
    {
      "Conditions_API_Name": "requester.custom_fields.user_language"
    },
    {
      "Conditions_API_Name": "requester.custom_fields.user_language"
    },
    {
      "Conditions_API_Name": "requester.custom_fields.whatsapp"
    },
    {
      "Conditions_API_Name": "requester.custom_fields.whatsapp"
    }
  ]

module.exports=db



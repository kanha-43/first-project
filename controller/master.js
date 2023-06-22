const db=require("../models");

const Master=db.master
const Action=db.action
const Conditions_all=db.condition_all
const Conditions_any=db.condition_any
const Notification_email=db.notification_email
const Notification_webhook=db.notification_webhook

const Brands=db.brands;
const Locales=db.locales;
const Tags=db.tags;
const All_public_locales=db.all_public_locales;
const Support_email_add=db.support_email_add;
const Triggers=db.triggers
const Groups=db.groups
const Dynamic_Content=db.dynamic_content_items
const Schedules=db.schedules
const Ticket_fields=db.ticket_fields
const Webhooks=db.webhooks
const Automation=db.automations
const Macros=db.macros
const User_fields=db.user_fields
const Sla_Policies=db.sla_policies
const Organisations=db.organizations
const Organization_fields=db.organization_fields
const Ticket_master=db.ticket_master

const Automation_Action=db.automation_action
const Automation_Cond_all=db.automation_cond_all
const Automation_Cond_any=db.automation_cond_any
const Automation_Action_user_and_group=db.automation_action_user_and_group

const Ticket_forms=db.ticket_forms
const Ticket_forms_agent_cond=db.ticket_form_agent_condition
const Ticket_forms_end_user_cond=db.ticket_form_end_user_condition
const Ticket_forms_agent_cond_child_field=db.ticket_form_agent_child
const Ticket_forms_end_user_child_field=db.ticket_form_end_user_child

const Macros_Action=db.macros_action

const Organization_Field_custom=db.organization_field_custom

//const Tags_Keys=db.tags_keys

const Dynamic_Content_Variants=db.dynamic_content_variants

const Schedules_Intervals=db.schedules_intervals

const Trigger_Action=db.trigger_action
const Trigger_Cond_all=db.trigger_cond_all
const Trigger_Cond_any=db.trigger_cond_any
const Trigger_action_notification_user_grp=db.trigger_action_notification_user_grp
const Trigger_action_notification_webhook=db.trigger_action_notification_webhook

const Sla_filter_all=db.sla_filter_all
const Sla_filter_any=db.sla_filter_any
const Sla_policy_metrics=db.sla_policy_metrics


//Main master table 
const Master_main=db.main_master

//Main Master Action
const Master_main_action=db.main_master_action


exports.getData=async(req,res)=>{
    const{id}=req.params;
    const test=await Conditions_all.findOne({where:{id:id}})

    res.status(200).json({
        Message:"Required Data",
        data:test
    })
    /* let n=test["conditions.all"].length
    let arr=[]
    for(let i=0;i<n;i++){
        let partial=test["conditions.all"][i].value
        arr.push(partial)
    }
    
    console.log(arr) */
}

exports.createData=async(req,res)=>{
    console.log(req.body)
    console.log(req.body.conditions.all)
    //const {url,id,title,active,defaults,actions,condAll,condAny,desc,position,raw_title,cat_id}=req.body
    const url=req.body.url;
    const id=req.body.id;
    const title=req.body.title;
    const active=req.body.active;
    const defaults=req.body.defaults;
    const actions=req.body.actions;
    const description=req.body.description;
    const position=req.body.position;
    const raw_title=req.body.raw_title;
    const category_id=req.body.category_id;
    
    
    const newMasterData=await Master.create({url,id,title,active,defaults,actions,
                        'conditions.all':req.body.conditions.all,
                        'conditions.any':req.body.conditions.any,
                        description,position,raw_title,category_id})
    let n1=newMasterData["actions"].length
    let newActionData;
    for(let i=0;i<n1;i++){
    newActionData=await Action.create({
        action_id:req.body.id,
            field:newMasterData["actions"][i].field,
            value:newMasterData["actions"][i].value,
    })
}
    for(let i=0;i<n1;i++){
       if(newMasterData["actions"][i].field==="notification_user" || newMasterData["actions"][i].field==="notification_group"){
            //console.log("user-grp:",newMasterData["actions"][i].value[0],newMasterData["actions"][i].value[1],newMasterData["actions"][i].value[2])
            await Notification_email.create({
                action_id:req.body.id,
                email_usertype:newMasterData["actions"][i].value[0],
                email_subject:newMasterData["actions"][i].value[1],
                email_body:newMasterData["actions"][i].value[2],
            })
       }else if(newMasterData["actions"][i].field==="notification_webhook"){
            await Notification_webhook.create({
                action_id:req.body.id,
                webhook_id:newMasterData["actions"][i].value[0],
                webhook_table:newMasterData["actions"][i].value[1]

            })
            console.log("hook",newMasterData["actions"][i].value[0],newMasterData["actions"][i].value[1],newMasterData["actions"][i].value[2])
       } 
    }

    //const test=await Conditions_all.findOne({where:{id:id}})
    let n=newMasterData["conditions.all"].length
    let newCollectionAll;
    for(let i=0;i<n;i++){
        newCollectionAll=await Conditions_all.create({
            condition_all_id:req.body.id,
            field:newMasterData["conditions.all"][i].field,
            operator:newMasterData["conditions.all"][i].operator,
            value:newMasterData["conditions.all"][i].value,
        })
    }
    
    let n2=newMasterData["conditions.any"].length
    let newCollectionAny;
    for(let i=0;i<n2;i++){
        newCollectionAny=await Conditions_any.create({
            condition_any_id:req.body.id,
            field:newMasterData["conditions.any"][i].field,
            operator:newMasterData["conditions.any"][i].operator,
            value:newMasterData["conditions.any"][i].value,
        })
    }

    res.status(201).json({
        Message:"Data added",
        data1:newMasterData,
        data2:newActionData,
        data3:newCollectionAll,
        data4:newCollectionAny

    })
}

exports.createBulkData=async(req,res)=>{
    
    //const {url,id,title,active,defaults,actions,condAll,condAny,desc,position,raw_title,cat_id}=req.body

     
    const values=req.body.targets.map((item)=>({
         url:item.url,
         id:item.id,
         title:item.title,
         active:item.active,
         default:item.default,
         description:item.description,
         position:item.position,
         raw_title:item.raw_title,
         category_id:item.category_id
    }))
    
    const newMasterData=await Master.bulkCreate(values)


    const values1=req.body.targets.map((item)=>{
       const temp= item.actions.map((innerItem)=>({
            action_id:item.id,
            field:innerItem.field,
            value:innerItem.value,
        }))
        return temp
    }).flat()
    
    await Action.bulkCreate(values1)

    const values2=req.body.targets.map((item)=>{
        const temp= item.conditions.all.map((innerItem)=>({
            condition_all_id:item.id,
            field:innerItem.field,
            operator:innerItem.opertor,
            value:innerItem.value,
         }))
         return temp
     }).flat()

    await Conditions_all.bulkCreate(values2)

    const values3=req.body.targets.map((item)=>{
        const temp= item.conditions.any.map((innerItem)=>({
            condition_any_id:item.id,
             field:innerItem.field,
             operator:innerItem.operator,
             value:innerItem.value,
         }))
         return temp
     }).flat()
    await Conditions_any.bulkCreate(values3)


    const values4=req.body.targets.map((item)=>
        item.actions.map((innerItem)=>{
        if(innerItem.field==="notification_user" || innerItem.field==="notification_group"){
               return[
                    {action_id:item.id,
                    email_usertype:innerItem.value[0],
                    email_subject:innerItem.value[1],
                    email_body:innerItem.value[2]}
               ]
                
    }
    
}).flat() 
  
    ).flat().filter(value=>value!==undefined)

    await Notification_email.bulkCreate(values4)

    const values5=req.body.targets.map((item)=>
        item.actions.map((innerItem)=>{
        if(innerItem.field==="notification_webhook"){
               return[{
                    
                action_id:item.id,
                webhook_id:innerItem.value[0],
                webhook_table:innerItem.value[1]
                }
               ]
                
    }
    
}).flat() 
  
    ).flat().filter(value=>value!==undefined)

    await Notification_webhook.bulkCreate(values5)

    res.status(201).json({
        Message:"Data added",
        data1:newMasterData,
        /* data2:newActionData,
        data3:newCollectionAll,
        data4:newCollectionAny */

    })
}

exports.createTriggerBulk=async(req,res)=>{
    const values=req.body.triggers.map((item)=>({
        url:item.url,
        id:item.id,
        title:item.title,
        active:item.active,
        default:item.default,
        /* actions:item.actions,
       'conditions.all':item.conditions.all,
       'conditions.any':item.conditions.any, */
        description:item.description,
        position:item.position,
        raw_title:item.raw_title,
        category_id:item.category_id
   }))
//console.log(values)
   //await Triggers.bulkCreate(values)
   const values1=req.body.triggers.map((item)=>{
    const temp= item.actions?.map((innerItem)=>({
         action_id:item.id,
         field:innerItem.field,
         value:innerItem.value,
     }))
     return temp
 }).flat()
 
 //await Trigger_Action.bulkCreate(values1)
 //console.log(values1)

const values2=req.body.triggers.map((item)=>{
    let regex = /\d+/g;
    const temp= item.conditions.all?.map((innerItem)=>{
    const field_id_match = innerItem.field.match(regex); // extract numeric values
    const field_id = field_id_match ? parseInt(field_id_match[0]) : null; // get first value or null
    return {
         condition_all_id:item.id,
          field:innerItem.field,
        field_id:field_id,
          operator:innerItem.operator,
          value:innerItem.value,
          //value_extract: innerItem.value.replace(/\n\n\n/g, "   ").replace(/\n\n/g, "  ").replace(/\n/g, " ").replace(/<\/?[^>]+>/gi, "")
          //value_extract: innerItem.value.replace(/\n\n\n/g, "   ").replace(/\n\n/g, "  ").replace(/\n/g, " ").replace(/<\/?[^>]+>/gi, "")
}})
      return temp
  }).flat()

await Trigger_Cond_all.bulkCreate(values2)
//console.log(values2)
const values3=req.body.triggers.map((item)=>{
    const temp= item.conditions.any?.map((innerItem)=>({
         condition_any_id:item.id,
          field:innerItem.field,
          operator:innerItem.operator,
          value:innerItem.value,
      }))
      return temp
  }).flat()
  //console.log(values3)
 //await Trigger_Cond_any.bulkCreate(values3)

 //res.status(200).send("Bulk insertion completed for all 4 tables .")

 const values4=req.body.triggers.map((item)=>
        item.actions.map((innerItem)=>{
        if(innerItem.field==="notification_user" || innerItem.field==="notification_group"){
               return[{action_id:item.id,
                    
                    email_usertype:innerItem.value[0],
                    email_subject:innerItem.value[1],
                    email_body:innerItem.value[2]}
               ]
                
    }
    
}).flat()  
    ).flat().filter(value=>value!==undefined)

   // await Trigger_action_notification_user_grp.bulkCreate(values4)

    const values5=req.body.triggers.map((item)=>
        item.actions.map((innerItem)=>{
        if(innerItem.field==="notification_webhook"){
               return[{    
                action_id:item.id,
                webhook_id:innerItem.value[0],
                webhook_table:innerItem.value[1]
                }
               ]
                
    }
    
}).flat() 
  
    ).flat().filter(value=>value!==undefined)

    //await Trigger_action_notification_webhook.bulkCreate(values5)

    res.status(201).json({
        Message:"Data added",
        data1:values5,
        /* data2:newActionData,
        data3:newCollectionAll,
        data4:newCollectionAny */

    })

}
//1
exports.createTagsBulk=async(req,res)=>{
    const values=req.body.tags.map((item)=>({
        name:item.name,
        count:item.count,
        
   }))
   await Tags.bulkCreate(values)

   /* const values1=req.body.tags.map((item)=>{
    const temp= item.actions.map((innerItem)=>({
         
         name:innerItem.name,
         count:innerItem.count,
     }))
     return temp
 }).flat()
 
 await Tags_Keys.bulkCreate(values1) */
 res.status(200).send("Bulk insertion completed for all tables .")

}
//2
exports.createGroupBulk=async(req,res)=>{
    const values=req.body.groups.map((item)=>({
        url:item.url,
        id:item.id,
        is_public:item.is_public,
        name:item.name,
        description:item.description,
        default:item.default,
        deleted:item.deleted,
       
   }))
   await Groups.bulkCreate(values)
   res.status(201).send("sent successfully..")
}
//3
exports.createLocalesBulk=async(req,res)=>{
    const values=req.body.locales.map((item)=>({
        url:item.url,
        id:item.id,
        locale:item.locale,
        name:item.name,
        native_name:item.native_name,
        presentation_name:item.presentation_name,
        rtl:item.rtl,
        default:item.default,

       
   }))
   await Locales.bulkCreate(values)
   res.status(201).send("record added successfully...")
   
}
//4
exports.createPublicLocalesBulk=async(req,res)=>{
    const values=req.body.locales.map((item)=>({
        url:item.url,
        id:item.id,
        locale:item.locale,
        name:item.name,
        native_name:item.native_name,
        presentation_name:item.presentation_name,
        rtl:item.rtl,
        default:item.default,

       
   }))
   await All_public_locales.bulkCreate(values)
   res.status(201).send("record added successfully...")
}
//5
exports.createBrandsBulk=async(req,res)=>{
    const values=req.body.brands.map((item)=>({
        url:item.url,
        id:item.id,
        name:item.name,
        brand_url:item.brand_url,
        subdomain:item.subdomain,
        host_mapping:item.host_mapping,
        has_help_center:item.has_help_center,
        help_center_state:item.help_center_state,
        active:item.active,
        default:item.default,
        is_deleted:item.is_deleted,
        logo:item.logo,
        ticket_form_ids:item.ticket_form_ids,
        signature_template:item.signature_template,
       
   }))
   await Brands.bulkCreate(values)
   res.status(201).send("record added successfully...")

}
//6
exports.createSupportEmailAddressBulk=async(req,res)=>{
    const values=req.body.recipient_addresses.map((item)=>({
        url:item.url,
        id:item.id,
        brand_id:item.brand_id,
        default:item.default,
        name:item.name,
        email:item.email,
        forwarding_status:item.forwarding_status,
        spf_status:item.spf_status,
        cname_status:item.cname_status,
        domain_verification_status:item.domain_verification_status,
        domain_verification_code:item.domain_verification_code,
      
   }))
   await Support_email_add.bulkCreate(values)
   res.status(201).send("record added successfully...")

}
//7
exports.createDynamicContentBulk=async(req,res)=>{
    const values=req.body.items.map((item)=>({
        url:item.url,
        id:item.id,
        name:item.name,
        placeholder:item.placeholder,
        default_locale_id:item.default_locale_id,
        outdated:item.outdated,
        variants:item.variants
      
   }))
   //await Dynamic_Content.bulkCreate(values)

   const values1=req.body.items.map((item)=>{
    const temp= item.variants.map((innerItem)=>({ 
        dynamic_content_id:item.id,
        url:innerItem.url,
        id:innerItem.id,
        content:innerItem.content,
        locale_id:innerItem.locale_id,
        outdated:innerItem.outdated,
        active:innerItem.active,
        default:innerItem.default
     }))
     return temp
 }).flat()
 
 await Dynamic_Content_Variants.bulkCreate(values1)
 res.status(201).send("record added successfully...")

}
//8
exports.createSchedulesBulk=async(req,res)=>{
    const values=req.body.schedules.map((item)=>({
        id:item.id,
        url:item.url,
        name:item.name,
        time_zone:item.time_zone,
        intervals:item.intervals
      
   }))
   await Schedules.bulkCreate(values)

   const values1=req.body.schedules.map((item)=>{
    const temp= item.intervals.map((innerItem)=>({
        schedule_id:item.id,
         start_time:innerItem.start_time,
         end_time:innerItem.end_time,
         start_day:(innerItem.start_time>=0 && innerItem.start_time<=1439)?"sunday":(innerItem.start_time>=1440 && innerItem.start_time<=2879)?"monday":(innerItem.start_time>=2880 && innerItem.start_time<=4319)?"tuesday":(innerItem.start_time>=4320 && innerItem.start_time<=5759)?"wednesday":(innerItem.start_time>=5760 && innerItem.start_time<7199)?"thursday":(innerItem.start_time>=7200 && innerItem.start_time<=8639)?"friday":(innerItem.start_time>=8640 && innerItem.start_time<=10079)?"saturday":"sunday",
         end_day:(innerItem.start_time>=0 && innerItem.start_time<=1439)?"sunday":(innerItem.start_time>=1440 && innerItem.start_time<=2879)?"monday":(innerItem.start_time>=2880 && innerItem.start_time<=4319)?"tuesday":(innerItem.start_time>=4320 && innerItem.start_time<=5759)?"wednesday":(innerItem.start_time>=5760 && innerItem.start_time<7199)?"thursday":(innerItem.start_time>=7200 && innerItem.start_time<=8639)?"friday":(innerItem.start_time>=8640 && innerItem.start_time<=10079)?"saturday":"sunday" ,
     }))
     return temp
 }).flat()
 
 await Schedules_Intervals.bulkCreate(values1)
 res.status(201).send("record added successfully...")

   
}
//9
exports.createTicketFieldsBulk=async(req,res)=>{
    const values=req.body.ticket_fields.map((item)=>({
        url:item.url,
        id:item.id,
        type:item.type,
        title:item.title,
        raw_title:item.raw_title,
        description:item.description,
        raw_description:item.raw_description,
        position:item.position,
        active:item.active,
        required:item.required,
        collapsed_for_agents:item.collapsed_for_agents,
        regexp_for_validation:item.regexp_for_validation,
        title_in_portal:item.title_in_portal,
        raw_title_in_portal:item.raw_title_in_portal,
        visible_in_portal:item.visible_in_portal,
        editable_in_portal:item.editable_in_portal,
        required_in_portal:item.required_in_portal,
        tag:item.tag,
        removable:item.removable,
        key:item.key,
        agent_description:item.agent_description,


       
   }))
   await Ticket_fields.bulkCreate(values)
   res.status(201).send("record added successfully...")

}
//10
/* exports.createTicketFieldsBulk=async(req,res)=>{
    const values=req.body.ticket_fields.map((item)=>({
        url:item.url,
        id:item.id,
        type:item.type,
        title:item.title,
        raw_title:item.raw_title,
        description:item.description,
        raw_description:item.raw_description,
        position:item.position,
        active:item.active,
        required:item.required,
        collapsed_for_agents:item.collapsed_for_agents,
        regexp_for_validation:item.regexp_for_validation,
        title_in_portal:item.title_in_portal,
        raw_title_in_portal:item.raw_title_in_portal,
        visible_in_portal:item.visible_in_portal,
        editable_in_portal:item.editable_in_portal,
        required_in_portal:item.required_in_portal,
        tag:item.tag,
        removable:item.removable,
        key:item.key,
        agent_description:item.agent_description,


       
   }))
   await Ticket_fields.bulkCreate(values)
} */
//11
exports.createAutomationsBulk=async(req,res)=>{
    const values=req.body.automations.map((item)=>({
        url:item.url,
        id:item.id,
        title:item.title,
        active:item.active,
        default:item.default,
        position:item.position,
        raw_title:item.raw_title,

       
   }))
  
   await Automation.bulkCreate(values)
   /* const values1=req.body.automations.map((item)=>{
    const temp= item.actions.map((innerItem)=>({
         action_id:item.id,
         field:innerItem.field,
         value:innerItem.value,
     }))
     return temp
 }).flat()
 
 await Automation_Action.bulkCreate(values1) */

const { valuenew1, valuenew2 } = req.body.automations.reduce((acc, item) => {
    const temp = item.actions.reduce((innerAcc, innerItem) => {
      if (innerItem.field === 'notification_user' || innerItem.field === 'notification_group') {
        
        innerAcc.valuenew1.push({
          action_id: item.id,
          field: innerItem.field,
          notification_group_name: innerItem.value[0],
          email_subject:innerItem.value[1],
          email_body:innerItem.value[2],
        });
      } else{
        innerAcc.valuenew2.push({
          action_id: item.id,
          field: innerItem.field,
          value: innerItem.value,
        });
      }
      return innerAcc;
    }, acc);
    //console.log(temp)
    return temp;
    
  }, { valuenew1: [], valuenew2: [] });
  const valueToString1=JSON.stringify(valuenew1)
  const valueToString2=JSON.stringify(valuenew2)
  const valToJson1=JSON.parse(valueToString1)
  const valToJson2=JSON.parse(valueToString2)
  
 /*  console.log(valToJson1)
  console.log(valToJson2) */
  await Automation_Action_user_and_group.bulkCreate(valToJson1) 
  await Automation_Action.bulkCreate(valToJson2)


 const values2=req.body.automations.map((item)=>{
     const temp= item.conditions.all.map((innerItem)=>({
         condition_all_id:item.id,
          field:innerItem.field,
          operator:innerItem.operator,
          value:innerItem.value,
      }))
      return temp
  }).flat()

 await Automation_Cond_all.bulkCreate(values2)

 const values3=req.body.automations.map((item)=>{
     const temp= item.conditions.any.map((innerItem)=>({
         condition_any_id:item.id,
          field:innerItem.field,
          operator:innerItem.operator,
          value:innerItem.value,
      }))
      return temp
  }).flat()
 await Automation_Cond_any.bulkCreate(values3)
 res.status(201).send("record added successfully...")

}
//12
exports.createMacrosBulk=async(req,res)=>{
    const values=req.body.macros.map((item)=>({
        url:item.url,
        id:item.id,
        title:item.title,
        active:item.active,
        default:item.default,
        position:item.position,
        description:item.description,
        actions:item.actions,
        restrictions:item.restrictions,
        raw_title:item.raw_title,


       
   }))
    //await Macros.bulkCreate(values)
    let regex = /\d+/g;
    const values1=req.body.macros.map((item)=>{
        const temp = item.actions.map((innerItem) => {
            const field_id_match = innerItem.field.match(regex); // extract numeric values
            const field_id = field_id_match ? parseInt(field_id_match[0]) : null; // get first value or null
            return {
              action_id: item.id,
              //field: innerItem.field.replace(regex, ""),
              field: innerItem.field,
              field_id: field_id,
              value: innerItem.value,
              value_extract: innerItem.value.replace(/\n\n\n/g, "   ").replace(/\n\n/g, "  ").replace(/\n/g, " ").replace(/<\/?[^>]+>/gi, "")
              
            };
          });
     return temp
 }).flat()
await Macros_Action.bulkCreate(values1)
//console.log(values1)
 res.status(201).send("record added successfully...")
 
}
//13
exports.createUserFieldsBulk=async(req,res)=>{
    const values=req.body.user_fields.map((item)=>({
        url:item.url,
        id:item.id,
        type:item.type,
        key:item.key,
        title:item.title,
        description:item.description,
        raw_title:item.raw_title,
        raw_description:item.raw_description,
        position:item.position,
        active:item.active,
        system:item.system,
        regexp_for_validation:item.regexp_for_validation,
       
   }))
   await User_fields.bulkCreate(values)
 res.status(201).send("record added successfully...")

}
//14
exports.createWebhooksBulk=async(req,res)=>{
    const values=req.body.webhooks.map((item)=>({

        id:item.id,
        name:item.name,
        description:item.description,
        status:item.status,
        subscription:item.subscription,
        created_by:item.created_by,
        updated_by:item.updated_by,
        endpoint:item.endpoint,
        http_method:item.http_method,
        request_format:item.request_format,
        authentication:item.authentication,
       
   }))
   await Webhooks.bulkCreate(values)
   res.status(201).send("record added successfully...")
}
//15
/* exports.createUserFieldsBulk=async(req,res)=>{
    const values=req.body.ticket_fields.map((item)=>({
        url:item.url,
        id:item.id,
        title:item.title,
        description:item.description,
        position:item.position,
        'filter.all':item.filter.all,
        'filter.any':item.filter.any,
        policy_metrics:item.policy_metrics,
        
       
   }))
   await User_fields.bulkCreate(values)
} */
exports.createSlaPoliciesBulk=async(req,res)=>{
    const values=req.body.sla_policies.map((item)=>({
        url:item.url,
        id:item.id,
        title:item.title,
        description:item.description,
        position:item.position,
        'filter.all':item.filter.all,
        'filter.any':item.filter.any,
        policy_metrics:item.policy_metrics,
        
       
   }))
   await Sla_Policies.bulkCreate(values)

   const values1=req.body.sla_policies.map((item)=>{
    const temp= item.policy_metrics.map((innerItem)=>({
        sla_id:item.id,
         priority:innerItem.priority,
         metric:innerItem.metric,
         target:innerItem.target,
         business_hours:innerItem.business_hours,
     }))
     return temp
 }).flat()
 
 await Sla_policy_metrics.bulkCreate(values1)

 const values2=req.body.sla_policies.map((item)=>{
     const temp= item.filter.all.map((innerItem)=>({
         filter_all_id:item.id,
          field:innerItem.field,
          operator:innerItem.operator,
          value:innerItem.value,
      }))
      return temp
  }).flat()

 await Sla_filter_all.bulkCreate(values2)

 const values3=req.body.sla_policies.map((item)=>{
     const temp= item.filter.any.map((innerItem)=>({
         filter_any_id:item.id,
          field:innerItem.field,
          operator:innerItem.operator,
          value:innerItem.value,
      }))
      return temp
  }).flat()
 await Sla_filter_any.bulkCreate(values3)

 res.status(200).send("Bulk insertion completed for all 4 tables .")
}
exports.createOrganizationFieldsBulk=async(req,res)=>{
    const values=req.body.organization_fields.map((item)=>({
        url:item.url,
        id:item.id,
        type:item.type,
        key:item.key,
        title:item.title,
        description:item.description,
        raw_title:item.raw_title,
        raw_description:item.raw_description,
        position:item.position,
        active:item.active,
        system:item.system,
        regexp_for_validation:item.regexp_for_validation,
        custom_field_options:item.custom_field_options
       
   }))
   //await Organization_fields.bulkCreate(values)

    const values1=req.body.organization_fields.map((item)=>{
    const temp= item?.custom_field_options?.map((innerItem)=>({
        custom_field_id:item.id,
        id:innerItem.id,
        name:innerItem.name,
        raw_name:innerItem.raw_name,
        value:innerItem.value,
     }))
     return temp
 }).flat()
 console.log(values)
 console.log(values1)
//await Organization_Field_custom.bulkCreate(values1)

res.status(200).send("Bulk insertion completed for all tables .")

}
exports.createOrganizationsBulk=async(req,res)=>{
    const values=req.body.organizations.map((item)=>({
        url:item.url,
        id:item.id,
        name:item.name,
        shared_tickets:item.shared_tickets,
        shared_comments:item.shared_comments,
        external_id:item.external_id,
        domain_names:item.domain_names,
        details:item.details,
        notes:item.notes,
        group_id:item.group_id,
        tags:item.tags,
        org_fields_in_contract:item.organization_fields['in_contract'],
		org_fields_product_type: item.organization_fields['product_type'],
		org_fields_purchase_date: item.organization_fields['purchase_date'],
		org_fields_support_type: item.organization_fields['support_type']
       
   }))
   //console.log(values)
   await Organisations.bulkCreate(values)
   res.status(201).send("created...")
}

exports.createTicketMasterBulk=async(req,res)=>{
    const values=req.body.master.map(item=>({
        module:item.module,
        condition:item.value,
        operator:item.operator,
        value:item.value
    }))
    await Ticket_master.bulkCreate(values)
}
exports.createTicketFormBulk=async(req,res)=>{
    const values=req.body.ticket_forms.map(item=>({
        url:item.url,
        id:item.id,
        name:item.name,
        raw_name:item.raw_name,
        display_name:item.display_name,
        raw_display_name:item.raw_display_name,
        end_user_visible:item.end_user_visible,
        position:item.position,
        ticket_field_ids:item.ticket_field_ids,
        active:item.active,
        default:item.default,
        in_all_brands:item.in_all_brands,
        restricted_brand_ids:item.restricted_brand_ids,
        
        
    }))
    await Ticket_forms.bulkCreate(values)

    const values1=req.body.ticket_forms.map((item)=>{
        const temp= item.end_user_conditions?.map((innerItem)=>({
            
            ticket_form_id:item.id,
            parent_field_id:innerItem.parent_field_id,
            parent_field_type:innerItem.parent_field_type,
            value:innerItem.value,
            
         }))
         return temp
     }).flat()
    await Ticket_forms_end_user_cond.bulkCreate(values1)
    
    const values2=req.body.ticket_forms.map((item)=>{
        const temp= item.agent_conditions?.map((innerItem)=>({
            ticket_form_id:item.id,
            parent_field_id:innerItem.parent_field_id,
            parent_field_type:innerItem.parent_field_type,
            value:innerItem.value,
            
         }))
         return temp
     }).flat()
    await Ticket_forms_agent_cond.bulkCreate(values2)
    /*  */

    const values3 = req.body.ticket_forms.map((item) => {
        const temp = item.agent_conditions?.map((innerItem) => {
            const childFields = innerItem?.child_fields?.map((childItem) => {
                // extract values from childItem here
                return {
                    // child field properties
                    ticket_form_id:item.id,
                    parent_field_id:innerItem.parent_field_id,
                    child_id:childItem.id,
                    is_required:childItem.is_required,
                    required_on_statuses_type:childItem.required_on_statuses['type'],
                    required_on_statuses_status:childItem.required_on_statuses['statuses'],

                }
            })
            return childFields
        })
        return temp.flat(2) // use flat() with depth 2 to flatten child_fields array
    }).flat(1) // use flat() with depth 1 to flatten the entire result array
    //console.log(values3)
   await Ticket_forms_agent_cond_child_field.bulkCreate(values3) 

 // use flat() with depth 1 to flatten the entire result array
     const value4 = req.body.ticket_forms.map((item) => {
        const temp = item.end_user_conditions?.map((innerItem) => {
            const childFields = innerItem?.child_fields?.map((childItem) => {
                // extract values from childItem here
                return {
                    // child field properties
                    ticket_form_id:item.id,
                    parent_field_id:innerItem.parent_field_id,
                    child_id:childItem.id,
                    is_required:childItem.is_required,
                    
                }
            })
            return childFields
        })
        return temp.flat(2) // use flat() with depth 2 to flatten child_fields array
    }).flat(1)
    
    await Ticket_forms_end_user_child_field.bulkCreate(value4)
    
    res.status(200).send("sent successfully ...")
}


exports.createMainMaster=async(req,res)=>{
    const values=req.body.main.map(item=>({
        Criteria_ID:item.Criteria_ID,
        Field_Business_Name:item.Field_Business_Name,
        Operator_business_reference:item.Operator_business_reference,
        Value_Business_reference:item.Value_Business_reference,
        Conditions_API_Name:item.Conditions_API_Name,
        Operator_API_Reference:item.Operator_API_Reference,
        Value_API_reference:item.Value_API_reference,
        Value_Type:item.Value_Type,
        Category:item.Category
    }))
    await Master_main.bulkCreate(values)
    res.status(200).send("Bulk insertion successful..")
}

exports.createMainMasterAction=async(req,res)=>{
    const values=req.body.main.map(item=>({
        Criteria_ID:item.Criteria_ID,
        Field_Business_Name:item.Field_Business_Name,
        Value_Business_reference:item.Value_Business_reference,
        Conditions_API_Name:item.Conditions_API_Name,
        Value_API_reference:item.Value_API_reference,
        field6:item.field6
    }))
    await Master_main_action.bulkCreate(values)
    res.status(200).send("Bulk insertion successful..")
}

/* exports.createAutomationActionBulksync=async(req,res)=>{
    const values=req.body.master.map(item=>({
        
        condition:item.value,
        operator:item.operator,
        value:item.value
    }))
    await Ticket_master.bulkCreate(values)

} */




exports.deleteData=async(req,res)=>{
    const delData=await Conditions_any.destroy({where:{condition_any_id:req.params.id}})
    const delData1=await Conditions_all.destroy({where:{condition_all_id:req.params.id}})
    const delData2=await Action.destroy({where:{action_id:req.params.id}})
    const delData3=await Master.destroy({where:{id:req.params.id}})

    res.status(200).json({
        Message:"data with the given id deleted"
    })
    
}
exports.deleteBulk=async(req,res)=>{
    await Locales.destroy({
        where: {}
      })
    /* await Trigger_Cond_all.destroy({
        where: {}
      })
    await Trigger_Cond_any.destroy({
        where: {}
      })
    await Triggers.destroy({
        where: {}
      }) */.then(d => {
        res.status(200).json({
            Message:"data with the given id deleted"
        })
      })
    
}

/* ["01G4F655S4EXKNA6DXMJ7V6PDK",
 "{\n  \"users\": [\n    {\"id\": \"{{ticket.requester.id}}\",
  \"phone\": \"{{ ticket.requester.phone | split:\"#\" | first }}\"}\n  ]\n}\n\n"] */
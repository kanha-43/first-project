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
         actions:item.actions,
        'conditions.all':item.conditions.all,
        'conditions.any':item.conditions.any,
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
               return[{action_id:item.id,
                    
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
        actions:item.actions,
       'conditions.all':item.conditions.all,
       'conditions.any':item.conditions.any,
        description:item.description,
        position:item.position,
        raw_title:item.raw_title,
        category_id:item.category_id
   }))
   await Triggers.bulkCreate(values)
}
//1
exports.createTagsBulk=async(req,res)=>{
    const values=req.body.tags.map((item)=>({
        name:item.name,
        count:item.count,
        
   }))
   await Tags.bulkCreate(values)
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
        has_help_state:item.has_help_state,
        active:item.active,
        default:item.default,
        is_deleted:item.is_deleted,
        logo:item.logo,
        ticket_form_ids:item.ticket_form_ids,
        signature_template:item.signature_template,


       
   }))
   await Brands.bulkCreate(values)
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
   await Dynamic_Content.bulkCreate(values)
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
        actions:item.actions,
       'conditions.all':item.conditions.all,
       'conditions.any':item.conditions.any,
        
        position:item.position,
        raw_title:item.raw_title,


       
   }))
   await Automation.bulkCreate(values)
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
   await Macros.bulkCreate(values)
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
   await Organization_fields.bulkCreate(values)
}
exports.createOrganizationsBulk=async(req,res)=>{
    const values=req.body.organization_fields.map((item)=>({
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
        organization_fields:item.organization_fields,
       
   }))
   await Organisations.bulkCreate(values)
}
exports.deleteData=async(req,res)=>{
    const delData=await Conditions_any.destroy({where:{condition_any_id:req.params.id}})
    const delData1=await Conditions_all.destroy({where:{condition_all_id:req.params.id}})
    const delData2=await Action.destroy({where:{action_id:req.params.id}})
    const delData3=await Master.destroy({where:{id:req.params.id}})

    res.status(200).json({
        Message:"data with the given id deleted"
    })
}

/* ["01G4F655S4EXKNA6DXMJ7V6PDK",
 "{\n  \"users\": [\n    {\"id\": \"{{ticket.requester.id}}\",
  \"phone\": \"{{ ticket.requester.phone | split:\"#\" | first }}\"}\n  ]\n}\n\n"] */
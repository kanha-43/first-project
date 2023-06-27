
const db=require('../models')
const Brands=db.brands;
const Groups=db.groups;
const MainMaster=db.main_master
const MainMasterAction=db.main_master_action
const Conditions_all=db.condition_all
const Action=db.action
const Trigger_Action=db.trigger_action
const Ticket_forms=db.ticket_forms
const Set_Schedules=db.schedules
const Organisations=db.organizations
const Trigger_Cond_all=db.trigger_cond_all
const Trigger=db.triggers
const Locales=db.locales

const { Sequelize ,Op} = require('sequelize');

exports.readBrandData=async(req,res)=>{
    await Brands.findAll({attributes:['name']})
        .then(rows => {
          // `rows` contains an array of objects with only the `column1` property
          // case 1 
         res.status(200).send(rows)
          // case 2
          //res.status(200).send(rows[0].name)
          
        })
        .catch(err => {
          console.error(err);
        });
       
       /*  await Brands.findAll({attributes:['ticket_form_ids']}).then(rows=>{
           // case 3 
          //res.status(200).send(rows)
          //  case 4 
          //const jsonData=JSON.parse(rows[0].ticket_form_ids)
          //res.status(200).send({"data":rows[0].ticket_form_ids[0]})
        }) */
        

}
exports.readBrandIdbyID=async(req,res)=>{
  const id=req.params.id

  const data= await Brands.findAll({}).then(rows=>{
          
    //res.status(200).send(rows)
    return rows

  })
  
  const val=data.map((item,index)=>{
    let ourBrandID=item.id
    
    //const jsonIDs=JSON.parse(item.ticket_form_ids)
    
    const temp=item.ticket_form_ids.map((innerItem,index)=>{
        if(id==innerItem){
          return ourBrandID
        } 
    })
    
    return temp
  }).flat().filter(value=>value!==undefined)

  res.status(200).send(val)
}

exports.readBrandByName=async(req,res)=>{
  let id;
      await Brands.findAll({where:{name:req.body.name}})
          .then(rows => {
            console.log(req.body.name)
            res.status(200).send(rows)
          })
          .catch(err => {
            console.error(err);
          });
        
        }


exports.readBrandID=async(req,res)=>{
  let id;
      await Brands.findAll({attributes:['id'], where:{name:req.body.name}})
          .then(rows => {
            console.log(rows[0].id)
            // `rows` contains an array of objects with only the `column1` property
            id=JSON.stringify(rows[0].id)
          })
          .catch(err => {
            console.error(err);
          });
      await Conditions_all.findAll({where:{condition_all_id:id}})
      .then(rows => {
        // `rows` contains an array of objects with only the `column1` property
        //res.status(200).send(rows)
        console.log(rows)
      })
      .catch(err => {
        console.error(err);
      }); await Conditions_all.findAll().then(response => {
        const columnValues = response.map(eachResponse => eachResponse.field.split('_')[2]);
        //console.log(columnAValues);
        res.status(200).send(columnValues)
      })
      /* await Conditions_all.findOne({
        where: {
          column_b: {
            [Op.contains]: [searchValue]
          }
        }
      }) */
}
exports.readGroupData=async(req,res)=>{
    await Groups.findAll({attributes:['name']})
        .then(rows => {
          // `rows` contains an array of objects with only the `column1` property
          res.status(200).send(rows)
        })
        .catch(err => {
          console.error(err);
        });
}
exports.readFormsData=async(req,res)=>{
  await Ticket_forms.findAll({attributes:['name']})
      .then(rows => {
        // `rows` contains an array of objects with only the `column1` property
        res.status(200).send(rows)
      })
      .catch(err => {
        console.error(err);
      });
}
exports.readOrganisationsData=async(req,res)=>{
  await Organisations.findAll({attributes:['name']})
      .then(rows => {
        // `rows` contains an array of objects with only the `column1` property
        res.status(200).send(rows)
      })
      .catch(err => {
        console.error(err);
      });
}

exports.readSchedulesData=async(req,res)=>{
  await Set_Schedules.findAll({attributes:['name']})
      .then(rows => {
        // `rows` contains an array of objects with only the `column1` property
        res.status(200).send(rows)
      })
      .catch(err => {
        console.error(err);
      });

}

exports.readLocalesData=async(req,res)=>{
  await Locales.findAll({attributes:['presentation_name']})
      .then(rows => {
        // `rows` contains an array of objects with only the `column1` property
        res.status(200).send(rows)
      })
      .catch(err => {
        console.error(err);
      });

}

exports.readTriggerCondAllData=async(req,res)=>{
  let field=req.params.field
  let operator=req.params.operator
  let value=req.params.value


  await MainMaster.findAll({/* where:{Field_Business_Name:paramTable} */
      attributes: [
        "Conditions_API_Name","Operator_API_Reference","Value_API_reference"
      ],
      where: {
        [Op.and]:[
          {Field_Business_Name:field},
        {Operator_business_reference: operator},
        {Value_Business_reference:value}
        
        ]
      },
      })
      .then(rows => {
        // `rows` contains an array of objects with only the `column1` property
        field=rows[0].Conditions_API_Name
        operator=rows[0].Operator_API_Reference
        value=rows[0].Value_API_reference
        
      })
      .catch(err => {
        console.error(err);
      });
      
      let cond_all_id_Array=[]
      
      
    await Trigger_Cond_all.findAll({
        attributes:["condition_all_id"],
        where:{
          [Op.and]:[
            {field:field},
          {operator: operator},
          {value:value}
           
          ]
        }
      }).then(rows=>{
        rows.map((row,index)=>{
          cond_all_id_Array[index]=row["condition_all_id"]
        })
        console.log(cond_all_id_Array)
      })
      await Trigger.findAll({
        attributes:["title","id"],
        where:{
          id:{
            [Op.in]:cond_all_id_Array
          }
        }
      }).then(rows=>{
        res.status(200).send(rows)

      })
}

exports.readTriggerCondAllData=async(req,res)=>{
  let field=req.params.field
  let operator=req.params.operator
  let value=req.params.value


  await MainMaster.findAll({/* where:{Field_Business_Name:paramTable} */
      attributes: [
        "Conditions_API_Name","Operator_API_Reference","Value_API_reference"
      ],
      where: {
        [Op.and]:[
          {Field_Business_Name:field},
        {Operator_business_reference: operator},
        {Value_Business_reference:value}
        
        ]
      },
      })
      .then(rows => {
        // `rows` contains an array of objects with only the `column1` property
        field=rows[0].Conditions_API_Name
        operator=rows[0].Operator_API_Reference
        value=rows[0].Value_API_reference
        
      })
      .catch(err => {
        console.error(err);
      });
      
      let cond_all_id_Array=[]
      
      
    await Trigger_Cond_all.findAll({
        attributes:["condition_all_id"],
        where:{
          [Op.and]:[
            {field:field},
          {operator: operator},
          {value:value}
           
          ]
        }
      }).then(rows=>{
        rows.map((row,index)=>{
          cond_all_id_Array[index]=row["condition_all_id"]
        })
        console.log(cond_all_id_Array)
      })
      await Trigger.findAll({
        attributes:["title","id","position","category_id"],
        where:{
          id:{
            [Op.in]:cond_all_id_Array
          }
        }
      }).then(rows=>{
        res.status(200).send(rows)

      })
}

exports.readTriggerActionAllData=async(req,res)=>{
  let field=req.params.field
  let value=req.params.value

  await MainMasterAction.findAll({/* where:{Field_Business_Name:paramTable} */
      attributes: [
        "Conditions_API_Name","Value_API_reference"
      ],
      where: {
        [Op.and]:[
          {Field_Business_Name:field},
        {Value_Business_reference:value}
        
        ]
      },
      })
      .then(rows => {
        // `rows` contains an array of objects with only the `column1` property
        field=rows[0].Conditions_API_Name
        value=rows[0].Value_API_reference
        
        
      })
      .catch(err => {
        console.error(err);
      });
      
      let action_id_Array=[]
      
      
    await Trigger_Action.findAll({
        attributes:["action_id"],
        where:{
         
          [Op.and]:[
            {field:field},
          
          {value:value}
           
          ]
        }
      }).then(rows=>{
        rows.map((row,index)=>{
          action_id_Array[index]=row["action_id"]
        })
        console.log(action_id_Array)
      })
      await Trigger.findAll({
        attributes:["title","id","position","category_id"],
        where:{
          id:{
            [Op.in]:action_id_Array
          }
        }
      }).then(rows=>{
        res.status(200).send(rows)

      })
}


exports.showTriggerCondAllDataInTable=async(req,res)=>{
  let id=req.params.id
  
    await Trigger_Cond_all.findAll({
        attributes:["field","operator","value"],
        where:{
          condition_all_id:id
        }
      }).then(rows=>{
        res.status(200).send(rows)  
      })
     
}

exports.showTriggerActionDataInTable=async(req,res)=>{
  let id=req.params.id
  
    await Trigger_Action.findAll({
        attributes:["field","value"],
        where:{
          action_id:id
        }
      }).then(rows=>{
        res.status(200).send(rows)  
      })
     
}


exports.readConditionAllData=async(req,res)=>{
  const requestID=req.body.condition_all_id
  await Conditions_all.findAll({where:{condition_all_id:requestID}})
      .then(rows => {
        // `rows` contains an array of objects with only the `column1` property
        res.status(200).send(rows)
      })
      .catch(err => {
        console.error(err);
      });
}

exports.readMainMasterData=async(req,res)=>{
  //const paramTable=req.params.name
  await MainMaster.findAll({/* where:{Field_Business_Name:paramTable} */
  attributes: [
    [Sequelize.fn('DISTINCT', Sequelize.col('Field_Business_Name')), 'name'],
  ],
  })
      .then(rows => {
        // `rows` contains an array of objects with only the `column1` property
        res.status(200).send(rows)
      })
      .catch(err => {
        console.error(err);
      });
}

exports.readMainMasterActionData=async(req,res)=>{
  //const paramTable=req.params.name
  await MainMasterAction.findAll({/* where:{Field_Business_Name:paramTable} */
  attributes: [
    [Sequelize.fn('DISTINCT', Sequelize.col('Field_Business_Name')), 'name'],
  ],
  })
      .then(rows => {
        // `rows` contains an array of objects with only the `column1` property
        res.status(200).send(rows)
      })
      .catch(err => {
        console.error(err);
      });
}

exports.readMainMaster_obr=async(req,res)=>{
  //const paramTable=req.params.name
  const fb=req.params.fb
  await MainMaster.findAll({/* where:{Field_Business_Name:paramTable} */
  attributes: [
    [Sequelize.fn('DISTINCT', Sequelize.col('Operator_business_reference')), 'name'],
  ],
  where:{Field_Business_Name:fb}
  })
      .then(rows => {
        // `rows` contains an array of objects with only the `column1` property
        res.status(200).send(rows)
      })
      .catch(err => {
        console.error(err);
      });
}

exports.readMainMaster_vbr=async(req,res)=>{
  const op=req.params.op
  const fb=req.params.fb
  //const paramTable=req.params.name  Value_Business_reference
  await MainMaster.findAll({/* where:{Field_Business_Name:paramTable} */
  attributes: [
    [Sequelize.fn('DISTINCT', Sequelize.col('Value_Business_reference')), 'name'],
  ],
  where: {
    [Op.and]:[
    {Operator_business_reference: op},
     {Field_Business_Name:fb}
    ]
  },
  })
      .then(rows => {
        // `rows` contains an array of objects with only the `column1` property
        res.status(200).send(rows)
      })
      .catch(err => {
        console.error(err);
      });
}

exports.readMainMasterActionTriggerValue=async(req,res)=>{
  
  try
  {
      const fb=req.params.fb
      const vb=req.params.fb
      //const paramTable=req.params.name Value_Business_reference
      const result=await MainMasterAction.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('Conditions_API_Name')), 'name'],
      ],
      where: {
        Field_Business_Name:fb
      },
      
  /* ,where:{Field_Business_Name:fb} */})
      const field=result[0].dataValues.name
      await Trigger_Action.findAll({attributes:['value'], where:{field:field}}).then(result=>{
        res.status(200).send(result)
      })
      }catch(e){
        console.log(e)
      }
}


exports.readMainMasterAction_vbr=async(req,res)=>{

  const fb=req.params.fb
  //const paramTable=req.params.name  Value_Business_reference
  await MainMasterAction.findAll({/* where:{Field_Business_Name:paramTable} */
  attributes: [
    [Sequelize.fn('DISTINCT', Sequelize.col('Value_Business_reference')), 'name'],
  ],
  where: {
    Field_Business_Name:fb
  },
  })
      .then(rows => {
        // `rows` contains an array of objects with only the `column1` property
        res.status(200).send(rows)
      })
      .catch(err => {
        console.error(err);
      });
}


exports.readAction=async(req,res)=>{
  //const paramTable=req.params.name
  await Action.findAll({/* where:{Field_Business_Name:paramTable} */
  attributes: [
    [Sequelize.fn('DISTINCT', Sequelize.col('field')), 'name'],
  ],
  })
      .then(rows => {
        // `rows` contains an array of objects with only the `column1` property
        res.status(200).send(rows)
      })
      .catch(err => {
        console.error(err);
      });
}
/* const ids = [360003788214,
      360003996854,
      6443788100887,
      7354099950743,
      7354101960471,
      7354105860247,
      7366067471895,
      7825175439383,
      7826780186007,
      9583153112087,
      9954407279639,
      11562380675223,
      360005774394];

const data = await Model.findAll({
    where: {
        id: ids
    }
});

console.log(data); */
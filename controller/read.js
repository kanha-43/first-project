
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
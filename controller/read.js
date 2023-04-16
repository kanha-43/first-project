const db=require('../models')
const Brands=db.brands;
const Groups=db.groups;
const MainMaster=db.main_master
const Conditions_all=db.condition_all

exports.readBrandData=async(req,res)=>{
    await Brands.findAll({attributes:['name']})
        .then(rows => {
          // `rows` contains an array of objects with only the `column1` property
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
      await Conditions_all.findOne({
        where: {
          column_b: {
            [Op.contains]: [searchValue]
          }
        }
      })
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
  const paramTable=req.params.name
  await MainMaster.findAll({where:{Field_Business_Name:paramTable}})
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
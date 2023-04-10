const db=require('../models')
const Brands=db.brands;

const Groups=db.groups

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
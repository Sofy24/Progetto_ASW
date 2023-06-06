const Deposit = require('../model/Deposit');
const Typology = require('../model/Typology');
const Bins = require('../model/Bin');
//const Server = require("../socketController")


const handle2Months = async (req, res) => {
    try {
        const current =new Date()
        var year = current.getFullYear()//.toString();
        var month = current.getMonth()//.toString();
        /*
        const std=year.toString().concat("-").concat(month.toString()).concat("-01")
        var d = new Date(std)
        console.log(year)
        console.log(month)
        console.log(std)
        console.log(d)
        console.log(new Date(2022,12,01,02))
        console.log(new Date().toLocaleString())
        console.log(new Date(new Date().toLocaleString()))*/

        const timezoneOffset = +120; // GMT+2:00 (2 hours ahead of GMT)
        const currentDate = new Date(year,month,01);
        const adjustedDate = new Date(currentDate.getTime() + timezoneOffset * 60 * 1000);
        
        console.log(adjustedDate);

        const depositThisMonth = await Deposit.aggregate([
          {$match: {createdAt:{ $gte : adjustedDate}}},
          {$group:{_id:'$bin',total_kg:{$sum:'$kg'}}},
          {$lookup:{
            from:'Bins',
            localField: '_id',
            foreignField: '_id',
            as: "bin"
          }},
          {$lookup:{
              from:'Typology',
              localField: 'bin.typology',
              foreignField: '_id',
              as: "typology"
          }}/*,
          {$lookup:{
            from:'Typology',
            
            localField: 'bin.typology',
            foreignField: '_id',
            let:{pippo:'$typology.name'},
            pipeline: [
              { $match: { $expr: { $not: { $in: [ "$name", '$$pippo' ] }}}}
            ],
            as: "typology2"
          }}*/,
          {$project:{
            bin_typology: "$typology.name",
            total_kg: '$total_kg'
          }}
        ]);

/*
        const depositThisMonth2 = await Bins.aggregate([
          {$lookup:{
            from:'Typology',
            localField: 'typology',
            foreignField: '_id',
            as: "typology"
          }},
          {$lookup:{
              from:'deposits',
              localField: '_id',
              foreignField: 'bin',
              as: "deposit"
          }},
          {$unwind:{
            path: "$deposit",
            preserveNullAndEmptyArrays: true
            }
          },
          {$match: {'deposit.createdAt':{ $gte : adjustedDate}}},
          {$group:{_id:'$typology.name',total_kg:{$sum:'$deposit.kg'}}},
          {$project:{
            bin_typology: "$name",
            total_kg: '$total_kg'
          }}
        ]);

        console.log(depositThisMonth2)
        const res = depositThisMonth.map(element =>element.typology2)
        console.log(res)*/
        const res1 = depositThisMonth.map(element =>[element.bin_typology[0],element.total_kg])
        

        console.log("ses1:"+res1)
        /*
        var x = depositThisMonth.forEach()
        console.log(depositThisMonth);
        console.log(x)*/
        
        const lastDate = new Date(year,month-1,01);
        const adjustedLastDate = new Date(lastDate.getTime() + timezoneOffset * 60 * 1000);
        
        const depositLastMonth = await Deposit.aggregate([
          {$match: {createdAt:{ $gte : adjustedLastDate}}},
          {$match: {createdAt:{ $lt : adjustedDate}}},
          {$group:{_id:'$bin',total_kg:{$sum:'$kg'}}},
          {$lookup:{
            from:'Bins',
            localField: '_id',
            foreignField: '_id',
            as: "bin"
          }},
          {$lookup:{
              from:'Typology',
              localField: 'bin.typology',
              foreignField: '_id',
              as: "typology"
          }},
          {$project:{
            bin_typology: "$typology.name",
            total_kg: '$total_kg'
          }}
        ]);

        //, {$group:{_id:'$bin',total_kg:{$sum:'$kg'}}}
        //find({}, 'name');
        /*const depositLastMonth = await Deposit.find({crearedAt:{ $gte : new Date(year,month-1),$lt:new Date(year,month)}})


        const kg = bins.map(mun => mun.name);

        municipalityNames.sort((a, b) => a.localeCompare(b));
        */


        const res2 = depositLastMonth.map(element =>[element.bin_typology,element.total_kg])
        const list=['carta', 'plastica e lattine', 'vetro', 'potature', 'organico', 'indifferenziata','olio']

        var final1=[0,0,0,0,0,0,0]
        var final2=[0,0,0,0,0,0,0]
        res1.forEach(e => {
          //console.log(e)
          //console.log(r)
          //console.log(list.indexOf(r))
          index=list.indexOf(e[0])
          final1[index]=e[1]
        });
        res2.forEach(e => {
          //console.log(e)
          //console.log(r)
          //console.log(list.indexOf(r))
          index=list.indexOf(e[0])
          final2[index]=e[1]
        });
        
        console.log("f1: "+final1)
        res.json([final1,final2])
        //res = [final1,final2]
      } catch (error) {
        console.error('Error retrieving bins:', error);
        res.status(500).json({ error: 'Failed to retrieve bins' });
      }
};

function radarData(res){
  const current =new Date()
        var year = current.getFullYear()//.toString();
        var month = current.getMonth()//.toString();
        var final1=[0,0,0,0,0,0,0]
        var final2=[0,0,0,0,0,0,0]

        const timezoneOffset = +120; // GMT+2:00 (2 hours ahead of GMT)
        const currentDate = new Date(year,month,01);
        const adjustedDate = new Date(currentDate.getTime() + timezoneOffset * 60 * 1000);
        
        console.log(adjustedDate);

        Deposit.aggregate([
          {$match: {createdAt:{ $gte : adjustedDate}}},
          {$group:{_id:'$bin',total_kg:{$sum:'$kg'}}},
          {$lookup:{
            from:'Bins',
            localField: '_id',
            foreignField: '_id',
            as: "bin"
          }},
          {$lookup:{
              from:'Typology',
              localField: 'bin.typology',
              foreignField: '_id',
              as: "typology"
          }},
          {$project:{
            bin_typology: "$typology.name",
            total_kg: '$total_kg'
          }}
        ]).then((depositThisMonth)=>{
          const res1 = depositThisMonth.map(element =>[element.bin_typology[0],element.total_kg])
        

          console.log(res1)
          
          
          const lastDate = new Date(year,month-1,01);
          const adjustedLastDate = new Date(currentDate.getTime() + timezoneOffset * 60 * 1000);
          
          Deposit.aggregate([
            {$match: {createdAt:{ $gte : adjustedLastDate}}},
            {$match: {createdAt:{ $lt : adjustedDate}}},
            {$group:{_id:'$bin',total_kg:{$sum:'$kg'}}},
            {$lookup:{
              from:'Bins',
              localField: '_id',
              foreignField: '_id',
              as: "bin"
            }},
            {$lookup:{
                from:'Typology',
                localField: 'bin.typology',
                foreignField: '_id',
                as: "typology"
            }},
            {$project:{
              bin_typology: "$typology.name",
              total_kg: '$total_kg'
            }}
          ]).then((depositLastMonth)=>{
            const res2 = depositLastMonth.map(element =>[element.bin_typology,element.total_kg])
          const list=['carta', 'plastica e lattine', 'vetro', 'potature', 'organico', 'indifferenziata','olio']
  
          
          res1.forEach(e => {
            index=list.indexOf(e[0])
            final1[index]=e[1]
          });
          res2.forEach(e => {
            index=list.indexOf(e[0])
            final2[index]=e[1]
          });
          
          console.log(final1)
          //res.json();
          console.log("GUDIHGDIBHB ")
  
          console.log([final1,final2])
          res= [final1,final2]
          });
  
        });

        
        
        
}




async function radarData2(){
  const current =new Date()
  var year = current.getFullYear()//.toString();
  var month = current.getMonth()//.toString();
  var final1=[0,0,0,0,0,0,0]
  var final2=[0,0,0,0,0,0,0]

  const timezoneOffset = +120; // GMT+2:00 (2 hours ahead of GMT)
  const currentDate = new Date(year,month,01);
  const adjustedDate = new Date(currentDate.getTime() + timezoneOffset * 60 * 1000);
  
  //console.log(adjustedDate);

  const depositThisMonth = await Deposit.aggregate([
    {$match: {createdAt:{ $gte : adjustedDate}}},
    {$lookup:{
      from:'Bins',
      localField: 'bin',
      foreignField: '_id',
      as: "bin"
    }},
    {$group:{_id:'$bin.typology',total_kg:{$sum:'$kg'}}},
    {$lookup:{
        from:'Typology',
        localField: '_id',
        foreignField: '_id',
        as: "typology"
    }},
    {$project:{
      bin_typology: "$typology.name",
      total_kg: '$total_kg'
    }}
  ])
  //console.log(depositThisMonth)
  const res1 = depositThisMonth.map(element =>[element.bin_typology[0],element.total_kg])


  //console.log(res1)
  
  
  const lastDate = new Date(year,month-1,01);
  const adjustedLastDate = new Date(lastDate.getTime() + timezoneOffset * 60 * 1000);
  
  const depositLastMonth= await Deposit.aggregate([
    {$match: {createdAt:{ $gte : adjustedLastDate}}},
    {$match: {createdAt:{ $lt : adjustedDate}}},
    {$lookup:{
      from:'Bins',
      localField: 'bin',
      foreignField: '_id',
      as: "bin"
    }},
    {$group:{_id:'$bin.typology',total_kg:{$sum:'$kg'}}},
    {$lookup:{
        from:'Typology',
        localField: '_id',
        foreignField: '_id',
        as: "typology"
    }},
    {$project:{
      bin_typology: "$typology.name",
      total_kg: '$total_kg'
    }}
  ])
  const res2 = depositLastMonth.map(element =>[element.bin_typology[0],element.total_kg])
  const list=['carta', 'plastica e lattine', 'vetro', 'potature', 'organico', 'indifferenziata','olio']

  
  res1.forEach(e => {
    index=list.indexOf(e[0])
    final1[index]=e[1]
  });
  res2.forEach(e => {
    index=list.indexOf(e[0])
    final2[index]=e[1]
  });
  
  /*
  console.log(final1)
  //res.json();
  console.log("GUDIHGDIBHB ")

  console.log([final1,final2])
*/
  return [final1,final2]

        
}

module.exports = {
  handle2Months, 
  radarData,
  radarData2
}
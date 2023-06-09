const Deposit = require('../model/Deposit');
const Typology = require('../model/Typology');
const Bins = require('../model/Bin');
//const Server = require("../socketController")

async function generalData(){
  const current =new Date()
  var year = current.getFullYear()//.toString();
  var month = current.getMonth()//.toString();
  var final1=[0,0,0,0,0,0,0]
  var final2=[0,0,0,0,0,0,0]

  const timezoneOffset = new Date().getTimezoneOffset() + 120; // GMT+2:00 (2 hours ahead of GMT)
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
  
  var lastMonth
  if(month==0){
    lastMonth = 11
  }else{
    lastMonth=month-1
  }
  
  const lastDate = new Date(year,lastMonth,01);
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
  const list=['carta', 'plastica e lattine', 'vetro', 'sfralci e potature', 'organico', 'indifferenziata','olio']

  
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


async function userData(email){
  userEmail = email
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
    {$lookup:{
      from:'Users',
      localField: 'user',
      foreignField: '_id',
      as: "user"
    }},
    {$match: {"user.email":userEmail}},
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
    {$lookup:{
      from:'Users',
      localField: 'user',
      foreignField: '_id',
      as: "user"
    }},
    {$match: {"user.email":userEmail}},
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
  const list=['carta', 'plastica e lattine', 'vetro', 'sfralci e potature', 'organico', 'indifferenziata','olio']

  
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
  generalData,
  userData
}
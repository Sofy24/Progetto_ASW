const Deposit = require('../model/Deposit');
const Typology = require('../model/Typology');
const Bins = require('../model/Bin');


async function generalData(){
  const current =new Date()
  var year = current.getFullYear()//.toString();
  var month = current.getMonth()//.toString();
  var final1=[0,0,0,0,0,0,0]

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
  const res1 = depositThisMonth.map(element =>[element.bin_typology[0],element.total_kg])

  //console.log(res1)
  
  
  const list=['carta', 'plastica e lattine', 'vetro', 'potature', 'organico', 'indifferenziata','olio']
  
  
  res1.forEach(e => {
    index=list.indexOf(e[0])
    final1[index]=e[1]
  });
  
  
  //console.log(final1)
  
  
  return final1

        
}



async function userData(email){
  userEmail = email
  const current =new Date()
  var year = current.getFullYear()//.toString();
  var month = current.getMonth()//.toString();
  var final1=[0,0,0,0,0,0,0]

  const timezoneOffset = new Date().getTimezoneOffset() + 120; // GMT+2:00 (2 hours ahead of GMT)
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
    {$match: {"user.email": email}},
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
  const res1 = depositThisMonth.map(element =>[element.bin_typology[0],element.total_kg])

  //console.log(res1)
  
  
  const list=['carta', 'plastica e lattine', 'vetro', 'potature', 'organico', 'indifferenziata','olio']
  
  
  res1.forEach(e => {
    index=list.indexOf(e[0])
    final1[index]=e[1]
  });
  
  
  //console.log(final1)
  
  
  return final1

        
}

module.exports = {
  generalData,
  userData
}
const Deposit = require('../model/Deposit');
const Typology = require('../model/Typology');
const Bins = require('../model/Bin');


async function generalData(){
  const current =new Date()
  var year = current.getFullYear()
  var month = current.getMonth()
  var final1=[0,0,0,0,0,0,0]
  var final2=[0,0,0,0,0,0,0]

  const timezoneOffset = new Date().getTimezoneOffset() + 120; // GMT+2:00 (2 hours ahead of GMT)
  const currentDate = new Date(year,month,01);
  const adjustedDate = new Date(currentDate.getTime() + timezoneOffset * 60 * 1000);
  


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

  const depositTotal= await Deposit.aggregate([
    {$match: {createdAt:{ $lt : adjustedDate}}},
    {$lookup:{
      from:'Bins',
      localField: 'bin',
      foreignField: '_id',
      as: "bin"
    }},
    {$group:{_id:'$bin.typology',total_kg:{$sum:'$kg'},month_min:{$min:'$createdAt'}}},
    {$lookup:{
        from:'Typology',
        localField: '_id',
        foreignField: '_id',
        as: "typology"
    }},
    {$project:{
      min:"$month_min",
      max:adjustedDate,
      bin_typology: "$typology.name",
      total_kg: '$total_kg',
      month:{$dateDiff:
        {
          startDate:"$month_min",
          endDate:adjustedDate,
          unit:"month"
        }
      }
    }}
  ])

  depositTotal.forEach(e=>{
    
      e.month++
    
  })

  const res2 = depositTotal.map(element =>[element.bin_typology[0],(element.total_kg)/(element.month)])
  const list=['carta', 'plastica e lattine', 'vetro', 'sfralci e potature', 'organico', 'indifferenziata','olio']
  
  
  res1.forEach(e => {
    index=list.indexOf(e[0])
    final1[index]=e[1]
  });
  res2.forEach(e => {
    index=list.indexOf(e[0])
    final2[index]=e[1]
  });

  
  return [final1,final2]

        
}


async function userData(email){
  userEmail = email
  const current =new Date()
  var year = current.getFullYear()
  var month = current.getMonth()
  var final1=[0,0,0,0,0,0,0]
  var final2=[0,0,0,0,0,0,0]

  const timezoneOffset = +120; // GMT+2:00 (2 hours ahead of GMT)
  const currentDate = new Date(year,month,01);
  const adjustedDate = new Date(currentDate.getTime() + timezoneOffset * 60 * 1000);
  

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

  
  const depositTotal= await Deposit.aggregate([
    {$lookup:{
      from:'Users',
      localField: 'user',
      foreignField: '_id',
      as: "user"
    }},
    {$match: {"user.email": email}},
    {$match: {createdAt:{ $lt : adjustedDate}}},
    {$lookup:{
      from:'Bins',
      localField: 'bin',
      foreignField: '_id',
      as: "bin"
    }},
    {$group:{_id:'$bin.typology',total_kg:{$sum:'$kg'},month_min:{$min:'$createdAt'}}},
    {$lookup:{
        from:'Typology',
        localField: '_id',
        foreignField: '_id',
        as: "typology"
    }},
    {$project:{
      bin_typology: "$typology.name",
      total_kg: '$total_kg',
      month:{$dateDiff:
        {
          startDate:"$month_min",
          endDate:adjustedDate,
          unit:"month"
        }
      }
    }}
  ])

  const res2 = depositTotal.map(element =>[element.bin_typology[0],(element.total_kg)/(element.month)])
  const list=['carta', 'plastica e lattine', 'vetro', 'sfralci e potature', 'organico', 'indifferenziata','olio']
  
  
  res1.forEach(e => {
    index=list.indexOf(e[0])
    final1[index]=e[1]
  });
  res2.forEach(e => {
    index=list.indexOf(e[0])
    final2[index]=e[1]
  });

  
  return [final1,final2]

        
}

module.exports = {
  generalData,
  userData
}
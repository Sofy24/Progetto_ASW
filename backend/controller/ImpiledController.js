const Deposit = require('../model/Deposit');
const Typology = require('../model/Typology');
const Bins = require('../model/Bin');


async function generalData(){
  const current =new Date()
  var year = current.getFullYear()
  var month = current.getMonth()
  var dates = []
  var final=[[]]
  var monthArray = ['','','','','','','','','','','','']

  



  const timezoneOffset = new Date().getTimezoneOffset() + 120; // GMT+2:00 (2 hours ahead of GMT)
  const currentDate = new Date(year,month,01);
  const adjustedDate = new Date(currentDate.getTime() + timezoneOffset * 60 * 1000);
  
  const tm = adjustedDate.getMonth()

  for(var x =0;x<12;x++){
    dates[x]=x+tm-11

  }
  const list=['carta', 'plastica e lattine', 'vetro', 'sfralci e potature', 'organico', 'indifferenziata','olio']
  var y=0
  list.forEach(e=>{
    final[y]=[0,0,0,0,0,0,0,0,0,0,0,0]
    y++
  })

  
  for(var i =0;i<12;i++)
  {
    var d = dates[i]
    const startDate = new Date(year,d,01);
    const adjustedStartDate = new Date(startDate.getTime() + timezoneOffset * 60 * 1000);

    const endDate = new Date(year,d+1,01);
    const adjustedEndDate = new Date(endDate.getTime() + timezoneOffset * 60 * 1000);

    monthArray[i]= adjustedStartDate.toLocaleString('default', { month: 'long' }) + " "+adjustedStartDate.getFullYear()
   
    const depositThisMonth = await Deposit.aggregate([
      {$match: {createdAt:{ $gte : adjustedStartDate}}},
      {$match: {createdAt:{ $lt : adjustedEndDate}}},
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
      
      res1.forEach(e => {
        index=list.indexOf(e[0])
        final[index][i]=e[1]
      });
      
      
  }
  

  return [final,monthArray]

        
}

async function userData(email){
  userEmail = email
  const current =new Date()
  var year = current.getFullYear()
  var month = current.getMonth()
  var dates = []
  var final=[[]]
  var monthArray = ['','','','','','','','','','','','']

  



  const timezoneOffset = +120; // GMT+2:00 (2 hours ahead of GMT)
  const currentDate = new Date(year,month,01);
  const adjustedDate = new Date(currentDate.getTime() + timezoneOffset * 60 * 1000);
  
  const tm = adjustedDate.getMonth()

  for(var x =0;x<12;x++){
    dates[x]=x+tm-11

  }

  const list=['carta', 'plastica e lattine', 'vetro', 'sfralci e potature', 'organico', 'indifferenziata','olio']
  var y=0
  list.forEach(e=>{
    final[y]=[0,0,0,0,0,0,0,0,0,0,0,0]
    y++
  })

  
  for(var i =0;i<12;i++)
  {
    var d = dates[i]
    const startDate = new Date(year,d,01);
    const adjustedStartDate = new Date(startDate.getTime() + timezoneOffset * 60 * 1000);
    const endDate = new Date(year,d+1,01);
    const adjustedEndDate = new Date(endDate.getTime() + timezoneOffset * 60 * 1000);
    monthArray[i]= adjustedStartDate.toLocaleString('default', { month: 'long' }) + " "+adjustedStartDate.getFullYear()

    const depositThisMonth = await Deposit.aggregate([
      {$lookup:{
        from:'Users',
        localField: 'user',
        foreignField: '_id',
        as: "user"
      }},
      {$match: {"user.email": email}},
      {$match: {createdAt:{ $gte : adjustedStartDate}}},
      {$match: {createdAt:{ $lt : adjustedEndDate}}},
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
      res1.forEach(e => {
        index=list.indexOf(e[0])
        final[index][i]=e[1]
      });
    
  }

  return [final,monthArray]

        
}

module.exports = {
  generalData,
  userData
}
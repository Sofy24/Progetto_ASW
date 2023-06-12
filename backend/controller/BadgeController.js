const Deposit = require('../model/Deposit');
const Report = require('../model/Report');
const User = require('../model/User')
const UserBadges = require('../model/UserBadges')
const Badges = require('../model/Badge');
const Typology = require('../model/Typology');
const ReportController = require('../controller/ReportController');

const handleBadges = async (req, res) => {
       
    const {email, year, month} = req.query;


    userEmail = email
    const current =new Date()
    var dates = []
    var final=[[]]
    var monthArray = ['','','','','','','','','','','','']


    
    const timezoneOffset = new Date().getTimezoneOffset() + 120; // GMT+2:00 (2 hours ahead of GMT)
    const currentDate = new Date(year,month,01);
    //applying timezone offset
    const adjustedDate = new Date(currentDate.getTime() + timezoneOffset * 60000);
    let futureDate;
    //check if month is december
    if ((parseInt(month) + 1) === 12) {
        
        futureDate = new Date((parseInt(year) + 1), 0 , 01);
    } else {
        
        futureDate = new Date(year, (parseInt(month) + 1), 01);
    }
    //applying timezone offset
    const adjustedFutureDate = new Date(futureDate.getTime() + timezoneOffset *60000);

    const tm = adjustedDate.getMonth()

    for(var x =0;x<12;x++){
        dates[x]=tm-x
    }
    var y=0
    
    
    const classicBadges = await Badges.aggregate([
        {$group: {_id:"$name"}}])
    const list = classicBadges.map(elem=>elem._id)
    monthArray.forEach(e=>{
        final[y]=['niente','niente','niente','niente','niente','niente','niente','niente']
        y++
    })
    
    for(var i =0;i<12;i++)
    {
        var d = dates[i]
        const startDate = new Date(year,d-1,01);
        const adjustedStartDate = new Date(startDate.getTime() + timezoneOffset * 60 * 1000);
        const endDate = new Date(year,d,01);
        const adjustedEndDate = new Date(endDate.getTime() + timezoneOffset * 60 * 1000);
        const printDate =new Date(year,d-1,01);
        const adjustedPrintDate = new Date(printDate.getTime() + timezoneOffset * 60 * 1000);
        monthArray[i]= adjustedPrintDate.toLocaleString('default', { month: 'long' }) + " "+adjustedPrintDate.getFullYear()


        
        const badgesThisMonth = await UserBadges.aggregate([
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
                from:'Badges',
                localField: 'badge',
                foreignField: '_id',
                as: "badge"
            }},
            {$match: {"badge.is_multiple": false}}
        ])
        const len = badgesThisMonth.length
        badgesThisMonth.forEach(e=>{
            
        })
        const res1 = badgesThisMonth.map(element =>element.badge[0].name)
        
        
        res1.forEach(e => {
            
            var index=list.indexOf(e)
            
            final[i][index]=e
        });

        
    }
    const specialBadge = await UserBadges.aggregate([
        {$lookup:{
            from:'Users',
            localField: 'user',
            foreignField: '_id',
            as: "user"
        }},
        {$match: {"user.email": email}},
        {$lookup:{
            from:'Badges',
            localField: 'badge',
            foreignField: '_id',
            as: "badge"
        }},
        {$match: {"badge.is_multiple": true}},
        {$group: {_id:"$badge.name",count: {$max: "$badge.repetition"} }}
    ])
    specialBadge.forEach(e=>{
        
    })
    var specialBadgeList = ['niente','niente','niente','niente','niente','niente','niente','niente']

    specialBadge.forEach(e=>{
        
        var idt=list.indexOf(e._id[0])
        specialBadgeList[idt]=(e._id[0]).concat(" ").concat(e.count)
          
    })

   
    res.json([monthArray,final,specialBadgeList])

}


async function createBadges(reportData,email,adjustedDate,adjustedFutureDate) {
    
    const thisUser = await User.findOne({ email: email });
    var must_create_total = true

    
    const depositTotal= await Deposit.aggregate([
        {$match: {createdAt:{ $gte : adjustedDate}}},
        {$match: {createdAt:{ $lt : adjustedFutureDate}}},
        {$lookup:{
          from:'Bins',
          localField: 'bin',
          foreignField: '_id',
          as: "bin"
        }},
        {$lookup:{
            from:'Typology',
            localField: 'bin.typology',
            foreignField: '_id',
            as: "typology"
        }},
        {$group:{_id:{tipo:'$typology.name'},tot_kg:{$sum:'$kg'}}}
    ])
    
    const users = await User.find({})
    const num_user = users.length
    const type = await Typology.find({})
    var waste=type.map(e=>e.name)
    var media =[0,0,0,0,0,0,0]
    
    var partial=depositTotal.map(e=>[e._id.tipo[0],(e.tot_kg)/num_user])
    
    partial.forEach(p=>{
        var id = waste.indexOf(p[0])
        media[id]=p[1]

    })
    
    const waiting = reportData.map(async e=>{
            var typology=waste.indexOf(e[0])
            
            if((e[0]=="indifferenziata" && (e[2]>e[1] || e[1]<media[typology])) ||
            (e[0]!="indifferenziata" && (e[2]<e[1] || e[1]>media[typology]))){
                
                await Badges.findOne({name:e[0],is_multiple: false}).then(async (thisBadge)=>{
                    const badge = new UserBadges({
                        user:thisUser._id,
                        badge: thisBadge._id,
                        createdAt:adjustedDate

                    })
                    await badge.save();
                    
                })
            }else{
                
                must_create_total = false
            }
            return " "

        })
    await Promise.all(waiting)
    
    
    if(must_create_total){
        
        Badges.findOne({name:"tutto", is_multiple: false}).then(async (thisBadge)=>{
            const badge = new UserBadges({
                user:thisUser._id,
                badge: thisBadge._id,
                createdAt:adjustedDate
            })
            
            await badge.save();
            
        })
    }

    const specialBadge = await UserBadges.aggregate([
        {$lookup:{
            from:'Users',
            localField: 'user',
            foreignField: '_id',
            as: "user"
        }},
        {$match: {"user.email": email}},
        {$lookup:{
            from:'Badges',
            localField: 'badge',
            foreignField: '_id',
            as: "badge"
        }},
        {$match: {"badge.is_multiple": false}},
        {$group: {_id:"$badge.name",count: {$sum: 1},data:{$max:"$createdAt"} }},
        {$match: {"data": adjustedDate}}
    ])

    
    var specialBadgeList = []
    const numBadge = await Badges.aggregate([{$match: {is_multiple: true}},{$group: {_id:"$repetition" }}])
    const numList=numBadge.map(e=>e._id)

    specialBadge.forEach(e=>{
       
        numList.forEach(n=>{
            
            if(e.count==n){

               
                Badges.findOne({name:e._id[0],is_multiple: true, repetition:n}).then(async (thisBadge)=>{
                    const badge = new UserBadges({
                        user:thisUser._id,
                        badge: thisBadge._id,
                        createdAt:adjustedDate

                    })
                    await badge.save();
                })
                
            }
        })
        
        
    })
        
}



module.exports = {
    handleBadges,
    createBadges
}    
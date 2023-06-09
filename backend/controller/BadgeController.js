const Deposit = require('../model/Deposit');
const Report = require('../model/Report');
const User = require('../model/User')
//const Typology = require('../model/Typology');
const UserBadges = require('../model/UserBadges')
const Badges = require('../model/Badge');
const Typology = require('../model/Typology');
//const Bins = require('../model/Bin');
const ReportController = require('../controller/ReportController');

const handleBadges = async (req, res) => {
       
    const {email, year, month} = req.query;

    /**charge report */
    await chargeReport(email, year, month)

    

    userEmail = email
    const current =new Date()
    //var year = current.getFullYear()//.toString();
    //var month = current.getMonth()//.toString();
    var dates = []
    //var inside=[]
    var final=[[]]
    var monthArray = ['','','','','','','','','','','','']


    
    const timezoneOffset = new Date().getTimezoneOffset() + 120; // GMT+2:00 (2 hours ahead of GMT)
    const currentDate = new Date(year,month,01);
    //applying timezone offset
    const adjustedDate = new Date(currentDate.getTime() + timezoneOffset * 60000);
    let futureDate;
    //check if month is december
    if ((parseInt(month) + 1) === 12) {
        console.log("dec-jan")
        futureDate = new Date((parseInt(year) + 1), 0 , 01);
    } else {
        console.log("normal")
        futureDate = new Date(year, (parseInt(month) + 1), 01);
    }
    //applying timezone offset
    const adjustedFutureDate = new Date(futureDate.getTime() + timezoneOffset *60000);

    /*
    ReportController.handleMonthlyReport({params: {
        email: email,
        year: year,
        month: month,
    }}).then((res)=>{
        console.log(res)
    })*/

    /*
    ReportController.handleMonthlyReport({ query: { email, year, month } }, {
        json: (response) => {
          console.log(response); // Handle the response from the function
        }
      });
    console.log("pippo"+pippo)*/
    //createBadges(pippo,email,adjustedDate,adjustedFutureDate)



    //const timezoneOffset = new Date().getTimezoneOffset() + 120; // GMT+2:00 (2 hours ahead of GMT)
    //const currentDate = new Date(year,month,01);
    //const adjustedDate = new Date(currentDate.getTime() + timezoneOffset * 60 * 1000);
    
    
    //console.log("mela") 
    //console.log(adjustedDate.getDate);

    const tm = adjustedDate.getMonth()

    //console.log(tm);
    for(var x =0;x<12;x++){
        dates[x]=x+tm-11
        //inside[x]=0
    }

    //console.log("dates")
    //console.log(dates)
    //const list=['carta', 'plastica e lattine', 'vetro', 'potature', 'organico', 'indifferenziata','olio']
    var y=0
    
    
    //console.log(final)
    const classicBadges = await Badges.aggregate([
        {$group: {_id:"$name"}}])
    //console.log('list: '+classicBadges)
    const list = classicBadges.map(elem=>elem._id)
    //console.log('list: '+list)
    monthArray.forEach(e=>{
        final[y]=['niente','niente','niente','niente','niente','niente','niente','niente']
        y++
    })
    
    //console.log(list)
    for(var i =0;i<12;i++)
    {
        var d = dates[i]
        const startDate = new Date(year,d,01);
        const adjustedStartDate = new Date(startDate.getTime() + timezoneOffset * 60 * 1000);
        //console.log(adjustedStartDate)
        const endDate = new Date(year,d+1,01);
        const adjustedEndDate = new Date(endDate.getTime() + timezoneOffset * 60 * 1000);
        //console.log(adjustedEndDate)
        const printDate =new Date(year,d-1,01);
        const adjustedPrintDate = new Date(printDate.getTime() + timezoneOffset * 60 * 1000);
        monthArray[i]= adjustedPrintDate.toLocaleString('default', { month: 'long' }) + " "+adjustedPrintDate.getFullYear()
        //console.log(i)
        //console.log(monthArray)

        
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
        //console.log(badgesThisMonth)
        const len = badgesThisMonth.length
        badgesThisMonth.forEach(e=>{
            /*
            console.log(e)
            console.log(e.badge)
            console.log(e.badge[0].name)
            */
            //console.log(e.badge[0].repetition)
        })
        const res1 = badgesThisMonth.map(element =>element.badge[0].name)
        /*
        console.log("res1")
        console.log(res1)
        console.log(len)
        */
        
        res1.forEach(e => {
            /*
            console.log(list)
            console.log(e)*/
            var index=list.indexOf(e)
            /*console.log(index)
            console.log(i)*/
            final[i][index]=e
        });
        //console.log(final)
        
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
        {$group: {_id:"$badge.name",count: {$sum: 1} }}
    ])

    var specialBadgeList = []
    const numBadge = await Badges.aggregate([{$match: {is_multiple: true}},{$group: {_id:"$repetition" }}])
    const numList=numBadge.map(e=>e._id)
    //console.log(numList)
    specialBadge.forEach(e=>{
        numList.forEach(n=>{
            
            if(e.count>n){
                //console.log(e._id[0])
                //var element = 
                //console.log(element)
                specialBadgeList.push((e._id[0]).concat(" ").concat(n))
            }
           // console.log(n)
            //console.log("SPECIAL "+specialBadgeList)
        })
        
        
    })
    //console.log(specialBadge)

    console.log([monthArray,final,specialBadgeList])
    res.json([monthArray,final,specialBadgeList])

}


async function createBadges(reportData,email,adjustedDate,adjustedFutureDate) {
    //console.log(reportData)
    //console.log(email)
    const thisUser = await User.findOne({ email: email });
    var must_create_total = true

    //console.log("in badge: "+adjustedDate)
    //console.log(adjustedFutureDate)
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
    /*for(var i=0;i<waste.length;i++){
        media[i]=0
    }*/
    //console.log(num_user)
    //console.log("deposit!!!! ")
    //console.log(depositTotal)
    var partial=depositTotal.map(e=>[e._id.tipo[0],(e.tot_kg)/num_user])
    console.log(partial)
    partial.forEach(p=>{
        //console.log(p)
        //console.log(p[0])
        var id = waste.indexOf(p[0])
        //console.log[id]
        media[id]=p[1]

    })
    //console.log(waste)
    //console.log(media)
    reportData.forEach(e=>{
        var typology=waste.indexOf(e[0])
        //console.log(" DEBUG ")
        //console.log(e)
        //console.log(typology)
        //console.log(media)
        if(e[2]<e[1] || e[1]>media[typology]){
            
            Badges.findOne({name:e[0],is_multiple: false}).then(async (thisBadge)=>{
                const badge = new UserBadges({
                    user:thisUser._id,
                    badge: thisBadge._id,
                    createdAt:adjustedDate

                })
                await badge.save();
                //console.log("SALVATO")
                
            })
        }else{
            //console.log("MUST TOTAL FALSE")
            must_create_total = false
        }

    })

    if(must_create_total){
        //console.log("IS TRUE")
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
        {$group: {_id:"$badge.name",count: {$sum: 1} }}
    ])

    var specialBadgeList = []
    const numBadge = await Badges.aggregate([{$match: {is_multiple: true}},{$group: {_id:"$repetition" }}])
    const numList=numBadge.map(e=>e._id)
    //console.log(numList)
    specialBadge.forEach(e=>{
        numList.forEach(n=>{
            
            if(e.count=n){

                Badges.findOne({name:e._id[0],is_multiple: true, repetition:n}).then(async (thisBadge)=>{
                    const badge = new UserBadges({
                        user:thisUser._id,
                        badge: thisBadge._id,
                        createdAt:adjustedDate

                    })
                    await badge.save();
                })
                //console.log(e._id[0])
                //var element = 
                //console.log(element)
                //specialBadgeList.push((e._id[0]).concat(" ").concat(n))
            }
            //console.log(n)
            //console.log("SPECIAL "+specialBadgeList)
        })
        
        
    })
    
}


async function chargeReport(email,year, month){


    //console.log(month)

    const last_report = await Report.aggregate([
        {$sort:{"date.year":-1, "date.month":-1}},
        {$limit:1}
    ]);

    console.log(last_report)

    const last_year = last_report.map(e=>e.date.year)
    const last_month = last_report.map(e=>e.date.month)

    console.log(last_year+" "+last_month)

    const year_offset = (year-last_year)*12

    const offset = year_offset+(month-last_month)

    console.log(year_offset+" "+(month-last_month))
    console.log(offset)
    for (var i=1; i<=(offset);i++){
        try {
            const user = await User.findOne({ email });
            /*const report =*/ await Report.findOne({ user, 'date.month': last_month, 'date.year': last_year });
        } catch (err) {
            try {//if there is no report try to generate one based on deposits 
                const { date: { month: registrationMonth, year: registrationYear } } = await User.findOne({ email }, 'date.month date.year');
                if (registrationYear > year || (registrationYear === year && (registrationMonth) >= month)) {
                    return res.status(400).json({ error: 'asked badges before registration date' });
                    
                }
                /*const quantities =*/ await ReportController.produceReport(email, year, month - 1);
                //res.json(quantities)
            } catch (error) {
                console.error('Error retrieving report:', error);
                res.status(500).json({ error: 'Failed to retrieve report for badges' });
            }
        } 
    }
      
}

module.exports = {
    handleBadges,
    createBadges
}    
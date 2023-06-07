//const Deposit = require('../model/Deposit');
const Report = require('../model/Report');
const User = require('../model/User')
//const Typology = require('../model/Typology');
const UserBadges = require('../model/UserBadges')
const Badges = require('../model/Badges')
//const Bins = require('../model/Bin');


const handleBadges = async (req, res) => {
    
    const {email, year, month} = req.query;
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
    const adjustedDate = new Date(currentDate.getTime() + timezoneOffset * 60 * 1000);
    
    
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
    /*
    list.forEach(e=>{
        final[y]=[0,0,0,0,0,0,0,0,0,0,0,0]
        y++
    })*/
    //console.log(final)
    const classicBadges = await Badges.aggregate([
        {$project:{badge_kind:"$name"}}
    ])

    classicBadges.forEach(elem=>(elem.))
    for(var i =0;i<12;i++)
    {
        var d = dates[i]
        const startDate = new Date(year,d,01);
        const adjustedStartDate = new Date(startDate.getTime() + timezoneOffset * 60 * 1000);
        //console.log(adjustedStartDate)
        const endDate = new Date(year,d+1,01);
        const adjustedEndDate = new Date(endDate.getTime() + timezoneOffset * 60 * 1000);
        //console.log(adjustedEndDate)
        monthArray[i]= adjustedStartDate.toLocaleString('default', { month: 'long' }) + " "+adjustedStartDate.getFullYear()
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
        }}/*,
        {$project:{
            badge_typology: "$badge.name"+"$badge.repetition",
            total_kg: '$total_kg'
        }}*/
        ])
        console.log(badgesThisMonth)
            
        const res1 = badgesThisMonth.map(element =>[element.badge.name,adjustedStartDate,element.badge.repetition])
        console.log("res1")
        console.log(res1)
        
        /*
        res1.forEach(e => {
            index=list.indexOf(e[0])
            final[index][i]=e[1]
        });*/
        //console.log(final)
        
    }
    
    res.json([monthArray])


}
const handleBadges2 = async (req, res) => {
    const {email, year, month} = req.query;
    console.log("params report"+email+year+month);

    var badges
    
    for(var x =1;x<=12;x++){
        monthOffset=(x+month)%12
        yearOffset=Math.floor((x+month)/12)-1
        console.log("mese "+monthOffset)
        console.log(yearOffset)

        //inside[x]=0
        try {
            const user = await User.findOne({ email });
            badges[x-1] = await Report.findOne({ user, 'date.month': monthOffset, 'date.year': year+yearOffset });
            
        }catch (error) {}
        
    }
    console.log("direct "+badges);
    res.json(badges.quantities)
      /*
    try {
        const user = await User.findOne({ email });
        const report = await Report.findOne({ user, 'date.month': month, 'date.year': year });
        console.log("direct "+report);
        res.json(report.quantities)
    } 
        
        catch (error) {
        try {//if there is no report try to generate one based on deposits 
            const { date: { month: registrationMonth, year: registrationYear } } = await User.findOne({ email }, 'date.month date.year');
            if (registrationYear > year || (registrationYear === year && (registrationMonth) >= month)) {
                return res.status(400).json({ error: 'asked report before registration date' });
            }
            const quantities = await produceReport(email, year, month - 1);
            res.json(quantities)
        } catch (error) {
            console.error('Error retrieving report:', error);
            res.status(500).json({ error: 'Failed to retrieve report' });
        }
    }   */
};

async function produceReport(email, year, month) {
    try {
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
        console.log(month + "  "+year)
        console.log("DATE: "+ currentDate + "---" + futureDate)
        console.log("DATE: "+ adjustedDate + "---" + adjustedFutureDate)
        //deposit in ended month
        const depositEndedMonth = await Deposit.aggregate([
            {$lookup:{
                from:'Users',
                localField: 'user',
                foreignField: '_id',
                as: "user"
            }},
            {$match: {"user.email": email}},
            {$match: {createdAt:{ $gte : adjustedDate}}},
            {$match: {createdAt:{ $lt : adjustedFutureDate}}},
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

        const dataEndedMonth = depositEndedMonth.map(element =>[element.bin_typology[0], element.total_kg])
        
        let lastDate;
        //check if month is january
        if ((month - 1) === -1) {
            lastDate = new Date((year - 1), 11 , 01);
        } else {
            lastDate = new Date(year, (month - 1), 01);
        }
        //applying timezone offset
        const adjustedLastDate = new Date(lastDate.getTime() + timezoneOffset * 60 * 1000);
        console.log("DATE: "+ adjustedDate + "---" + adjustedLastDate)
        //deposit last month
        const depositLastMonth= await Deposit.aggregate([
            {$lookup:{
                from:'Users',
                localField: 'user',
                foreignField: '_id',
                as: "user"
            }},
            {$match: {"user.email": email}},
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
        const dataLastMonth = depositLastMonth.map(element =>[element.bin_typology[0],element.total_kg])

        const typologies = await Typology.find({}, 'name');
        const typologiesData = typologies.map(typology => [typology.name, 0, 0]);
        console.log(typologiesData);
        console.log("DATA LAST MONTH "+dataEndedMonth)
        
        //add data previously retrieved
        dataEndedMonth.forEach(e => {
            console.log(e[0], e[1])
            if (e[0] != undefined) {
                index=typologiesData.findIndex(item => item[0] === e[0]);
                typologiesData[index][1] = e[1]
            }
        });
        dataLastMonth.forEach(e => {
            if (e[0] != undefined) {
                index=typologiesData.findIndex(item => item[0] === e[0]);
                typologiesData[index][2] = e[1]
            }
        });
        
        console.log(typologiesData);

        // Save the user document to the database for future request 
        const user = await User.findOne({ email });
        if (user != null ) {
            const report = new Report({
                user,
                date: {
                    month: month + 1,
                    year,
                },
                quantities : typologiesData  
            });
            await report.save();
        }
        return typologiesData;
    } catch(error) {
        throw error;
    }
}

module.exports = {
    handleBadges
}    
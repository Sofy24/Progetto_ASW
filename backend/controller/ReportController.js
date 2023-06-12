const Deposit = require('../model/Deposit');
const Report = require('../model/Report');
const User = require('../model/User')
const Typology = require('../model/Typology');
const Bins = require('../model/Bin');
const BadgeController = require('../controller/BadgeController');

const handleMonthlyReport = async (req, res) => {
    const {email, year, month} = req.query;

    
    try {
        await chargeReport(email, year, month);
        
        const user = await User.findOne({ email });
        const report = await Report.findOne({ user, 'date.month': month, 'date.year': year });
        
        res.json(report.quantities)
    } catch (err) {
        try {//if there is no report try to generate one based on deposits 
            const { date: { month: registrationMonth, year: registrationYear } } = await User.findOne({ email }, 'date.month date.year');
           
            if (registrationYear > year || (registrationYear == year && (registrationMonth) > month)) {
                
                return res.status(400).json({ error: 'asked report before registration date' });
            }
            const quantities = await produceReport(email, year, month - 1);
            res.json(quantities)
        } catch (error) {
            console.error('Error retrieving report:', error);
            res.status(500).json({ error: 'Failed to retrieve report' });
        }
    }   
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
          
            futureDate = new Date((parseInt(year) + 1), 0 , 01);
        } else {
         
            futureDate = new Date(year, (parseInt(month) + 1), 01);
        }
        //applying timezone offset
        const adjustedFutureDate = new Date(futureDate.getTime() + timezoneOffset *60000);

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

        
        //add data previously retrieved
        dataEndedMonth.forEach(e => {
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


        await BadgeController.createBadges(typologiesData,email,adjustedDate,adjustedFutureDate)

        return typologiesData;
    } catch(error) {
        throw error;
    }
}

//load all report that can be created from last seen or first month
async function chargeReport(email,year, month){

    const last_report = await Report.aggregate([
        {$sort:{"date.year":-1, "date.month":-1}},
        {$limit:1}
    ]);

    let last_year = last_report.map(e=>e.date.year)
    let last_month = last_report.map(e=>e.date.month)

    if (last_report.length == 0) {
        const user = await User.findOne({ email });
        
        last_year = user.date.year;
        last_month = user.date.month;
    }

    if (month == last_month && year == last_year) {
       
        return;
    }
    const year_offset = (year-last_year)*12

    const offset = year_offset+(month-last_month)


    let iyear = last_year;
    for (let imonth = last_month; imonth <= month || year != iyear ; imonth++) {
        if (imonth > 12) {
            imonth = 1; // Reset month to January
            iyear++; // Increment year by 1
        }
        await produceReport(email, iyear, imonth - 1);
    } 
}


module.exports = {
    handleMonthlyReport
}    
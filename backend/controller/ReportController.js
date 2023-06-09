const Deposit = require('../model/Deposit');
const Report = require('../model/Report');
const User = require('../model/User')
const Typology = require('../model/Typology');
const Bins = require('../model/Bin');
const BadgeController = require('../controller/BadgeController');

const handleMonthlyReport = async (req, res) => {
    const {email, year, month} = req.query;
    console.log("params report"+email+year+month);
    try {
        const user = await User.findOne({ email });
        const report = await Report.findOne({ user, 'date.month': month, 'date.year': year });
        console.log("direct "+report);
        res.json(report.quantities)
    } catch (err) {
        try {//if there is no report try to generate one based on deposits 
            const { date: { month: registrationMonth, year: registrationYear } } = await User.findOne({ email }, 'date.month date.year');
            console.log("SESSO ASSOLUTO: "+ registrationMonth + " "+ month)
            if (registrationYear > year || (registrationYear == year && (registrationMonth) > month)) {
                console.log("NONONONO")
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

        console.log("in report: "+adjustedDate)


        await BadgeController.createBadges(typologiesData,email,adjustedDate,adjustedFutureDate)

        return typologiesData;
    } catch(error) {
        throw error;
    }
}

module.exports = {
    handleMonthlyReport
}    
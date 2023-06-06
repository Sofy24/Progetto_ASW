const Deposit = require('../model/Deposit');
const Typology = require('../model/Typology');
const Bins = require('../model/Bin');

const handleMonthlyReport = async (req, res) => {
    try {
        const {email, year, month} = req.query;
        console.log("params report"+email+year+month);
        res.json("params report"+email+year+month);
    } catch {
        console.error('Error retrieving report:', error);
        res.status(500).json({ error: 'Failed to retrieve report' });
    }
};

module.exports = {
    handleMonthlyReport
}    
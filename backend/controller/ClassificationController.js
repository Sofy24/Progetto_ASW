const Bin = require('../model/Bin');
const Deposit = require('../model/Deposit');
const { ObjectId } = require('mongodb');
const currentDate = new Date();
const previousMonth = currentDate.getMonth(); // months are zero-based (0 - 11)
const currentYear = currentDate.getFullYear();


const handleClassification = async (req, res) => {
    const createdAtFiltered = await (await Deposit.find({}, { createdAt: 1 })).filter(d => d.createdAt.getMonth() === (previousMonth - 1) && d.createdAt.getFullYear() === currentYear);
    const idIndifferenziata = new ObjectId('648437bac62e21f98afdf7fe');
    const indifByMunicip = await Bin.aggregate([ 
        {
            $lookup: {
              from: "Deposit",
              localField: "_id",
              foreignField: "bin",
              as: "deposit"
            }
        },
        {
            $group: {
              _id: "$municipality",
              bins: { $push: "$$ROOT" }
            }
        },
        { $unwind: "$bins" },
        {
            $group: {
              _id: "$bins.typology",
              bins: { $push: "$$ROOT" }
            }
        },
        {
            $match: { _id: idIndifferenziata }
        }
      ]);
      const getDeposit = await Deposit.aggregate([
        {
            $match: {
              "_id": {
                  $in: createdAtFiltered.map(d => d._id)
                }
            }
          }
      ]);
/*{
            $lookup: {
              from: "Deposit",
              localField: "_id",
              foreignField: "bin",
              as: "deposit"
            }
        },*/

    //console.log("create",createdAt);

    if (!indifByMunicip) return res.status(204).json({ 'message': 'The classification is not available' });
    res.json(indifByMunicip);
}

module.exports = {
    handleClassification
}
const Bin = require('../model/Bin');
const { ObjectId } = require('mongodb');

const handleClassification = async (req, res) => {
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

    /*await Bin.aggregate([
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
            _id: "$typology",
            bins: { $push: "$$ROOT" }
          }
        },
        { $unwind: "$bins" },
        {
            $group: {
              _id: "$bins.municipality",
              bins: { $push: "$$ROOT" }
            }
          }
      ]);*/


    if (!indifByMunicip) return res.status(204).json({ 'message': 'The classification is not available' });
    res.json(indifByMunicip);
}

module.exports = {
    handleClassification
}
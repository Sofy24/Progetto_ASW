const Bin = require('../model/Bin');
const Deposit = require('../model/Deposit');
const { ObjectId } = require('mongodb');
const Municipality = require('../model/Municipality');
const currentDate = new Date();
const previousMonth = currentDate.getMonth(); // months are zero-based (0 - 11)
const currentYear = currentDate.getFullYear();


const handleClassification = async (req, res) => {
    const createdAtFiltered = await (await Deposit.find({}, { createdAt: 1 })).filter(d => d.createdAt.getMonth() === previousMonth && d.createdAt.getFullYear() === currentYear);
    const idIndifferenziata = new ObjectId('648437bac62e21f98afdf7fe');
    const getDeposit = await Deposit.aggregate([
        {
            $match: {
              "_id": {
                  $in: createdAtFiltered.map(d => d._id)
                }
            }
          }
      ]);
    const indifByMunicip = await Bin.aggregate([ 
        {
            $lookup: {
            from: "Deposit",
            localField: "_id",
            foreignField: "bin",
            let: { depositIds: "$deposit._id" },
            pipeline: [
                {
                $match: {
                    $expr: {
                    $in: ["$_id", getDeposit.map(d => d._id)]
                    }
                }
                }
            ],
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

      console.log("indifByMunicip", indifByMunicip);
      const difByMunicip = await Bin.aggregate([ 
        {
            $lookup: {
            from: "Deposit",
            localField: "_id",
            foreignField: "bin",
            let: { depositIds: "$deposit._id" },
            pipeline: [
                {
                $match: {
                    $expr: {
                    $in: ["$_id", getDeposit.map(d => d._id)]
                    }
                }
                }
            ],
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
            $match: { _id: {$ne: idIndifferenziata} }
        },
        {
            $group: {
              _id: "$bins.municipality",
              bins: { $push: "$$ROOT" }
            }
        }      
        
      ]);

    if(indifByMunicip.length > 0 && difByMunicip > 0){
        const getActualKGIndiff = indifByMunicip.flatMap(({ _id, bins }) => bins).map(item => [item._id, item.bins.actual_kg]);
        const getActualKGDiff = difByMunicip.map(({ _id, bins }) => [_id, bins]).map(item => [item[0], item[1].reduce((accumulator, obj) => accumulator + obj.bins.actual_kg, 0)]);
        
        const joinedArray = getActualKGDiff.map(([id, diffValue]) => {
            const [_, indiffValue] = getActualKGIndiff.find(([indiffId]) => indiffId.equals(id));
            return [id, diffValue, indiffValue];
        });
    
        const percentageID = joinedArray.map( item => [item[0], item[1] / (item[1] + item[2])]);
    
        const percentage = await Promise.all(percentageID.map(async ([id, value]) => {
            const result = await Municipality.findOne({ _id: id }, {name: 1});
            return [result.name, value? (value * 100).toFixed(3) : 0];
          }));
    
        if (!percentage) return res.json({ 'message': 'The classification is not available' });
        res.json(percentage.sort((a, b) => b[1] - a[1]));
    } else {
        return res.json({ 'message': "There aren't enough data" });
    }
    
}

module.exports = {
    handleClassification
}
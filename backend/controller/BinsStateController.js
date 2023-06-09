const Bin = require('../model/Bin');

const handleBinsState = async (req, res) => {
    const ee = "ciao@gmail.com" //replace value with the one from Vue
    const binState = await Bin.aggregate([
        {
          $lookup: {
            from: "Typology",
            localField: "typology",
            foreignField: "_id",
            as: "typology"
          }
        },
        {
            $lookup: {
              from: "Municipalities",
              localField: "municipality",
              foreignField: "_id",
              as: "municipality"
            }
        },
        {
            $lookup: {
              from: "Users",
              localField: "municipality._id",
              foreignField: "municipality",
              as: "user"
            }
        },
        {
            $match: {
            "user.email": ee
          }
        }
      ]);

    if (!binState) return res.status(204).json({ 'message': 'The current state of the bins is not found' });
    res.json(binState);
}

module.exports = {
    handleBinsState
}
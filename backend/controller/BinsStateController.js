const Bin = require('../model/Bin');

const handleBinsState = async (req, res) => {
    const { email } = req.body;
    console.log("email in handle post", email);
    if (!email) return res.status(204).json({ 'message': 'The email of the user is not found' });
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
            "user.email": email
          }
        }
      ]);

    if (!binState) return res.status(204).json({ 'message': 'The current state of the bins is not found' });
    res.json(binState);
}

module.exports = {
    handleBinsState
}
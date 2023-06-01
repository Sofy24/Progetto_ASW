const Notification = require('../model/Notification');
const handleNewNote = async (req, res) => {
    const sms = await Notification.find();
    if (!sms) return res.status(204).json({ 'message': 'No notification found' });
    res.json(sms);
}
///DON'T DELETE THIS
/*Notification.create({
    "email": "ciao@gmail.com",
        "date": {
            "month": 4,
            "year": 2011
          },
        "category": "plastica",
        "weight": 50,
        "money": 40
});*/



module.exports = {
    handleNewNote
}
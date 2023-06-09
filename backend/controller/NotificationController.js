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
    "isRead": true,
    "text": "This is the text of the message",
    "type": "report"
},
{
    "email": "hey@gmail.com",
    "date": {
        "month": 3,
        "year": 2020
      },
    "isRead": false,
    "text": "This is another message",
    "type": "deposit"
});*/



module.exports = {
    handleNewNote
}
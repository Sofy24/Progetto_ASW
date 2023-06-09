const Notification = require('../model/Notification');
async function handleNewNote(){
    const sms = await Notification.find();
    return sms;
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
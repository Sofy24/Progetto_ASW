const Notification = require('../model/Notification');
async function handleNewNote(){
    const sms = await Notification.find({});
    return sms;
}


module.exports = {
    handleNewNote
}
const Notification = require('../model/Notification');

async function handleNewNote(email){
    const sms = await Notification.find({email: email});
    return sms;
}

async function handleReadNote(id){
    try {
        await Notification.updateOne({ _id: id }, { isRead: true });
        return "Note updated";
        } catch (err) {
        console.log(err);
        return "Error updating note";
        }
}


async function handleGetNotReadNote(email) {
    try {
        const count = await Notification.countDocuments({ isRead: false, email: email });
        return count;
    } catch (err) {
        console.log(err);
        return 0; 
    }
    }


module.exports = {
    handleNewNote,
    handleReadNote,
    handleGetNotReadNote
}
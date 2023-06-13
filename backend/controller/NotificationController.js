const Notification = require('../model/Notification');

//handle to get notification for a specific user
async function handleNewNote(email){
    const sms = await Notification.find({email: email});
    return sms.reverse();
}

//handle to set a notification as "read"
async function handleReadNote(id){
    try {
        await Notification.updateOne({ _id: id }, { isRead: true });
        return "Note updated";
        } catch (err) {
        console.log(err);
        return "Error updating note";
        }
}

//handle to get the number of notifications not read for a specific user
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
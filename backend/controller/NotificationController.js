const Notification = require('../model/Notification');

async function handleNewNote(email){
    const sms = await Notification.find({email: email});
    return sms;
}

async function handleReadNote(id){
    try {
        console.log(id);
        await Notification.updateOne({ _id: id }, { isRead: true });
        return "Note updated";
        } catch (err) {
        console.log(err);
        return "Error updating note";
        }
}

/*const handleNewNote = async (req, res) => {
    const sms = await Notification.find({});
    if (!sms) return res.status(204).json({ 'message': 'Notifications not found' });
    res.json(sms);

}*/


module.exports = {
    handleNewNote,
    handleReadNote
}
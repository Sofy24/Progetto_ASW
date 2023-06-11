const Notification = require('../model/Notification');
async function handleNewNote(email){
    console.log(email);
    const sms = await Notification.find({email: email});

    return sms;
}

/*const handleNewNote = async (req, res) => {
    const sms = await Notification.find({});
    if (!sms) return res.status(204).json({ 'message': 'Notifications not found' });
    res.json(sms);

}*/


module.exports = {
    handleNewNote
}
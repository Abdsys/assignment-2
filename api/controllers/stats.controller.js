const db = require("../models");
const Phones = db.phones;
const Contacts = db.contacts;
const Op = db.Sequelize.Op;

// Calculate stats
exports.calculate = async (req, res) => {
    
    try {
        // Get the number of contacts in the database
        const contactCount = await Contacts.count();

        // Get the number of phone numbers in the database
        const phoneCount = await Phones.count();

        // Get the time of the most recently created contact
        const latestContact = await Contacts.findOne({
            order: [['createdAt', 'DESC']],
            attributes: ['createdAt']
        });

        // Get the oldest contact creation time
        const oldestContact = await Contacts.findOne({
            order: [['createdAt', 'ASC']],
            attributes: ['createdAt']
        });

        // Send the stats in the response
        res.json({
            numberOfContacts: contactCount,
            numberOfPhones: phoneCount,
            latestContactTime: latestContact ? latestContact.createdAt : null,
            oldestContactTime: oldestContact ? oldestContact.createdAt : null
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while calculating stats"
        });
    }
};
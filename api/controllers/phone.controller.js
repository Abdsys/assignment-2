const db = require("../models");
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create phone
exports.create = (req, res) => {
    
    const contactId = req.params.contactId;
    const name = req.body.name;
    const number = req.body.number;

    const newPhone = {
        name: name,
        number: number,
        contactId: contactId
    };

    Phones.create(newPhone)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a new phone number"
            });
        });
};

// Get all phones
exports.findAll = (req, res) => {
    
    const contactId = req.params.contactId;

    Phones.findAll({where: { contactId: contactId }})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while getting the phone number with specific id"
            });
        });
};

// Get one phone by id
exports.findOne = (req, res) => {
  
    const contactId = req.params.contactId;
    const phoneId = req.params.phoneId;

    Phones.findOne({where: { id: contactId, id: phoneId }})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while getting phone number with specified ids"
            });
        });
};

// Update one phone by id
exports.update = (req, res) => {

    const contactId = req.params.contactId;
    const phoneId = req.params.phoneId;

    Phones.update( req.body, { where: { id: contactId, id: phoneId } })
        .then(() => {
            res.send({ message: "Phone number updated successfully. "});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while updating the phone number with the specified ID"
            });
        });
};

// Delete one phone by id
exports.delete = (req, res) => {
    
    const contactId = req.params.contactId;
    const phoneId = req.params.phoneId;

    Phones.destroy({ where: { id: contactId, id: phoneId } })
        .then(() => {
            res.send({ message: "Phone number deleted successfully."});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while deleting the phone number with the specified ID"
            });
        });
};
const db = require("../models");
const Contacts = db.contacts;
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create contact
exports.create = (req, res) => {
    
    const newContact = {
        name: req.body.name,
    };
    
    Contacts.create(newContact)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred in creating the contact"
            });
        });
};

// Get all contacts
exports.findAll = (req, res) => {
    Contacts.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get one contact by id
exports.findOne = (req, res) => {
    
    const contactId = req.params.contactId;

    Contacts.findByPk(contactId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while getting contact with specified id"
            });
        });

};

// Update one contact by id
exports.update = (req, res) => {
    
    const contactId = req.params.contactId;

    Contacts.update( req.body, { where: { id: contactId } })
        .then(() => {
            res.send({ message: "Contact updated successfully. "});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while updating the contact with the specified ID"
            });
        });
};

// Delete one contact by id
exports.delete = (req, res) => {
    
    const contactId = req.params.contactId;

    Contacts.destroy({ where: { id: contactId } })
        .then(() => {
            res.send({ message: "Contact deleted successfully. "});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while deleting the contact with the specified ID"
            });
        });
};

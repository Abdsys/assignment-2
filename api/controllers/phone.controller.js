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
                message: err.message || "Some error occurred while creating a new phone number"
            });
        });
};

// Get one phone by id
exports.findOne = (req, res) => {
  
};

// Update one phone by id
exports.update = (req, res) => {
    
};

// Delete one phone by id
exports.delete = (req, res) => {
    
};
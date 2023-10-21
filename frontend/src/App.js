import { useState, useEffect } from 'react';  // import useEffect
import './App.css';

function App() {
    const [contacts, setContacts] = useState([]);
    const [newContactName, setNewContactName] = useState('');
    const [expandedContact, setExpandedContact] = useState(null);
    const [newContactType, setNewContactType] = useState('');
    const [newContactNumber, setNewContactNumber] = useState('');

    const addContact = () => {
        if (newContactName) {
            setContacts([...contacts, { name: newContactName, numbers: [] }]);
            setNewContactName('');
        }
    };

    const toggleExpandContact = (contact) => {
        if (expandedContact === contact) {
            setExpandedContact(null); // Collapse if it's already expanded
        } else {
            setExpandedContact(contact); // Expand if it's not expanded
        }
    };

    const addPhoneNumber = (contact, event) => {
        event.stopPropagation();
    
        if (newContactType && newContactNumber) {
            const updatedContacts = contacts.map(c => 
                c === contact
                    ? { ...c, numbers: [...c.numbers, { type: newContactType, number: newContactNumber }] }
                    : c
            );
            setContacts(updatedContacts);
            setNewContactType('');
            setNewContactNumber('');
        }
    };

    const deleteContact = (contactToDelete, event) => {
        event.stopPropagation();
        const updatedContacts = contacts.filter(contact => contact !== contactToDelete);
        setContacts(updatedContacts);
        // If the deleted contact was expanded, collapse it
        if (expandedContact === contactToDelete) {
            setExpandedContact(null);
        }
    };

    const deletePhoneNumber = (contact, numberIndex, event) => {
        event.stopPropagation();
        const updatedContacts = contacts.map(c => 
            c === contact
                ? { ...c, numbers: c.numbers.filter((_, idx) => idx !== numberIndex) }
                : c
        );
        setContacts(updatedContacts);
    };

    return (
        <div className="container">
            <h1>Contactor</h1>
            <div className="contact-form">
                <input 
                    type="text" 
                    value={newContactName} 
                    onChange={(e) => setNewContactName(e.target.value)} 
                    placeholder="Name" 
                />
                <button className="create" onClick={addContact}>Create Contact</button>
            </div>
            <div className="contact-list">
                <h2>Contacts</h2>
                <ul>
                    {contacts.map((contact, index) => (
                        <li key={index}>
                            <div onClick={() => toggleExpandContact(contact)}>
                                <span className="contact-name">{contact.name}</span>
                                <button className="delete" onClick={(e) => deleteContact(contact, e)}>Delete</button>
                            </div>
                            {expandedContact === contact && (
                                <div>
                                    <input 
                                        type="text"
                                        value={newContactType}
                                        onChange={(e) => setNewContactType(e.target.value)}
                                        placeholder="Name"
                                    />
                                    <input 
                                        type="text"
                                        value={newContactNumber}
                                        onChange={(e) => setNewContactNumber(e.target.value)}
                                        placeholder="Number"
                                    />
                                    <button onClick={(e) => addPhoneNumber(contact, e)}>Add</button>
                                    <ul>
                                        {contact.numbers.map((num, idx) => (
                                            <li key={idx}>
                                                {num.type}: {num.number} <button className="delete" onClick={(e) => deletePhoneNumber(contact, idx, e)}>Delete</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
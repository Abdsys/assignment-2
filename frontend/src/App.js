import { useState, useEffect } from 'react';  // import useEffect
import './App.css';

function App() {
    const [contacts, setContacts] = useState([]);
    const [newContactName, setNewContactName] = useState("");
    const [selectedContact, setSelectedContact] = useState(null);
    const [phoneType, setPhoneType] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const createContact = () => {
        if (newContactName) {
            setContacts([...contacts, { name: newContactName, numbers: [] }]);
            setNewContactName("");
        }
    };

    const addPhoneNumber = () => {
        const updatedContacts = [...contacts];
        const contact = updatedContacts.find(contact => contact.name === selectedContact);
        contact.numbers.push({ type: phoneType, number: phoneNumber });
        setContacts(updatedContacts);
        setPhoneType("");
        setPhoneNumber("");
    };

    const deleteContact = name => {
        const updatedContacts = contacts.filter(contact => contact.name !== name);
        setContacts(updatedContacts);
    };

    const deletePhoneNumber = (name, number) => {
        const updatedContacts = [...contacts];
        const contact = updatedContacts.find(contact => contact.name === name);
        const updatedNumbers = contact.numbers.filter(num => num.number !== number);
        contact.numbers = updatedNumbers;
        setContacts(updatedContacts);
    };

    return (
        <div className='container'>
            <h1>Contactor</h1>
            <input
                value={newContactName}
                onChange={e => setNewContactName(e.target.value)}
                placeholder="Name"
            />
            <button onClick={createContact}>Create Contact</button>

            {contacts.map(contact => (
                <div key={contact.name}>
                    <h2 onClick={() => setSelectedContact(contact.name)}>{contact.name}</h2>
                    <button onClick={() => deleteContact(contact.name)}>Delete</button>
                    {contact.name === selectedContact && (
                        <div>
                            <input
                                value={phoneType}
                                onChange={e => setPhoneType(e.target.value)}
                                placeholder="Type"
                            />
                            <input
                                value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value)}
                                placeholder="Phone Number"
                            />
                            <button onClick={addPhoneNumber}>Add</button>
                            {contact.numbers.map(num => (
                                <div key={num.number}>
                                    <span>{num.type}</span>
                                    <span>{num.number}</span>
                                    <button onClick={() => deletePhoneNumber(contact.name, num.number)}>Delete</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default App;
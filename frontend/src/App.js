import { useState, useEffect } from 'react';  // import useEffect
import './App.css';

function App() {
    const [contacts, setContacts] = useState([]);
    const [newContactName, setNewContactName] = useState("");
    const [selectedContact, setSelectedContact] = useState(null);
    const [phoneType, setPhoneType] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [stats, setStats] = useState({});
    const [showStats, setShowStats] = useState(false);


    useEffect(() => {
        fetch("http://localhost/api/contacts/")
            .then(response => response.json())
            .then(data => {
                setContacts(data);
                data.forEach(contact => {
                    getPhoneNumber(contact.id);
                });
            })
            .catch(error => console.error("Error fetching contacts:", error));
        getStats();
    }, []);
    
    
    const createContact = () => {
        if (newContactName) {
            fetch("http://localhost/api/contacts/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: newContactName })
            })
            .then(response => response.json())
            .then(data => {
                setContacts(prevContacts => [...prevContacts, data]);
                setNewContactName("");
            })
            .catch(error => console.error("Error creating contact:", error));
        }
    };

    const getPhoneNumber = (contactId) => {
        fetch(`http://localhost/api/contacts/${contactId}/phones`)
        .then(response => response.json())
        .then(data => {
            setContacts(prevContacts => {
                const updatedContacts = [...prevContacts];
                const contact = updatedContacts.find(contact => contact.id === contactId);
                contact.numbers = data;
                return updatedContacts;
            });
        })
        .catch(error => console.error("Error fetching phone numbers:", error));
    };    
    

    const addPhoneNumber = (contactId, type, number) => {
        fetch(`http://localhost/api/contacts/${contactId}/phones`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type, number }),
        })
        .then(res => res.json())
        .then(data => {
            // To get the updated list of phone numbers for the contact
            getPhoneNumber(contactId);
        })
        .catch(error => {
            console.error("Error in adding phone number:", error);
        });
    };
    
    const deleteContact = contactId => {
        fetch(`http://localhost/api/contacts/${contactId}`, {
            method: "DELETE"
        })
        .then(() => {
            setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
        })
        .catch(error => console.error("Error deleting contact:", error));
    };

    const deletePhoneNumber = (contactId, phoneId) => {
        fetch(`http://localhost/api/contacts/${contactId}/phones/${phoneId}`, {
            method: "DELETE"
        })
        .then(() => {
            const updatedContacts = [...contacts];
            const contact = updatedContacts.find(contact => contact.id === contactId);
            contact.numbers = contact.numbers.filter(num => num.id !== phoneId);
            setContacts(updatedContacts);
        })
        .catch(error => console.error("Error deleting phone number:", error));
    };

    const getStats = () => {
        fetch("http://localhost/api/stats")
            .then(res => res.json())
            .then(data => {
                setStats(data);
            })
            .catch(error => {
                console.error("Error fetching stats:", error);
            });
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
                <div key={contact.id}>
                    <h2 onClick={() => setSelectedContact(contact.id)}>{contact.name}</h2>
                    <button onClick={() => deleteContact(contact.id)}>Delete</button>
                    {contact.id === selectedContact && (
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
                            <button onClick={() => addPhoneNumber(contact.id, phoneType, phoneNumber)}>Add</button>
                            {contact.numbers && contact.numbers.map(num => (
                                <div key={num.number}>
                                    <span>{num.type}</span>
                                    <span>{num.number}</span>
                                    <button onClick={() => deletePhoneNumber(contact.id, num.id)}>Delete</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
            <button onClick={() => setShowStats(!showStats)}>View Stats</button>
            
            {showStats && (
                <div className="statistics-container">
                    <h2>Stats</h2>
                    <p><strong>Number of Contacts:</strong> {stats.numberOfContacts || 'Wait..'}</p>
                    <p><strong>Number of Phones:</strong> {stats.numberOfPhones || 'Wait..'}</p>
                    <p><strong>Latest Contact Time:</strong> {stats.latestContactTime || 'Wait..'}</p>
                    <p><strong>Oldest Contact Time:</strong> {stats.oldestContactTime || 'Wait..'}</p>
                    <button onClick={getStats}>Refresh</button>
                </div>
            )}
        </div>
    );
}

export default App;
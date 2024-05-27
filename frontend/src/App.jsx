import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({});

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await fetch("http://localhost:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts);
  };

  // Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContact({});
  };
  const openModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  const openEditModal = (contact) => {
    if (isModalOpen) return;
    setCurrentContact(contact);
    setIsModalOpen(true);
  };
  const onUpdate = () => {
    closeModal();
    fetchContacts();
  };

  return (
    <div className="container mx-auto px-2">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate} />
        <div className="mt-4">
          <button
            onClick={openModal}
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Contact
          </button>
        </div>
        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded shadow-lg relative">
              <button
                onClick={closeModal}
                className="absolute top-0 right-0 m-4"
              >
                <FaTimes size={20} color="red" />
              </button>
              <ContactForm existingContact={currentContact} updateCallback={onUpdate}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

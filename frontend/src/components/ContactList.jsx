import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ContactList = ({ contacts, updateContact, updateCallback }) => {
  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(
        `http://127.0.0.1:5000/delete_contact/${id}`,
        options
      );
      if (response.status === 200) {
        updateCallback();
      } else {
        console.error("Failed to delete contact");
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="max-w-screen-md mx-auto mt-8">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Contacts</h2>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 ">First Name</th>
            <th className="py-2 px-4 ">Last Name</th>
            <th className="py-2 px-4 ">Email</th>
            <th className="py-2 px-4 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id} className="bg-white">
              <td className="py-2 px-4 border border-gray-300">
                {contact.firstName}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                {contact.lastName}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                {contact.email}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                <div className="flex gap-2">
                  <button
                    onClick={() => updateContact(contact)}
                    className="flex items-center px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    <FaEdit className="mr-1" /> Update
                  </button>
                  <button onClick={() => onDelete(contact.id)} className="flex items-center px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    <FaTrashAlt className="mr-1" /> Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;

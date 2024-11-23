import React, { useState } from "react";
import axios from "axios";

const AddLeadForm = ({ onClose, fetchLeads }) => {
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/leads", {
        name: leadName,
        email: leadEmail,
      });
      alert("Lead added successfully!");
      setLeadName("");
      setLeadEmail("");
      fetchLeads(); // Refresh the leads
      onClose();
    } catch (error) {
      console.error("Error adding lead:", error);
      alert("Failed to add lead");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Add Lead</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium">Lead Name</label>
            <input
              type="text"
              value={leadName}
              onChange={(e) => setLeadName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Lead Email</label>
            <input
              type="email"
              value={leadEmail}
              onChange={(e) => setLeadEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLeadForm;

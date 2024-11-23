import React, { useState } from "react";
import axios from "axios";

const AddMailForm = ({ onClose, fetchTemplates }) => {
  const [templateName, setTemplateName] = useState("");
  const [templateSubject, setTemplateSubject] = useState("");
  const [templateBody, setTemplateBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/templates", {
        name: templateName,
        subject: templateSubject,
        body: templateBody,
      });
      alert("Mail template added successfully!");
      setTemplateName("");
      setTemplateSubject("");
      setTemplateBody("");
      fetchTemplates(); // Refresh templates
      onClose();
    } catch (error) {
      console.error("Error adding template:", error);
      alert("Failed to add template");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Add Template</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium">Template Name</label>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Template Subject</label>
            <input
              type="text"
              value={templateSubject}
              onChange={(e) => setTemplateSubject(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Template Body</label>
            <textarea
              value={templateBody}
              onChange={(e) => setTemplateBody(e.target.value)}
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

export default AddMailForm;

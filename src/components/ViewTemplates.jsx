import React from "react";

const ViewTemplates = ({ templates, onClose, loading }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] max-h-[500px] overflow-auto">
      <h2 className="text-xl font-bold mb-4">View Templates</h2>
      <button
        className="absolute top-2 right-2 text-red-500 font-bold"
        onClick={onClose}
      >
        Close
      </button>
      {loading ? (
        <p>Loading templates...</p>
      ) : templates.length === 0 ? (
        <p>No templates available</p>
      ) : (
        templates.map((template) => (
          <div key={template._id} className="border-b py-2">
            <p className="font-bold">{template.name}</p>
            <p>{template.subject}</p>
          </div>
        ))
      )}
    </div>
  </div>
);

export default ViewTemplates;

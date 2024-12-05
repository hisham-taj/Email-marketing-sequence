import React from 'react';

const TemplateSelectModal = ({ templates, loadingTemplates, onTemplateSelect, closeModal }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      <h4>Select a Template</h4>
      {loadingTemplates ? (
        <p>Loading templates...</p>
      ) : templates.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {templates.map((template) => (
            <li
              key={template._id}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #ddd",
              }}
              onClick={() => onTemplateSelect(template)}
            >
              {template.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No templates available.</p>
      )}
      <button
        style={{
          marginTop: "10px",
          padding: "5px 10px",
        }}
        onClick={closeModal}
      >
        Cancel
      </button>
    </div>
  );
};

export default TemplateSelectModal;

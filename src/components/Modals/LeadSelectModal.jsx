import React from 'react';

const LeadSelectModal = ({ leads, loadingLeads, onLeadSelect, closeModal }) => {
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
      <h4>Select a Lead Source</h4>
      {loadingLeads ? (
        <p>Loading leads...</p>
      ) : leads.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {leads.map((lead) => (
            <li
              key={lead._id}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #ddd",
              }}
              onClick={() => onLeadSelect(lead)} // Updated to use `onLeadSelect`
            >
              {lead.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No leads available.</p>
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

export default LeadSelectModal;

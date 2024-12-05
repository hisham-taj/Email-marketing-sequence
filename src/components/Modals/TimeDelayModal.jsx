import React, { useState } from 'react';

const TimeDelayModal = ({ delayAmount, setDelayAmount, delayUnit, setDelayUnit, handleDelaySave, closeModal }) => {
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
      <h4>Set Time Delay</h4>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ marginRight: "10px" }}>Number:</label>
        <input
          type="number"
          value={delayAmount}
          onChange={(e) => setDelayAmount(Number(e.target.value))}
          style={{ width: "50px", padding: "5px", marginRight: "10px" }}
        />
        <label style={{ marginRight: "10px" }}>Unit:</label>
        <select
          value={delayUnit}
          onChange={(e) => setDelayUnit(e.target.value)}
          style={{ padding: "5px" }}
        >
          <option value="minutes">Minutes</option>
          <option value="hours">Hours</option>
          <option value="days">Days</option>
        </select>
      </div>
      <button
        onClick={handleDelaySave}
        style={{
          marginTop: "10px",
          padding: "5px 10px",
        }}
      >
        Save
      </button>
      <button
        onClick={closeModal}
        style={{
          marginTop: "10px",
          padding: "5px 10px",
          marginLeft: "10px",
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default TimeDelayModal;

// client/src/components/SaveButton.js
import React from 'react';
import axios from 'axios';

const SaveButton = ({ flowData }) => {
  const handleSave = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/email/schedule', {
        to: 'recipient@example.com',
        subject: 'Scheduled Email',
        body: 'This is the email body.',
        time: '2024-11-20T09:00:00Z',
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error saving the email flow:', error);
    }
  };

  return (
    <button onClick={handleSave} className="save-button">
      Save & Schedule
    </button>
  );
};

export default SaveButton;

// client/src/components/NodeSelector.jsx
import React from 'react';

const NodeSelector = ({ onAddNode }) => {
  return (
    <div className="node-selector p-4">
      <button className="bg-green-500 text-white p-2 mb-4" onClick={() => onAddNode('Cold Email')}>
        + Add Cold Email
      </button>
      <button className="bg-blue-500 text-white p-2 mb-4 ml-2" onClick={() => onAddNode('Lead Source')}>
        + Add Lead Source
      </button>
    </div>
  );
};

export default NodeSelector;

import React, { useState } from 'react';
import { ReactFlow, Background, Controls, MarkerType, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Initial placeholder nodes and edges
const initialNodes = [
  {
    id: '1',
    position: { x: 300, y: 50 },
    data: { label: '+ Add Lead Source', isPlaceholder: true },
  },
];

const initialEdges = [];

// Available lead sources
const availableLeadSources = ['Test List', 'Email Campaign A', 'Email Campaign B'];

const FlowChart = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [showLeadSourceSelector, setShowLeadSourceSelector] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  // Open Lead Source Selector
  const handleReplaceNode = (nodeId) => {
    setShowLeadSourceSelector(true);
    setSelectedNodeId(nodeId); // Track which node will be replaced
  };

  // Replace Placeholder Node with Selected Lead Source and Add New Placeholder
  const handleLeadSourceSelect = (source) => {
    setShowLeadSourceSelector(false);

    // Replace the placeholder node with the selected lead source
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNodeId
          ? { ...node, data: { label: `Leads from ${source}`, isPlaceholder: false } }
          : node
      )
    );

    // Add a new placeholder node below the replaced node
    const newNodeId = `${nodes.length + 1}`;
    const selectedNode = nodes.find((node) => node.id === selectedNodeId);
    const newNode = {
      id: newNodeId,
      position: { x: selectedNode.position.x, y: selectedNode.position.y + 150 },
      data: { label: '+ Add Next Step', isPlaceholder: true },
    };

    // Add the new placeholder node and connect it with the replaced node
    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [
      ...eds,
      {
        id: `e${selectedNodeId}-${newNodeId}`,
        source: selectedNodeId,
        target: newNodeId,
        type: 'smoothstep',
        markerEnd: { type: MarkerType.Arrow },
      },
    ]);
  };

  // ReactFlow onConnect event handler
  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#f8f9fa' }}>
      <h2 className="text-center p-4">Email Marketing Flow Builder</h2>
      <div style={{ height: '85%', margin: '0 auto', width: '90%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          nodeTypes={{
            customNode: ({ id, data }) => (
              <div
                style={{
                  textAlign: 'center',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: data.isPlaceholder ? '#f0f0f0' : '#fff',
                }}
              >
                <div>{data.label}</div>
                {data.isPlaceholder && (
                  <button
                    style={{
                      marginTop: '8px',
                      padding: '4px 8px',
                      fontSize: '12px',
                      borderRadius: '4px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleReplaceNode(id)}
                  >
                    + Add
                  </button>
                )}
              </div>
            ),
          }}
          fitView
          style={{ background: '#fff' }}
        >
          <Controls />
          <Background />
        </ReactFlow>

        {/* Lead Source Selector */}
        {showLeadSourceSelector && (
          <div
            className="bg-white border rounded shadow p-4 mt-2"
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <h3 className="text-center mb-4">Select Lead Source</h3>
            {availableLeadSources.map((source) => (
              <button
                key={source}
                onClick={() => handleLeadSourceSelect(source)}
                className="block w-full text-left px-4 py-2 mb-2 bg-gray-200 hover:bg-gray-300"
              >
                {source}
              </button>
            ))}
            <button
              onClick={() => setShowLeadSourceSelector(false)}
              className="bg-red-500 text-white px-4 py-2 mt-2 block mx-auto"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlowChart;

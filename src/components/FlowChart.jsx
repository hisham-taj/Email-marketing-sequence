import React from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  MarkerType,
  Background,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

const normalNodeWidth = 100; // Assuming normal node width
const addButtonWidth = 50; // Add button width

const initialNodes = [
  {
    id: "0",
    type: "default",
    data: { label: "+ Add lead source" },
    position: { x: 0, y: 0 },
    draggable: false,
    style: { height: 70, width: normalNodeWidth },
  },
  {
    id: "1",
    type: "default",
    data: { label: "Starting point" },
    position: { x: 0, y: 130 },
    draggable: false,
    style: { height: 30, width: normalNodeWidth },
  },
  {
    id: "add-button",
    type: "default",
    data: { label: "+" },
    position: { x: 0, y: 230 }, // Placeholder position
    draggable: false,
    style: { width: addButtonWidth, textAlign: "center" },
  },
];

const initialEdges = [
  {
    id: "edge-0-1",
    source: "0",
    target: "1",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "edge-1-add-button", // Edge from the last node to the add-button
    source: "1",
    target: "add-button",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

let id = 2; // Starting ID for dynamically added nodes
const getId = () => `${id++}`;

const FlowChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleAddButtonClick = () => {
    const lastNode = nodes[nodes.length - 2]; // Last actual node before the add-button
    const addButton = nodes[nodes.length - 1]; // Current add-button node

    const newNode = {
      id: getId(),
      type: "default",
      data: { label: `Node ${id}` },
      position: { x: lastNode.position.x, y: lastNode.position.y + 70 },
      draggable: false,
      style: { width: normalNodeWidth },
    };

    const updatedAddButton = {
      ...addButton,
      position: {
        x: lastNode.position.x + (normalNodeWidth - addButtonWidth) / 2, // Centered horizontally
        y: newNode.position.y + 50,
      },
    };

    setNodes((nds) => [
      ...nds.slice(0, -1), // Remove old add-button
      newNode,
      updatedAddButton, // Add updated add-button
    ]);

    setEdges((eds) => [
      ...eds,
      {
        id: `edge-${lastNode.id}-${newNode.id}`,
        source: lastNode.id,
        target: newNode.id,
        markerEnd: { type: MarkerType.ArrowClosed },
      },
      {
        id: `edge-${newNode.id}-${updatedAddButton.id}`,
        source: newNode.id,
        target: updatedAddButton.id,
        markerEnd: { type: MarkerType.ArrowClosed },
      },
    ]);
  };

  const handleNodeClick = (event, node) => {
    if (node.id === "add-button") {
      handleAddButtonClick();
    }
  };

  // Adjust "add-button" position dynamically during the initial render
  React.useEffect(() => {
    const lastNode = nodes[nodes.length - 2]; // Last actual node
    const addButton = nodes[nodes.length - 1]; // Current add-button

    const updatedAddButton = {
      ...addButton,
      position: {
        x: lastNode.position.x + (normalNodeWidth - addButtonWidth) / 2, // Centered horizontally
        y: lastNode.position.y + 50,
      },
    };

    setNodes((nds) => [...nds.slice(0, -1), updatedAddButton]); // Update the nodes list
  }, [nodes, setNodes]);

  const onInit = (reactFlowInstance) => {
    reactFlowInstance.setViewport({ x: 300, y: 50, zoom: 1 }); // Set initial zoom level and position
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        border: "1px solid #ddd",
        borderRadius: "4px",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onInit={onInit} // Initialize with zoom
      >
        <Background gap={10} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowChart

import React, { useState, useEffect } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  MarkerType,
  Background,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import LeadSelectModal from "./Modals/LeadSelectModal";
import TemplateSelectModal from "./Modals/TemplateSelectModal";
import TimeDelayModal from "./Modals/TimeDelayModal";
import {
  normalNodeWidth,
  addButtonWidth,
  addButtonStyle,
  nodeStyle,
  initialNodes,
  initialEdges,
} from "../constants/constants";
import useFlowChart from "../hooks/useFlowChart";

const FlowChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showModal, setShowModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showDelayModal, setShowDelayModal] = useState(false);
  const [nodeIndex, setNodeIndex] = useState(0);

  const {
    leads,
    templates,
    fetchLeads,
    fetchTemplates,
    delayAmount,
    setDelayAmount,
    delayUnit,
    setDelayUnit,
  } = useFlowChart();

  const nodeSequence = ["Select Template", "Time Delay"];

  const getId = () => `${nodes.length + 1}`;

  const onInit = (reactFlowInstance) => {
    reactFlowInstance.setViewport({ x: 300, y: 50, zoom: 1 });
  };

  const handleLeadSelect = (selectedLead) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === "0"
          ? { ...node, data: { ...node.data, label: selectedLead.name } }
          : node
      )
    );
    setShowModal(false);
    console.log("slctd lead:",selectedLead);
    
  };

  const handleTemplateSelect = (selectedTemplate) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.data.label === "Select Template"
          ? { ...node, data: { ...node.data, label: selectedTemplate.name } }
          : node
      )
    );
    setShowTemplateModal(false);
    console.log("slctd tmplte:",selectedTemplate);

  };

  const handleDelaySave = () => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.data.label === "Time Delay"
          ? {
              ...node,
              data: {
                ...node.data,
                label: `Delay: ${delayAmount} ${delayUnit}`,
              },
            }
          : node
      )
    );
    setShowDelayModal(false);
    console.log("slctd delay:",delayAmount);
    console.log("slctd unit:",delayUnit);
    
  };

  const handleAddButtonClick = () => {
    if (nodeIndex >= nodeSequence.length) {
      alert("No more nodes to add!");
      return;
    }

    const lastNode = nodes[nodes.length - 2];
    const addButton = nodes[nodes.length - 1];

    const newNode = {
      id: getId(),
      type: "default",
      data: { label: nodeSequence[nodeIndex] },
      position: { x: lastNode.position.x, y: lastNode.position.y + 100 },
      draggable: false,
      style: { width: normalNodeWidth, ...nodeStyle },
    };

    const updatedAddButton = {
      ...addButton,
      position: {
        x: lastNode.position.x + (normalNodeWidth - addButtonWidth) / 2,
        y: newNode.position.y + 70,
      },
    };

    setNodes((nds) => [...nds.slice(0, -1), newNode, updatedAddButton]);

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

    setNodeIndex((prevIndex) => prevIndex + 1);
  };

  const handleNodeClick = (event, node) => {
    if (node.id === "add-button") {
      handleAddButtonClick();
    } else if (node.id === "0") {
      setShowModal(true);
      fetchLeads();
    } else if (node.data.label === "Select Template") {
      setShowTemplateModal(true);
      fetchTemplates();
    } else if (node.data.label === "Time Delay") {
      console.log("opening timedelaymodal...");

      setShowDelayModal(true);
    }
  };

  // Function to handle scheduling
  const handleSaveAndSchedule = async () => {
    try {
      // Get the selected nodes and validate them
      const leadNode = leads.find((lead) => lead.isSelected);
      const templateNode = templates.find((template) => template.isSelected);

      if (!leadNode || !templateNode) {
        alert("Please select a lead and a template before scheduling.");
        return;
      }

      // Prepare payload
      const payload = {
        to: leadNode.email,
        subject: templateNode.subject || "Default Subject",
        body: templateNode.body || "Default Body",
        scheduleTime: scheduleTime ? new Date(scheduleTime).toISOString() : new Date().toISOString(),
      };

      // Send the data to your API
      const response = await fetch("http://localhost:5000/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Email scheduled successfully!");
      } else {
        const result = await response.json();
        alert(`Failed to schedule email: ${result.error}`);
      }
    } catch (error) {
      console.error("Error scheduling email:", error);
      alert("An error occurred while scheduling the email.");
    }
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
        onInit={onInit}
      >
        <Background gap={10} />
        <Controls />
      </ReactFlow>

      {showModal && (
        <LeadSelectModal
          leads={leads}
          loadingLeads={false}
          onLeadSelect={handleLeadSelect}
          onClose={() => setShowModal(false)}
        />
      )}

      {showTemplateModal && (
        <TemplateSelectModal
          templates={templates}
          loadingTemplates={false}
          onTemplateSelect={handleTemplateSelect}
          onClose={() => setShowTemplateModal(false)}
        />
      )}

      {showDelayModal && (
        <TimeDelayModal
          delayAmount={delayAmount}
          setDelayAmount={setDelayAmount}
          delayUnit={delayUnit}
          setDelayUnit={setDelayUnit}
          handleDelaySave={handleDelaySave}
          closeModal={() => setShowDelayModal(false)}
        />
      )}

    </div>
  );
};

export default FlowChart;

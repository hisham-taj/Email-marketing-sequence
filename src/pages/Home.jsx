import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import FlowChart from "../components/FlowChart";
import AddLeadForm from "../components/AddLeadForm";
import AddTemplate from "../components/AddTemplates";
import ViewLeads from "../components/ViewLeads";
import ViewTemplates from "../components/ViewTemplates";
import DatePicker from "react-datepicker"; // Importing date picker
import "react-datepicker/dist/react-datepicker.css"; // Style for the date picker
import useFlowChart from "../hooks/useFlowChart"; // Import the hook

const Home = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [scheduleTime, setScheduleTime] = useState(null); // For storing the scheduled time

  const {
    leads,
    templates,
    fetchLeads,
    fetchTemplates,
    delayAmount,
    setDelayAmount,
    delayUnit,
    setDelayUnit,
  } = useFlowChart(); // Use the custom hook

  useEffect(() => {
    fetchLeads();
    fetchTemplates();
  }, [fetchLeads, fetchTemplates]);

  const handleSaveAndSchedule = async () => {
    try {
      const leadNode = leads.find((lead) => lead.isSelected);
      const templateNode = templates.find((template) => template.isSelected);

      if (!leadNode || !templateNode) {
        alert("Please select a lead and a template before scheduling.");
        return;
      }

      const payload = {
        to: leadNode.email,
        subject: templateNode.subject || "Default Subject",
        body: templateNode.body || "Default Body",
        scheduleTime: scheduleTime
          ? new Date(scheduleTime).toISOString()
          : new Date().toISOString(),
      };

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
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-lg font-bold mt-4">Email Marketing Sequence</h1>
      <Navbar
        onAddLeadClick={() => setActiveModal("addLead")}
        onAddMailClick={() => setActiveModal("addTemplate")}
        onViewLeadsClick={() => setActiveModal("viewLeads")}
        onViewTemplatesClick={() => setActiveModal("viewTemplates")}
        onSaveAndScheduleClick={handleSaveAndSchedule}
      />
      <div className="w-3/4 h-3/4 bg-white shadow-lg rounded-lg mt-4">
        <FlowChart
          leads={leads}
          templates={templates}
          delayAmount={delayAmount}
          setDelayAmount={setDelayAmount}
          delayUnit={delayUnit}
          setDelayUnit={setDelayUnit}
          scheduleTime={scheduleTime}
          setScheduleTime={setScheduleTime}
        />
      </div>
      <div className="mt-4">
        <label className="text-lg">Schedule Time:</label>
        <DatePicker
          selected={scheduleTime}
          onChange={(date) => setScheduleTime(date)}
          showTimeSelect
          dateFormat="Pp"
        />
      </div>
      {activeModal === "addLead" && (
        <AddLeadForm
          onClose={() => setActiveModal(null)}
          fetchLeads={fetchLeads}
        />
      )}
      {activeModal === "addTemplate" && (
  <AddTemplate
    onClose={() => setActiveModal(null)}
    fetchTemplates={fetchTemplates} // Pass the function here
  />
)}

      {activeModal === "viewLeads" && (
        <ViewLeads
          onClose={() => setActiveModal(null)}
          leads={leads}
        />
      )}
      {activeModal === "viewTemplates" && (
        <ViewTemplates
          onClose={() => setActiveModal(null)}
          templates={templates}
        />
      )}
    </div>
  );
};

export default Home;

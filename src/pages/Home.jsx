import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import FlowChart from "../components/FlowChart"
import axios from "axios";
import AddLeadForm from "../components/AddLeadForm";
import AddTemplate from "../components/AddTemplates";
import ViewLeads from "../components/ViewLeads";
import ViewTemplates from "../components/ViewTemplates";

const Home = () => {
  const [showAddLeadForm, setShowAddLeadForm] = useState(false);
  const [showAddMailForm, setShowAddMailForm] = useState(false);
  const [showLeadsModal, setShowLeadsModal] = useState(false);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);

  const [leads, setLeads] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [loadingTemplates, setLoadingTemplates] = useState(true);

  useEffect(() => {
    fetchLeads();
    fetchTemplates();
  }, []);

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const response = await axios.get("http://localhost:5000/api/leads");
      setLeads(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoadingLeads(false);
    }
  };

  const fetchTemplates = async () => {
    setLoadingTemplates(true);
    try {
      const response = await axios.get("http://localhost:5000/api/templates");
      setTemplates(response.data);
    } catch (error) {
      console.error("Error fetching templates:", error);
    } finally {
      setLoadingTemplates(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-lg font-bold mt-4">Email Marketing Sequence</h1>

      <Navbar
        onAddLeadClick={() => setShowAddLeadForm(true)}
        onAddMailClick={() => setShowAddMailForm(true)}
        onViewLeadsClick={() => setShowLeadsModal(true)}
        onViewTemplatesClick={() => setShowTemplatesModal(true)}
      />

      <div className="w-3/4 h-3/4 bg-white shadow-lg rounded-lg mt-4">
        <FlowChart />
      </div>

      {showAddLeadForm && (
        <AddLeadForm onClose={() => setShowAddLeadForm(false)} fetchLeads={fetchLeads} />
      )}
      {showAddMailForm && (
        <AddTemplate onClose={() => setShowAddMailForm(false)} fetchTemplates={fetchTemplates} />
      )}
      {showLeadsModal && (
        <ViewLeads leads={leads} loading={loadingLeads} onClose={() => setShowLeadsModal(false)} />
      )}
      {showTemplatesModal && (
        <ViewTemplates templates={templates} loading={loadingTemplates} onClose={() => setShowTemplatesModal(false)} />
      )}
    </div>
  );
};

export default Home;

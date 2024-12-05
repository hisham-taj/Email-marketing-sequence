import { useState, useCallback } from "react";

const useFlowChart = () => {
  const [leads, setLeads] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [delayAmount, setDelayAmount] = useState(0);
  const [delayUnit, setDelayUnit] = useState("minutes");

  const fetchLeads = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/leads");
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  }, []); // Empty dependency array ensures this function is not recreated

  const fetchTemplates = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/templates");
      const data = await response.json();
      setTemplates(data);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  }, []); // Empty dependency array ensures this function is not recreated

  return {
    leads,
    templates,
    fetchLeads,
    fetchTemplates,
    delayAmount,
    setDelayAmount,
    delayUnit,
    setDelayUnit,
  };
};

export default useFlowChart;

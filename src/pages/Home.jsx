// client/src/pages/Home.jsx
import React from 'react';
import FlowChart from '../components/FlowChart';

const Home = () => {
  return (
    <div>
      <h1 className="text-center text-xl font-bold mt-4">Email Marketing Flow</h1>
      <FlowChart />
    </div>
  );
};

export default Home;

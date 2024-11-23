import React from "react";

const Navbar = ({
  onAddLeadClick,
  onAddMailClick,
  onViewLeadsClick,
  onViewTemplatesClick,
}) => {
  return (
    <div className="w-full flex justify-center space-x-4 mt-4">
      <button
        onClick={onAddLeadClick}
        className="w-[10vw] h-[3rem] bg-green-500 text-white font-semibold rounded-md"
      >
        Add Lead
      </button>
      <button
        onClick={onAddMailClick}
        className="w-[10vw] h-[3rem] bg-blue-500 text-white font-semibold rounded-md"
      >
        Add Template
      </button>
      <button
        onClick={onViewLeadsClick}
        className="w-[10vw] h-[3rem] bg-sky-500 text-white font-semibold rounded-md"
      >
        View Leads
      </button>
      <button
        onClick={onViewTemplatesClick}
        className="w-[10vw] h-[3rem] bg-purple-500 text-white font-semibold rounded-md"
      >
        View Templates
      </button>
    </div>
  );
};

export default Navbar;

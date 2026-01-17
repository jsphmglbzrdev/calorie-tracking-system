import React from "react";

const AddEntryButton = ({isModalOpen, setIsModalOpen}) => {
  return (
    <button onClick={() => setIsModalOpen(!isModalOpen)} className="fixed right-2 bottom-2 text-sm cursor-pointer rounded-md bg-green-600 py-2 px-5 text-white transition-all duration-100 hover:bg-green-700">
      Add Entry
    </button>
  );
};

export default AddEntryButton;

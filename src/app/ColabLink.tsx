import React from "react";

const ColabLink: React.FC = () => {
  return (
    <div className="flex justify-center p-8">
      <a
        href="https://colab.research.google.com/drive/1xxxXYz"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700"
      >
        Open Google Colab Notebook
      </a>
    </div>
  );
};

export default ColabLink;

import React from "react";

const ColabLink: React.FC = () => {
  return (
    <div className="flex justify-center p-8">
      <a
        href="https://colab.research.google.com/drive/1xxxXYz"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
      >
        Open Google Colab Notebook
      </a>
    </div>
  );
};

export default ColabLink;

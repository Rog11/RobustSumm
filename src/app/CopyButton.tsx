"use client";
import React, { useState } from "react";

interface CopyButtonProps {
  code: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copyCodeToClipboard}
      className="px-3 py-1 bg-gray-200 text-gray-800 font-semibold rounded-md shadow hover:bg-gray-300"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
};

export default CopyButton;

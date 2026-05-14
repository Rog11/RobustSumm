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
      className="btn btn-sm btn-outline"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
};

export default CopyButton;

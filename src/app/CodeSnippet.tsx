"use client";
import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-python.min";

type CodeSnippetProps = {
  code: string;
  language: string;
};

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, language }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <pre
      className={`language-${language} bg-base-200 text-base-content p-4 rounded-lg shadow-md`}
    >
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
};

export default CodeSnippet;

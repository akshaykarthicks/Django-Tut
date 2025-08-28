import React, { useState } from 'react';

interface CodeBlockProps {
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-gray-950 rounded-lg overflow-hidden relative border border-gray-700">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 px-3 py-1 text-xs font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre className="p-4 text-sm text-gray-200 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
};
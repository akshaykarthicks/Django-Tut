import React, { useState, useEffect, useRef } from 'react';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';

hljs.registerLanguage('python', python);

interface CodeBlockProps {
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code]);

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
      <pre className="p-4 text-sm overflow-x-auto">
        <code ref={codeRef} className="python">{code}</code>
      </pre>
    </div>
  );
};
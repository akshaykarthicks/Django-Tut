import React from 'react';
import type { GeminiResponse } from '../types';
import { LoadingSkeleton } from './LoadingSkeleton';
import { CodeBlock } from './CodeBlock';

interface ResponseDisplayProps {
  isLoading: boolean;
  response: GeminiResponse | null;
}

interface ParsedSection {
  title: string;
  content: string;
}

const parseResponseText = (text: string): ParsedSection[] => {
  if (!text) return [];
  const sections = text.split(/(?=## )/g).filter(s => s.trim() !== '');
  return sections.map(section => {
    const parts = section.replace(/^## /, '').split('\n');
    const title = parts[0].trim();
    const content = parts.slice(1).join('\n').trim();
    return { title, content };
  });
};

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const renderInline = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="bg-gray-800 text-gray-300 px-1.5 py-1 rounded-md text-sm font-mono">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  const blocks = content.split('\n\n').filter(block => block.trim() !== '');

  return (
    <>
      {blocks.map((block, index) => {
        const lines = block.split('\n');
        
        const isUnorderedList = lines.every(line => /^\s*[-*]\s/.test(line));
        const isOrderedList = lines.every(line => /^\s*\d+\.\s/.test(line));

        if (isUnorderedList) {
          return (
            <ul key={index} className="list-disc list-inside space-y-2 mb-4 text-gray-300 leading-relaxed">
              {lines.map((line, i) => (
                <li key={i}>{renderInline(line.replace(/^\s*[-*]\s/, ''))}</li>
              ))}
            </ul>
          );
        }
        if (isOrderedList) {
           return (
            <ol key={index} className="list-decimal list-inside space-y-2 mb-4 text-gray-300 leading-relaxed">
              {lines.map((line, i) => (
                <li key={i}>{renderInline(line.replace(/^\s*\d+\.\s/, ''))}</li>
              ))}
            </ol>
          );
        }
        
        return (
          <p key={index} className="text-gray-300 leading-relaxed mb-4 last:mb-0">
            {lines.map((line, i) => (
              <React.Fragment key={i}>
                {renderInline(line)}
                {i < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </>
  );
};


export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ isLoading, response }) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!response) {
    return null;
  }

  const parsedSections = parseResponseText(response.text);

  return (
    <div className="mt-8 bg-gray-900 border border-gray-700 rounded-lg p-6 animate-fade-in">
      {parsedSections.map((section, index) => {
        const isCodeExample = section.title.toLowerCase().includes('code example');
        const codeContentMatch = section.content.match(/```python\n([\s\S]*?)```/);
        const hasOnlyNoCodeMessage = section.content.trim() === 'No code example is necessary for this query.';

        return (
          <div key={index} className="mb-6 last:mb-0">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">{section.title}</h2>
            {isCodeExample && codeContentMatch ? (
              <CodeBlock code={codeContentMatch[1]} />
            ) : isCodeExample && hasOnlyNoCodeMessage ? (
              <p className="text-gray-400 italic">{section.content}</p>
            ) : (
              <MarkdownRenderer content={section.content} />
            )}
          </div>
        );
      })}

      {response.sources && response.sources.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-700">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Sources</h3>
          <ul className="space-y-2">
            {response.sources.map((source, index) =>
              source.web ? (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-white mt-1">&#10148;</span>
                  <a
                    href={source.web.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-300 underline transition-colors"
                  >
                    {source.web.title}
                  </a>
                </li>
              ) : null
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
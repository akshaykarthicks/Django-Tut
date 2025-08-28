import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-4xl mx-auto text-center py-6 text-gray-500 text-sm">
      <p>
        <a
          href="https://github.com/akshaykarthicks"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-colors"
        >
          GitHub Profile
        </a>
      </p>
    </footer>
  );
};

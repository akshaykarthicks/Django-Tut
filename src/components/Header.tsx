import React from 'react';

const DjangoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-white">
        <path d="M12.804 2.401c-2.31.291-4.015 2.502-4.015 4.881v1.63c0 .825-.336 1.57-.88 2.115-.545.545-1.29.88-2.115.88H4.161c-.34 0-.67.055-.984.156C1.13 12.56.39 14.54.39 16.643c0 2.455 1.096 4.636 2.85 6.012a8.04 8.04 0 005.158 1.944h.023c.278 0 .548-.023.81-.069 2.22-.38 3.86-2.455 3.86-4.793v-1.63c0-.825.336-1.57.88-2.115.545-.545 1.29.88 2.115-.88h1.633c.338 0 .668-.055.98-.156 2.046-.492 2.787-2.474 2.787-4.577 0-2.455-1.096-4.636-2.85-6.012a8.04 8.04 0 00-5.158-1.944h-.023c-.278 0-.548.023-.81.07z" />
    </svg>
);

export const Header: React.FC = () => {
  return (
    <header className="text-center py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-2">
        <DjangoIcon />
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white text-center sm:text-left">
          Django Expert AI
        </h1>
      </div>
      <p className="text-gray-400 text-lg">
        Your AI-powered guide for Django, Django Ninja, and modern web development.
      </p>
    </header>
  );
};
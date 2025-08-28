import React from 'react';

interface SearchFormProps {
  query: string;
  setQuery: (query: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({ query, setQuery, handleSubmit, isLoading }) => {
  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="sm:relative">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., How do I optimize a complex Django query with prefetch_related?"
          className="w-full p-4 sm:pr-32 text-white bg-gray-900 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:border-white focus:outline-none transition-shadow resize-none"
          rows={5}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 sm:absolute sm:top-1/2 sm:right-4 sm:-translate-y-1/2 sm:w-auto flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-accent rounded-md hover:bg-accent-dark disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-accent"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Thinking...
            </>
          ) : (
            'Ask Expert'
          )}
        </button>
      </div>
    </form>
  );
};
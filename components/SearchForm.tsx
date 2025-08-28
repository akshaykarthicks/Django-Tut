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
      <div className="relative">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., How do I optimize a complex Django query with prefetch_related?"
          className="w-full h-32 p-4 pr-32 text-white bg-gray-900 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:border-white focus:outline-none transition-shadow resize-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute top-1/2 right-4 -translate-y-1/2 flex items-center justify-center gap-2 px-6 py-3 font-semibold text-black bg-white rounded-md hover:bg-gray-300 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
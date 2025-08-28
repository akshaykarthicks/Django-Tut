import React, { useState, useCallback } from 'react';
import { Header, SearchForm, ResponseDisplay, Footer } from './components';
import { getDjangoAnswer } from './services/geminiService';
import type { GeminiResponse } from './types';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [response, setResponse] = useState<GeminiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query.trim()) {
      setError('Please enter a question.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await getDjangoAnswer(query);
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? `Failed to get an answer: ${err.message}` : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <main>
          <SearchForm
            query={query}
            setQuery={setQuery}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
          {error && (
            <div className="mt-6 bg-gray-900 border border-gray-700 text-white p-4 rounded-lg">
              <p className="font-bold text-red-400">Error</p>
              <p className="text-gray-300">{error}</p>
            </div>
          )}
          <ResponseDisplay isLoading={isLoading} response={response} />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
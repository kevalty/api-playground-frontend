// src/App.jsx
import React, { useState } from 'react';
import ApiInput from './components/ApiInput';
import JsonResponse from './components/JsonResponse';

function App() {
  const [productId, setProductId] = useState('1');
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetch = async () => {
    if (!productId) return;
    setIsLoading(true);
    setResponse(null);
    setStatus(null);

    try {
      // 👇 CAMBIA ESTA LÍNEA 👇
      const res = await fetch(`https://api-playground-backend-q9hb.onrender.com/api/products/${productId}`);
      const data = await res.json();
      setResponse(data);
      setStatus(res.status);
    } catch (error) {
      setResponse({ error: 'Network Error', message: 'Could not connect to the API server.' });
      setStatus(500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Live API Playground</h1>
          <p className="text-gray-400">Interact with a live API. Enter a product ID and see the real-time JSON response.</p>
        </header>

        <main>
          <ApiInput 
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            onFetch={handleFetch}
            isLoading={isLoading}
          />
          <JsonResponse data={response} status={status} />
        </main>
      </div>
    </div>
  );
}

export default App;
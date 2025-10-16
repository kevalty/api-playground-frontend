// src/components/ApiInput.jsx
import React from 'react';

function ApiInput({ value, onChange, onFetch, isLoading }) {
  return (
    <div className="flex items-center gap-3 bg-gray-800 border border-gray-700 rounded-lg p-2 shadow-inner">
      <span className="text-gray-400 font-medium pl-2">GET</span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Enter product ID (e.g., 1, 2, 3...)"
        className="flex-grow bg-transparent text-gray-200 focus:outline-none"
      />
      <button
        onClick={onFetch}
        disabled={isLoading}
        className="bg-indigo-600 text-white font-bold py-2 px-5 rounded-md transition hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-wait"
      >
        {isLoading ? 'Fetching...' : 'Fetch'}
      </button>
    </div>
  );
}

export default ApiInput;
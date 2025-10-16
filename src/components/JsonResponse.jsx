// src/components/JsonResponse.jsx
import React from 'react';

// A simple function to add color spans to JSON
const syntaxHighlight = (json) => {
  if (typeof json != 'string') {
     json = JSON.stringify(json, undefined, 2);
  }
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      let cls = 'text-green-400'; // number
      if (/^"/.test(match)) {
          if (/:$/.test(match)) {
              cls = 'text-indigo-400'; // key
          } else {
              cls = 'text-emerald-400'; // string
          }
      } else if (/true|false/.test(match)) {
          cls = 'text-purple-400'; // boolean
      } else if (/null/.test(match)) {
          cls = 'text-gray-500'; // null
      }
      return '<span class="' + cls + '">' + match + '</span>';
  });
}

function JsonResponse({ data, status }) {
  if (!data) {
    return (
      <div className="mt-6 p-6 bg-gray-800 border border-gray-700 rounded-lg text-gray-500">
        <p>Response will be displayed here...</p>
      </div>
    );
  }

  const statusColor = status >= 200 && status < 300 ? 'text-green-400' : 'text-red-400';
  const statusText = status >= 200 && status < 300 ? 'OK' : 'Error';

  return (
    <div className="mt-6 bg-gray-900 border border-gray-700 rounded-lg shadow-xl">
      <div className="flex justify-between items-center p-3 bg-gray-800 border-b border-gray-700">
        <span className="font-semibold text-gray-300">Response</span>
        <span className={`font-bold ${statusColor}`}>Status: {status} {statusText}</span>
      </div>
      <pre className="p-6 text-sm overflow-x-auto" dangerouslySetInnerHTML={{ __html: syntaxHighlight(data) }} />
    </div>
  );
}

export default JsonResponse;
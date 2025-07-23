import { useState, useEffect } from 'react';

export function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/files');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const filesData = await response.json();
        setData(filesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <img
            src="/logo.svg"
            alt="BrightHR logo"
            className="mx-auto mb-4 h-12"
          />
          <p className="text-gray-600">Loading files...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <img
            src="/logo.svg"
            alt="BrightHR logo"
            className="mx-auto mb-4 h-12"
          />
          <p className="text-red-600">Error loading files: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <img
            src="/logo.svg"
            alt="BrightHR logo"
            className="mx-auto mb-4 h-12"
          />
          <h1 className="text-2xl font-bold text-gray-900">File Browser</h1>
          <p className="text-lg text-gray-600 mt-4">
            Showing {data.length} files
          </p>
        </div>
      </div>
    </div>
  );
}

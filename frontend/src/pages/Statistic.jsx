import React, { useState, useEffect } from 'react';
import { api } from "../api/axios_api";

const BasePage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await api.get("/statistic");
        setResources(response.data.links);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-900">
      <header className="bg-black/30 backdrop-blur-sm p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center space-x-3">
            <img
              src="logo.svg"
              alt="logo"
              width="50"
              height="50"
              className="w-12 h-12"
            />
          </a>
          <a
            href="/check"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            Вернуться к проверке
          </a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/20">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Список ресурсов</h1>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-white font-semibold">Ссылка</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Процент достоверности</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Голосов</th>
                </tr>
              </thead>
              <tbody>
                {resources.map((resource, index) => (
                  <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-300 hover:text-purple-100 transition-colors truncate max-w-xs block"
                        title={resource.url}
                      >
                        {resource.url}
                      </a>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-semibold ${
                        resource.trust_score >= 0.7 ? 'text-green-400' :
                        resource.trust_score >= 0.4 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {resource.trust_score}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-white/90">
                      {resource.total_votes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasePage;
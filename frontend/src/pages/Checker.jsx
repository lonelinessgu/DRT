import React, { useState } from 'react';
import { api } from "../api/axios_api";
import CustomTextArea from '../ui/CustomTextArea';

const CheckPage = () => {
  const [article, setArticle] = useState('');
  const [source, setSource] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [proof, setProof] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post("/predict", {
        article: article,
        source: source
      });

      const data = response.data;
      setApiResponse(data);
      setProof(data.proof || '');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-900">
      <header className="bg-black/30 backdrop-blur-sm p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
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
            href="/stat"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            Список ресурсов
          </a>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/20">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Проверка статьи</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <CustomTextArea
                label="Текст статьи"
                value={article}
                onChange={(e) => setArticle(e.target.value)}
                placeholder="Вставьте текст статьи в поле для ввода"
                maxRows={12}
                className="min-h-36 text-white placeholder-white/50"
                labelClassName="text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">Ссылка на источник</label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="Ссылка на статью"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {isLoading ? 'Проверяем...' : 'Проверить'}
            </button>
          </form>

          {apiResponse && (
            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-3">Вердикт:</h2>
              <p className="text-lg mb-2">
                <strong className="text-white">Статья </strong>
                <span className={`${apiResponse.predicted_class === 'Фейк' ? 'text-red-400' : 'text-green-400'} font-semibold`}>
                  {apiResponse.predicted_class.toLowerCase()}
                </span>
              </p>
              <p className="text-white/90 mb-3">
                <strong>Вероятность:</strong> {apiResponse.predicted_probability}%
              </p>
              {proof && (
                <div className="bg-gray-700/50 p-3 rounded-md">
                  <p className="text-white">
                    <strong>Доказательство:</strong> <br /> {proof}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckPage;
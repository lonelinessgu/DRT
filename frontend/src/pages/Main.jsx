import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-700">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex flex-col items-center justify-center space-y-6">
            <img
              src="logo.svg"
              alt="SVG Иконка"
              width="100"
              height="100"
              className="w-24 h-24"
            />
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">FactSeeker</h1>
              <p className="text-xl text-purple-200">Инструмент распознавания информации</p>
            </div>
          </div>

          <div className="mt-8">
            <a
              href="/check"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-12 rounded-lg transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
            >
              Перейти к проверке
            </a>
          </div>
        </header>

        <section className="space-y-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/30 pb-2">О нас</h2>
            <p className="text-white/90 leading-relaxed">
              FactSeeker - сервис, который позволяет проверять достоверность той или иной информации с помощью собственной модели машинного обучения.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/30 pb-2">Как это работает?</h2>
            <p className="text-white/90 leading-relaxed">
              Сервис позволяет обработать информацию с помощью модели машинного обучения на выявление дезинформации и её вероятности в процентном соотношении.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl p-6 shadow-lg text-white">
            <h2 className="text-3xl font-bold mb-4">Имеем свой API</h2>
            <p className="text-purple-100 leading-relaxed">
              FactSeeker имеет свой собственный API. Благодаря данному подходу, можно подключить модель, используемую в FactSeeker к чему угодно. Например, к соцсетям для проверки правды или лжи.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
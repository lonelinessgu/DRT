import { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Main from "./pages/Main";
import Checker from "./pages/Checker";
import Statistic from "./pages/Statistic";

// Конфигурация маршрутов
const routeConfig = [
  { path: "/", component: Main },
  { path: "/check", component: Checker, title: "Проверка" },
  { path: "/stat", component: Statistic, title: "Список ресурсов"}
];

// Компонент для обновления заголовка
const TitleUpdater = ({ title }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return null;
};

// Функция для создания маршрута
const createRoute = (route) => {
  const element = (
    <>
      <TitleUpdater title={route.title} />
      <route.component />
    </>
  );

  return (
    <Route
      key={route.path}
      path={route.path}
      element={element}
    />
  );
};

// Компонент, который использует location для ключа Routes
const RoutesWithLocationKey = () => {
  const location = useLocation();

  return (
    <Routes key={location.key}>
      {routeConfig.map(createRoute)}
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <RoutesWithLocationKey />
    </Router>
  );
}

export default App;
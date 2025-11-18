// src/components/MainPanel.js
import React from "react";

const MainPanel = () => {
  return (
    <>
      <h1>RAG система</h1>

      <h2 className="section-title">Описание</h2>
      <p>Работа RAG-системы обычно строится из двух этапов:</p>
      <ol>
        <li>Поиск релевантной информации в базе знаний.</li>
        <li>Генерация ответа на основе найденных данных.</li>
      </ol>

      {/* картинка из public/png.png */}
      <img src="/png.png" alt="Архитектура RAG" width="80%" />

      <h3 className="section-title">Компоненты системы</h3>
      <ul className="custom-list">
        <li>Модуль поиска (Retriever)</li>
        <li>Генеративная модель (Generator)</li>
        <li>База знаний</li>
      </ul>

      <h3 className="section-title">Сравнительная таблица</h3>
      <table>
        <thead>
          <tr>
            <th>Критерий</th>
            <th>Обычная модель</th>
            <th>RAG система</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Источник знаний</td>
            <td>Параметры модели</td>
            <td>База данных + параметры модели</td>
          </tr>
          <tr>
            <td>Актуальность</td>
            <td>Ограничена временем обучения</td>
            <td>Можно обновлять знания</td>
          </tr>
          <tr>
            <td>Гибкость</td>
            <td>Низкая</td>
            <td>Высокая</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default MainPanel;

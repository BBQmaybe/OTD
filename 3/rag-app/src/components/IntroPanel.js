// src/components/IntroPanel.js
import React from "react";

const IntroPanel = () => {
  return (
    <>
      <h1>RAG система</h1>
      <p>
        Retrieval-Augmented Generation (RAG) — это архитектура для интеграции
        моделей генерации текста с внешними источниками знаний. Она сочетает
        преимущества генеративных моделей и поиска по базе данных.
      </p>

      <h2 className="section-title">Введение</h2>
      <p>
        Основная идея RAG состоит в том, чтобы модель могла не только
        использовать параметры нейросети, но и обращаться к дополнительным
        данным, чтобы давать более точные ответы.
      </p>
    </>
  );
};

export default IntroPanel;

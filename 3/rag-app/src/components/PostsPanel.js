// src/components/PostsPanel.js
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const PostsPanel = () => {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(5);      // сколько постов показывать
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useAxios, setUseAxios] = useState(false); // false = fetch, true = axios

  // Загрузка постов (fetch или axios — в зависимости от useAxios)
  useEffect(() => {
    const controller = new AbortController();

    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        let data;

        if (useAxios) {
          // Загрузка через axios
          const response = await axios.get(POSTS_URL, {
            signal: controller.signal,
          });
          data = response.data;
        } else {
          // Загрузка через fetch
          const response = await fetch(POSTS_URL, {
            signal: controller.signal,
          });
          if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
          }
          data = await response.json();
        }

        setPosts(data);
      } catch (err) {
        // игнорируем отмену запроса
        if (err.name === "CanceledError" || err.name === "AbortError") return;
        setError(err.message || "Ошибка загрузки");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();

    return () => {
      controller.abort();
    };
  }, [useAxios]); // перезагружаем данные при переключении режима

  // Мемоизация — вычисляем только те посты, которые надо отобразить
  const visiblePosts = useMemo(
    () => posts.slice(0, limit),
    [posts, limit]
  );

  return (
    <section id="posts">
      <h1>Посты</h1>

      <p>
        Ниже загружаются посты с сервера{" "}
        <code>jsonplaceholder.typicode.com</code>. Вы можете выбрать, сколько
        постов показывать, и переключить способ загрузки (fetch или axios).
      </p>

      {/* Переключатель fetch / axios */}
      <div className="posts-controls">
        <span>Способ загрузки:</span>
        <button
          type="button"
          onClick={() => setUseAxios(false)}
          className={!useAxios ? "method-button active" : "method-button"}
        >
          fetch
        </button>
        <button
          type="button"
          onClick={() => setUseAxios(true)}
          className={useAxios ? "method-button active" : "method-button"}
        >
          axios
        </button>
      </div>

      {/* Ползунок для выбора количества постов */}
      <div className="posts-controls">
        <label htmlFor="posts-range">
          Количество постов: <strong>{limit}</strong>
        </label>
        <input
          id="posts-range"
          type="range"
          min="1"
          max="20"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        />
      </div>

      {/* Состояния загрузки / ошибки */}
      {loading && <p>Загружаем посты...</p>}
      {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}

      {/* Список постов */}
      {!loading && !error && (
        <ul className="posts-list">
          {visiblePosts.map((post) => (
            <li key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Небольшой текст для отчёта / сравнения подходов */}
      <div className="posts-note">
        <h3>Сравнение fetch и axios</h3>
        <ul>
          <li>
            <strong>fetch</strong> — встроен в браузер, не требует установки, но
            нужно вручную проверять <code>response.ok</code>, обрабатывать
            ошибки.
          </li>
          <li>
            <strong>axios</strong> — отдельная библиотека, удобнее работать с
            JSON (ответ сразу в <code>response.data</code>), есть свои
            перехватчики, сокращённый синтаксис.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default PostsPanel;

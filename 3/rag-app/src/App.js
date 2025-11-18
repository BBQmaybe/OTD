import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Sidebar from "./components/Sidebar";
import IntroPanel from "./components/IntroPanel";
import MainPanel from "./components/MainPanel";
import ConclusionPanel from "./components/ConclusionPanel";
import PostsPanel from "./components/PostsPanel"; // ← НОВОЕ

function App() {
  return (
    <BrowserRouter>
      <Sidebar />

      <div className="page">
        <main className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/intro" replace />} />
            <Route path="/intro" element={<IntroPanel />} />
            <Route path="/description" element={<MainPanel />} />
            <Route path="/conclusion" element={<ConclusionPanel />} />
            <Route path="/posts" element={<PostsPanel />} /> {/* ← НОВОЕ */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

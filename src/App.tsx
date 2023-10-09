import './App.scss'
import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import { NewsPage } from './pages/NewsPage'
import { Layout } from './layout/Layout'

function App() {
  return (
    <Routes>
      <Route element={<Layout isHomePage />}>
        <Route element={<HomePage />} path="/" />
      </Route>

      <Route element={<Layout />}>
        <Route element={<NewsPage />} path="/novina" />
        <Route element={<div>kursy_pidvych_kvalif</div>} path="/kursy_pidvych_kvalif" />
      </Route>
    </Routes>
  )
}

export default App

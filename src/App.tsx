import './App.scss'
import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import { NewsPage } from './pages/NewsPage'
import { Layout } from './layout/Layout'
import FullNewsPage from './pages/FullNewsPage/FullNewsPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout isHomePage />}>
        <Route element={<HomePage />} path="/" />
      </Route>

      <Route element={<Layout />}>
        <Route element={<NewsPage />} path="/novina" />
        <Route element={<FullNewsPage />} path="/novina/:year/:month/:day/:news_id" />
        <Route element={<div>kursy_pidvych_kvalif</div>} path="/kursy_pidvych_kvalif" />
      </Route>
    </Routes>
  )
}

export default App

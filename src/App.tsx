import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import { Layout } from './layout/Layout'
import { NewsPage } from './pages/NewsPage'
import { SmksPage } from './pages/Structure/Cmks/CmksPage'
import SubdivPage from './pages/Structure/Subdiv/SubdivPage'
import FullNewsPage from './pages/FullNewsPage/FullNewsPage'
import { TeacherPage } from './pages/Structure/Cmks/TeacherPage'
import { FullSmksPage } from './pages/Structure/Cmks/FullCmkPage'
import GeneralInfo from './pages/GeneralInfoPage/GeneralInfoPage'
import { FullSubdivPage } from './pages/Structure/Subdiv/FullSubdivPage'
import { ViddilenyaPage } from './pages/Structure/Vidilenya/VidilenyaPage'
import { FullVidilenyaPage } from './pages/Structure/Vidilenya/FullVidilenya'
import { RozkladPage } from './pages/Rozklad/RozkladPage'
import { AllGroupsPage } from './pages/Rozklad/AllGroupsSchedule'
import { OneGroupSchedulePage } from './pages/Rozklad/OneGroupSchedule'
import { AllTeachersSchedulePage } from './pages/Rozklad/AllTeachersSchedule'
import { OneTeacherSchedulePage } from './pages/Rozklad/OneTeacherSchedule'
import { Administration } from './pages/Pro-zhbphc/Administracia/Administracia'

const App = () => {
  return (
    <Routes>
      <Route element={<Layout isHomePage />}>
        <Route element={<HomePage />} path="/" />
      </Route>

      <Route element={<Layout />}>
        <Route element={<NewsPage />} path="/novina" />
        <Route element={<FullNewsPage />} path="/novina/:year/:month/:day/:news_id" />

        {/* STRUCTURE */}
        <Route element={<SmksPage />} path="/structure/cmks" />
        <Route element={<FullSmksPage />} path="/structure/cmks/:cmks_slug" />
        <Route element={<TeacherPage />} path="/structure/cmks/:cmks_slug/:teacher_slug" />

        <Route element={<SubdivPage />} path="/structure/subdiv" />
        <Route element={<FullSubdivPage />} path="/structure/subdiv/:subdiv_slug" />

        <Route element={<ViddilenyaPage />} path="/structure/vidilenya" />
        <Route element={<FullVidilenyaPage />} path="/structure/vidilenya/:vidilenya_slug" />
        {/* // STRUCTURE */}

        {/* ROZKLAD */}
        <Route element={<RozkladPage />} path="/rozklad" />

        <Route element={<AllGroupsPage />} path="/rozklad/grupa" />
        <Route element={<OneGroupSchedulePage />} path="/rozklad/grupa/:group_name" />

        <Route element={<AllTeachersSchedulePage />} path="/rozklad/vikladach" />
        <Route element={<OneTeacherSchedulePage />} path="/rozklad/vikladach/:teacher_slug" />
        {/* // ROZKLAD */}

        <Route element={<Administration />} path="/pro-zhbphc/administracia" />

        <Route element={<GeneralInfo />} path="/general-info" />
      </Route>
    </Routes>
  )
}

export default App

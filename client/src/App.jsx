import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import PublicBiodataPage from './pages/PublicBiodataPage'

function ProfileRoute() {
  const location = useLocation()
  return <PublicBiodataPage key={location.pathname + location.search} />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/share/:shareId" element={<ProfileRoute />} />
        <Route path="/:editKey" element={<ProfileRoute />} />
        <Route path="/" element={<ProfileRoute />} />
        <Route path="*" element={<ProfileRoute />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

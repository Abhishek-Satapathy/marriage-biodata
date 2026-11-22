
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import PublicBiodataPage from './pages/PublicBiodataPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public homepage: view only */}
        <Route path="/" element={<PublicBiodataPage />} />

        {/* Public sharing link */}
        <Route path="/share/:shareId" element={<PublicBiodataPage />} />

        {/* Owner link: edit and view after the API validates the key */}
        <Route path="/:editKey" element={<PublicBiodataPage />} />

        {/* Invalid routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

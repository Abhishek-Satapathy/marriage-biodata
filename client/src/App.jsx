
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import BiodataPage from './pages/BiodataPage'
import PublicBiodataPage from './pages/PublicBiodataPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Homepage - Create / Manage Biodata */}
        <Route path="/" element={<BiodataPage />} />

        {/* Public sharing link */}
        <Route path="/share/:shareId" element={<PublicBiodataPage />} />

        {/* Owner edit link */}
        <Route path="/:editKey" element={<PublicBiodataPage />} />

        {/* Invalid routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

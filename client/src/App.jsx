import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import BiodataPage from './pages/BiodataPage'
import PublicBiodataPage from './pages/PublicBiodataPage'

function OwnerManagePage() {
  const { editKey } = useParams()
  window.sessionStorage.setItem('ownerEditKey', editKey)

  return (
    <BiodataPage key={editKey} />
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/manage/:editKey" element={<OwnerManagePage />} />
        <Route path="/share/:shareId" element={<PublicBiodataPage />} />
        <Route path="/" element={<PublicBiodataPage />} />
        <Route path="*" element={<PublicBiodataPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

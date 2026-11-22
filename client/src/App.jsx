import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OwnerLogin from './components/auth/OwnerLogin'
import BiodataPage from './pages/BiodataPage'
import PublicBiodataPage from './pages/PublicBiodataPage'

function OwnerArea() {
  const [signedIn, setSignedIn] = useState(
    () => Boolean(window.sessionStorage.getItem('ownerToken'))
  )

  if (!signedIn) {
    return <OwnerLogin onLogin={() => setSignedIn(true)} />
  }

  return (
    <BiodataPage
      key="owner"
      onLogout={() => {
        window.sessionStorage.removeItem('ownerToken')
        setSignedIn(false)
      }}
    />
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/share/:shareId" element={<PublicBiodataPage />} />
        <Route path="*" element={<OwnerArea />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

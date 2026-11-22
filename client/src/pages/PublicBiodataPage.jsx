import { useEffect, useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { getSharedBiodata } from '../services/biodataService'
import ProfilePage from './ProfilePage'

function PublicBiodataPage() {
  const { shareId } = useParams()
  const [data, setData] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    getSharedBiodata(shareId)
      .then((response) => {
        if (active) setData(response.data)
      })
      .catch((error) => {
        if (active) {
          setMessage(error.response?.data?.message || 'Unable to open this biodata link.')
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => { active = false }
  }, [shareId])

  useEffect(() => {
    if (data?.personalDetails?.fullName) {
      document.title = data.personalDetails.fullName + ' | Marriage Biodata'
    }
    return () => { document.title = 'Marriage Biodata' }
  }, [data])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <LoaderCircle className="animate-spin text-brand" size={30} />
      </div>
    )
  }

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream px-4">
        <div className="rounded-2xl border border-brand-line bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-brand-dark">Biodata link unavailable</h1>
          <p className="mt-2 text-sm text-stone-500">{message}</p>
        </div>
      </main>
    )
  }

  return <ProfilePage data={data} readOnly />
}

export default PublicBiodataPage

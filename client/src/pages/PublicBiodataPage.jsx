import { useEffect, useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getBiodata, getPublicBiodata, getSharedBiodata } from '../services/biodataService'
import BiodataPage from './BiodataPage'
import ProfilePage from './ProfilePage'

function PublicBiodataPage() {
  const { shareId, editKey: pathEditKey } = useParams()
  const [searchParams] = useSearchParams()
  const editKey = pathEditKey || searchParams.get('key')
  const [ownerAccess, setOwnerAccess] = useState(false)
  const [data, setData] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const load = async () => {
      if (editKey) {
        window.sessionStorage.setItem('ownerEditKey', editKey)
        try {
          await getBiodata()
          if (active) setOwnerAccess(true)
          return
        } catch (error) {
          if (error.response?.status === 404) {
            if (active) setOwnerAccess(true)
            return
          }

          window.sessionStorage.removeItem('ownerEditKey')
          if (active) {
            const cleanUrl = shareId ? '/share/' + encodeURIComponent(shareId) : '/'
            window.history.replaceState({}, '', cleanUrl)
          }
        }
      } else {
        window.sessionStorage.removeItem('ownerEditKey')
      }

      const response = shareId ? await getSharedBiodata(shareId) : await getPublicBiodata()
      if (active) setData(response.data)
    }

    load()
      .catch((error) => {
        if (active) {
          setMessage(error.response?.data?.message || 'Unable to open this biodata link.')
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => { active = false }
  }, [editKey, shareId])

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

  if (ownerAccess) return <BiodataPage key={editKey} />

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

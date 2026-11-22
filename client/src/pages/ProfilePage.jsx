import { useState } from 'react'
import { Check, Copy, Edit, Image as ImageIcon, KeyRound, Share2 } from 'lucide-react'
import BiodataPreview from '../components/preview/BiodataPreview'

function ProfilePage({ data, onEdit, readOnly = false }) {
  const [copied, setCopied] = useState(false)
  const [editLinkCopied, setEditLinkCopied] = useState(false)
  const otherPhotos = data.otherPhotos || []
  const shareUrl = data.shareId
    ? window.location.origin + '/share/' + data.shareId
    : ''

  const copyShareLink = async () => {
    if (!shareUrl) return

    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.prompt('Copy your biodata link:', shareUrl)
    }
  }

  const copyEditLink = async () => {
    const ownerKey = window.sessionStorage.getItem('ownerEditKey')
    if (!shareUrl || !ownerKey) return

    const editUrl = shareUrl + '?key=' + encodeURIComponent(ownerKey)
    try {
      await navigator.clipboard.writeText(editUrl)
      setEditLinkCopied(true)
      window.setTimeout(() => setEditLinkCopied(false), 2200)
    } catch {
      window.prompt('Copy your private edit link:', editUrl)
    }
  }

  return (
    <div className="min-h-screen bg-cream text-stone-800">
      <header className="sticky top-0 z-30 border-b border-brand-line bg-[#fffdf9]/95 shadow-[0_4px_24px_rgba(77,53,29,0.06)] backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="brand-lockup min-w-0">
            <img src="/ganesha-mark.png" alt="Ganesh emblem" className="brand-mark" />
            <div className="min-w-0">
              <h1 className="truncate font-semibold text-brand-dark">Marriage Biodata</h1>
              <p className="text-xs text-stone-500">{readOnly ? 'Personal Profile' : 'Your Private Profile Manager'}</p>
            </div>
          </div>

          {!readOnly && (
            <div className="profile-actions flex shrink-0 gap-2">
              <button
                type="button"
                onClick={copyShareLink}
                disabled={!shareUrl}
                className="flex items-center gap-2 rounded-lg bg-brand px-3 py-2 text-sm font-medium text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
                title={shareUrl ? 'Copy the public biodata link' : 'Save your biodata first'}
              >
                {copied ? <Check size={16} /> : <Share2 size={16} />}
                <span>{copied ? 'Link copied' : 'Share'}</span>
              </button>
              <button
                type="button"
                onClick={copyEditLink}
                disabled={!shareUrl}
                className="flex items-center gap-2 rounded-lg border border-brand/30 px-3 py-2 text-sm text-brand-dark hover:bg-brand/5 disabled:opacity-50"
                title="Copy this same profile URL with your private edit key"
                aria-label="Copy edit link"
              >
                {editLinkCopied ? <Check size={16} /> : <KeyRound size={16} />}
                <span className="hidden sm:inline">{editLinkCopied ? 'Edit link copied' : 'Copy edit link'}</span>
              </button>
              <button
                type="button"
                onClick={onEdit}
                className="flex items-center gap-2 rounded-lg border border-brand/30 px-3 py-2 text-sm text-brand-dark hover:bg-brand/5"
              >
                <Edit size={16} />
                <span>Edit</span>
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand">
            {readOnly ? 'A PERSONAL INTRODUCTION' : 'YOUR SHAREABLE PROFILE'}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-brand-dark">
            {data.personalDetails?.fullName || 'Marriage Biodata'}
          </h2>
          <p className="mt-2 text-sm text-stone-500">
            {readOnly
              ? 'Personal, family, education and professional details.'
              : 'This is how your biodata appears to people who open your link.'}
          </p>
        </div>

        {!readOnly && (
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-brand-line bg-[#fffefa] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <p className="font-medium text-brand-dark">Your public biodata link</p>
              <p className="mt-1 break-all text-sm text-stone-500">
                {shareUrl || 'Save your biodata to create a share link.'}
              </p>
            </div>
            <button
              type="button"
              onClick={copyShareLink}
              disabled={!shareUrl}
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-brand/30 bg-white px-4 py-2.5 text-sm font-medium text-brand-dark disabled:opacity-50"
            >
              {copied ? <Check size={17} /> : <Copy size={17} />}
              {copied ? 'Copied' : 'Copy link'}
            </button>
          </div>
        )}

        <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-8 premium-frame">
          <BiodataPreview data={data} />
        </div>

        {data.kundaliPhoto?.url && (
          <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7 premium-frame">
            <div className="mb-4 flex items-center gap-2">
              <ImageIcon size={19} className="text-brand" />
              <h3 className="text-lg font-semibold text-brand-dark">Kundali Photograph</h3>
            </div>
            <img
              src={data.kundaliPhoto.url}
              alt="Kundali"
              className="mx-auto max-h-[650px] w-full rounded-xl object-contain"
            />
          </section>
        )}

        {otherPhotos.length > 0 && (
          <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7 premium-frame">
            <div className="mb-4 flex items-center gap-2">
              <ImageIcon size={19} className="text-brand" />
              <h3 className="text-lg font-semibold text-brand-dark">Additional Photographs</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {otherPhotos.map((photo, index) => (
                <img
                  key={photo.fileId || photo.url || index}
                  src={photo.url}
                  alt={'Additional photograph ' + (index + 1)}
                  loading="lazy"
                  className="aspect-square w-full rounded-xl border border-stone-100 object-cover"
                />
              ))}
            </div>
          </section>
        )}

        {!readOnly && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={onEdit}
              className="flex items-center justify-center gap-2 rounded-xl border border-brand/30 bg-white px-6 py-3 text-sm font-semibold text-brand-dark"
            >
              <Edit size={17} />
              Edit your biodata
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default ProfilePage

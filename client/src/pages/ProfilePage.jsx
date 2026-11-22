import { useRef, useState } from 'react'
import { Download, Edit, LoaderCircle, Image as ImageIcon } from 'lucide-react'
import html2pdf from 'html2pdf.js'
import BiodataPreview from '../components/preview/BiodataPreview'
import BiodataDocument from '../components/pdf/BiodataDocument'

function ProfilePage({ data, onEdit }) {
  const pdfRef = useRef(null)
  const [downloading, setDownloading] = useState(false)

  const downloadPDF = async () => {
    if (!pdfRef.current) return

    try {
      setDownloading(true)
      await document.fonts.ready
      await html2pdf()
        .set({
          margin: [10, 10, 10, 10],
          filename: `${data.personalDetails?.fullName || 'Marriage'}-Biodata.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            logging: false
          },
          jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
          },
          pagebreak: {
            mode: ['css', 'legacy'],
            before: ['.pdf-photo-gallery'],
            avoid: ['.pdf-details-card', '.pdf-detail-item', '.pdf-photo-card', 'tr']
          }
        })
        .from(pdfRef.current)
        .save()
    } catch (error) {
      console.error('PDF download error:', error)
      window.alert('Unable to generate PDF. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  const otherPhotos = data.otherPhotos || []

  return (
    <div className="min-h-screen bg-cream text-stone-800">
      <header className="sticky top-0 z-30 border-b border-brand-line bg-[#fffdf9]/95 shadow-[0_4px_24px_rgba(77,53,29,0.06)] backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="brand-lockup">
            <img src="/ganesha-mark.png" alt="Ganesh emblem" className="brand-mark" />
            <div>
              <h1 className="font-semibold text-brand-dark">Marriage Biodata</h1>
              <p className="text-xs text-stone-500">Your Personal Profile</p>
            </div>
          </div>

          <div className="profile-actions flex gap-2">
            <button
              type="button"
              aria-label="Edit biodata"
              onClick={onEdit}
              className="flex items-center gap-2 rounded-lg border border-brand/30 px-3 py-2 text-sm text-brand-dark hover:bg-brand/5"
            >
              <Edit size={16} />
              <span>Edit</span>
            </button>

            <button
              type="button"
              aria-label={downloading ? 'Generating PDF' : 'Download PDF'}
              onClick={downloadPDF}
              disabled={downloading}
              className="flex items-center gap-2 rounded-lg bg-brand px-3 py-2 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-50"
            >
              {downloading ? (
                <LoaderCircle size={16} className="animate-spin" />
              ) : (
                <Download size={16} />
              )}
              <span>{downloading ? 'Generating...' : 'Download PDF'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-brand-dark">Marriage Biodata</h2>
          <p className="mt-2 text-sm text-stone-500">
            Your personal, family, education and professional information.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-8 premium-frame">
          <BiodataPreview data={data} />
        </div>

        {/* Kundali photograph */}
        {data.kundaliPhoto?.url && (
          <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7 premium-frame">
            <div className="mb-4 flex items-center gap-2">
              <ImageIcon size={19} className="text-brand" />
              <h3 className="text-lg font-semibold text-brand-dark">
                Kundali Photograph
              </h3>
            </div>
            <img
              src={data.kundaliPhoto.url}
              alt="Kundali"
              className="mx-auto max-h-[650px] w-full rounded-xl object-contain"
            />
          </section>
        )}

        {/* All additional photographs */}
        {otherPhotos.length > 0 && (
          <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7 premium-frame">
            <div className="mb-4 flex items-center gap-2">
              <ImageIcon size={19} className="text-brand" />
              <h3 className="text-lg font-semibold text-brand-dark">
                Additional Photographs
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {otherPhotos.map((photo, index) => (
                <img
                  key={photo.fileId || index}
                  src={photo.url}
                  alt={`Additional photograph ${index + 1}`}
                  loading="lazy"
                  className="aspect-square w-full rounded-xl border border-stone-100 object-cover"
                />
              ))}
            </div>
          </section>
        )}

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center justify-center gap-2 rounded-xl border border-brand/30 bg-white px-6 py-3 text-sm font-semibold text-brand-dark"
          >
            <Edit size={17} />
            Edit Biodata
          </button>

          <button
            type="button"
            onClick={downloadPDF}
            disabled={downloading}
            className="flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-50"
          >
            <Download size={17} />
            {downloading ? 'Generating PDF...' : 'Download Complete PDF'}
          </button>
        </div>
      </main>

      {/* Full PDF document used only for PDF generation */}
      <div className="fixed left-[-10000px] top-0" aria-hidden="true">
        <div ref={pdfRef}>
          <BiodataDocument data={data} />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage







import { useEffect, useState } from 'react'
import {
  Heart,
  UserRound,
  Users,
  GraduationCap,
  BriefcaseBusiness,
  Camera,
  Share2,
  Eye,
  Save,
  ChevronLeft,
  ChevronRight,
  LoaderCircle
} from 'lucide-react'

import PersonalDetails from '../components/forms/PersonalDetails'
import FamilyDetails from '../components/forms/FamilyDetails'
import EducationDetails from '../components/forms/EducationDetails'
import ProfessionalDetails from '../components/forms/ProfessionalDetails'
import SocialLinks from '../components/forms/SocialLinks'
import PhotoUpload from '../components/photo/PhotoUpload'
import BiodataPreview from '../components/preview/BiodataPreview'
import ProfilePage from './ProfilePage'

import { initialBiodata } from '../utils/initialBiodata'
import {
  getBiodata,
  createBiodata,
  updateBiodata
} from '../services/biodataService'

const sections = [
  { id: 'personal', label: 'Personal Details', icon: UserRound },
  { id: 'family', label: 'Family Details', icon: Users },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'professional', label: 'Professional', icon: BriefcaseBusiness },
  { id: 'photos', label: 'Photos', icon: Camera },
  { id: 'social', label: 'Social Links', icon: Share2 }
]

// Convert MongoDB ISO dates (or Date objects) to the value format required
// by <input type="date">: YYYY-MM-DD.
const toDateInputValue = (value) => {
  if (!value) return ''

  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return ''
    return [
      value.getFullYear(),
      String(value.getMonth() + 1).padStart(2, '0'),
      String(value.getDate()).padStart(2, '0')
    ].join('-')
  }

  const stringValue = String(value)
  const datePart = stringValue.slice(0, 10)

  return /^\d{4}-\d{2}-\d{2}$/.test(datePart) ? datePart : ''
}

function BiodataPage() {
  const [formData, setFormData] = useState(initialBiodata)
  const [activeSection, setActiveSection] = useState('personal')
  const [showPreview, setShowPreview] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const [isSaved, setIsSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [message, setMessage] = useState('')
  // Fetch existing biodata
  useEffect(() => {
    const loadBiodata = async () => {
      try {
        const response = await getBiodata()

        if (response.data) {
          const saved = response.data

          setFormData({
            ...initialBiodata,
            ...saved,

            personalDetails: {
              ...initialBiodata.personalDetails,
              ...saved.personalDetails,
              dateOfBirthCertificate: toDateInputValue(
                saved.personalDetails?.dateOfBirthCertificate
              ),
              dateOfBirthOriginal: toDateInputValue(
                saved.personalDetails?.dateOfBirthOriginal
              )
            },

            familyDetails: {
              ...initialBiodata.familyDetails,
              ...saved.familyDetails
            },

            professionalDetails: {
              ...initialBiodata.professionalDetails,
              ...saved.professionalDetails
            },

            socialLinks: {
              ...initialBiodata.socialLinks,
              ...saved.socialLinks
            },

            educationDetails:
              saved.educationDetails?.length
                ? saved.educationDetails
                : initialBiodata.educationDetails,

            profilePhoto:
              saved.profilePhoto || initialBiodata.profilePhoto,

            kundaliPhoto:
              saved.kundaliPhoto || initialBiodata.kundaliPhoto,

            otherPhotos: saved.otherPhotos || []
          })

          setIsSaved(true)
          setShowProfile(true)
        }
      } catch (error) {
        if (error.response?.status !== 404) {
          setMessage('Unable to load existing biodata.')
        }
      } finally {
        setFetching(false)
      }
    }

    loadBiodata()
  }, [])

  // Update nested object fields
  const updateField = (section, name, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value
      }
    }))
  }

  // Update education array or photo data
  const updateSection = (section, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: value
    }))
  }

  // Save or update biodata
  const saveBiodata = async () => {
    setLoading(true)
    setMessage('')

    try {
      const payload = {
        ...formData,

        personalDetails: {
          ...formData.personalDetails,
          dateOfBirthCertificate:
            formData.personalDetails.dateOfBirthCertificate || null,
          dateOfBirthOriginal:
            formData.personalDetails.dateOfBirthOriginal || null
        },

        familyDetails: {
          ...formData.familyDetails,
          brothers: Number(formData.familyDetails.brothers || 0),
          sisters: Number(formData.familyDetails.sisters || 0)
        },

        educationDetails: formData.educationDetails.map((item) => ({
          ...item,
          passingYear: item.passingYear
            ? Number(item.passingYear)
            : undefined
        }))
      }

      if (isSaved) {
        await updateBiodata(payload)
      } else {
        await createBiodata(payload)
        setIsSaved(true)
      }

      setMessage('Biodata saved successfully.')
      setShowProfile(true)
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        'Unable to save biodata. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const currentIndex = sections.findIndex(
    (section) => section.id === activeSection
  )

  const activeItem = sections[currentIndex]
  const ActiveIcon = activeItem.icon

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalDetails
            data={formData.personalDetails}
            onChange={(name, value) =>
              updateField('personalDetails', name, value)
            }
          />
        )

      case 'family':
        return (
          <FamilyDetails
            data={formData.familyDetails}
            onChange={(name, value) =>
              updateField('familyDetails', name, value)
            }
          />
        )

      case 'education':
        return (
          <EducationDetails
            data={formData.educationDetails}
            onChange={(value) =>
              updateSection('educationDetails', value)
            }
          />
        )

      case 'professional':
        return (
          <ProfessionalDetails
            data={formData.professionalDetails}
            onChange={(name, value) =>
              updateField('professionalDetails', name, value)
            }
          />
        )

      case 'photos':
        return (
          <PhotoUpload
            data={{
              profilePhoto: formData.profilePhoto,
              kundaliPhoto: formData.kundaliPhoto,
              otherPhotos: formData.otherPhotos
            }}
            onChange={(name, value) =>
              updateSection(name, value)
            }
          />
        )

      case 'social':
        return (
          <SocialLinks
            data={formData.socialLinks}
            onChange={(name, value) =>
              updateField('socialLinks', name, value)
            }
          />
        )

      default:
        return null
    }
  }

  const goToSection = (index) => {
    if (index >= 0 && index < sections.length) {
      setActiveSection(sections[index].id)
      setShowPreview(false)
    }
  }

  if (fetching) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <LoaderCircle className="animate-spin text-brand" size={30} />
      </div>
    )
  }

  if (showProfile) {
    return (
      <ProfilePage
        data={formData}
        onEdit={() => {
          setShowProfile(false)
          setMessage('')
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-cream text-stone-800">

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-brand/10 p-2">
              <Heart className="h-6 w-6 text-brand" />
            </div>

            <div>
              <h1 className="font-semibold text-brand-dark">
                Marriage Biodata
              </h1>
              <p className="text-xs text-stone-500">
                Personal Profile Builder
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPreview((prev) => !prev)}
              className="flex items-center gap-2 rounded-lg border border-brand/30 px-3 py-2 text-sm text-brand-dark"
            >
              <Eye size={17} />
              <span className="hidden sm:inline">
                {showPreview ? 'Edit Details' : 'Preview'}
              </span>
            </button>

            <button
              type="button"
              onClick={saveBiodata}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-brand px-3 py-2 text-sm font-medium text-white disabled:opacity-50 sm:px-4"
            >
              {loading ? (
                <LoaderCircle size={17} className="animate-spin" />
              ) : (
                <Save size={17} />
              )}
              <span className="hidden sm:inline">
                {isSaved ? 'Update' : 'Save'}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">

        <div className="mb-6">
          <p className="text-xs font-semibold tracking-widest text-brand">
            PERSONAL PROFILE
          </p>

          <h2 className="mt-1 text-2xl font-semibold text-brand-dark sm:text-3xl">
            Create Your Biodata
          </h2>

          <p className="mt-2 text-sm text-stone-500">
            Share your details in a beautiful and organized format.
          </p>
        </div>

        {message && (
          <div className="mb-5 rounded-xl border border-brand/20 bg-white px-4 py-3 text-sm text-brand-dark">
            {message}
          </div>
        )}

        {/* Mobile Navigation */}
        <div className="mb-5 flex gap-2 overflow-x-auto pb-2 lg:hidden">
          {sections.map((section) => {
            const Icon = section.icon

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => goToSection(
                  sections.findIndex((item) => item.id === section.id)
                )}
                className={`flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2.5 text-sm ${
                  activeSection === section.id
                    ? 'border-brand bg-brand text-white'
                    : 'border-stone-200 bg-white text-stone-600'
                }`}
              >
                <Icon size={16} />
                {section.label}
              </button>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)_320px]">

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-stone-200 bg-white p-3">
              <p className="px-3 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400">
                Biodata Sections
              </p>

              {sections.map((section) => {
                const Icon = section.icon

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => goToSection(
                      sections.findIndex((item) => item.id === section.id)
                    )}
                    className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm ${
                      activeSection === section.id
                        ? 'bg-brand/10 font-semibold text-brand-dark'
                        : 'text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <Icon size={18} />
                    {section.label}
                  </button>
                )
              })}
            </div>
          </aside>

          {/* Form */}
          <section className={showPreview ? 'hidden lg:block' : ''}>
            <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-6">

              <div className="mb-6 flex items-center gap-3 border-b border-stone-100 pb-5">
                <div className="rounded-xl bg-brand/10 p-3">
                  <ActiveIcon size={20} className="text-brand" />
                </div>

                <div>
                  <h3 className="font-semibold text-brand-dark">
                    {activeItem.label}
                  </h3>
                  <p className="text-xs text-stone-500">
                    Section {currentIndex + 1} of {sections.length}
                  </p>
                </div>
              </div>

              {renderActiveSection()}

              <div className="mt-8 flex justify-between border-t border-stone-100 pt-5">
                <button
                  type="button"
                  onClick={() => goToSection(currentIndex - 1)}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-2 rounded-lg border border-stone-200 px-4 py-2.5 text-sm disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                <button
                  type="button"
                  onClick={() => goToSection(currentIndex + 1)}
                  disabled={currentIndex === sections.length - 1}
                  className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white disabled:opacity-40"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* Live Preview */}
          <aside className={showPreview ? '' : 'hidden lg:block'}>
            <div className="sticky top-24 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">

              <div className="mb-4 flex items-center gap-2">
                <Eye size={19} className="text-brand" />
                <h3 className="font-semibold text-brand-dark">
                  Live Preview
                </h3>
              </div>

              <BiodataPreview data={formData} />

              <button
                type="button"
                onClick={saveBiodata}
                disabled={loading}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-medium text-white disabled:opacity-50"
              >
                <Save size={17} />
                {loading ? 'Saving...' : isSaved ? 'Update Biodata' : 'Save Biodata'}
              </button>
            </div>
          </aside>

        </div>
      </main>
    </div>
  )
}

export default BiodataPage

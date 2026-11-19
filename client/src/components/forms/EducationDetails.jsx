
import { Plus, Trash2 } from 'lucide-react'
import FormField from '../common/FormField'
import SectionHeader from '../common/SectionHeader'

function EducationDetails({ data, onChange }) {
  const addEducation = () => {
    onChange([
      ...data,
      {
        qualification: '',
        institution: '',
        passingYear: ''
      }
    ])
  }

  const updateEducation = (index, name, value) => {
    onChange(
      data.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    )
  }

  const removeEducation = (index) => {
    onChange(data.filter((_, i) => i !== index))
  }

  return (
    <>
      <SectionHeader
        title="Educational Qualifications"
        description="Add your educational qualifications."
      />

      <div className="space-y-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-stone-200 p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-medium text-brand-dark">
                Qualification {index + 1}
              </h4>

              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                aria-label="Remove qualification"
              >
                <Trash2 size={17} />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Qualification"
                value={item.qualification}
                onChange={(e) =>
                  updateEducation(index, 'qualification', e.target.value)
                }
                placeholder="e.g. B.Tech"
              />

              <FormField
                label="Passing Year"
                type="number"
                value={item.passingYear}
                onChange={(e) =>
                  updateEducation(index, 'passingYear', e.target.value)
                }
                placeholder="e.g. 2024"
              />

              <div className="sm:col-span-2">
                <FormField
                  label="Institution / University"
                  value={item.institution}
                  onChange={(e) =>
                    updateEducation(index, 'institution', e.target.value)
                  }
                  placeholder="Enter institution name"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addEducation}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-brand/50 py-3 text-sm font-medium text-brand hover:bg-brand/5"
        >
          <Plus size={17} />
          Add Qualification
        </button>
      </div>
    </>
  )
}

export default EducationDetails

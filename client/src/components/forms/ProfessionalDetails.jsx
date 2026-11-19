
import FormField from '../common/FormField'
import SectionHeader from '../common/SectionHeader'

function ProfessionalDetails({ data, onChange }) {
  const fields = [
    { name: 'occupation', label: 'Occupation', placeholder: 'e.g. Software Developer' },
    { name: 'designation', label: 'Designation' },
    { name: 'companyName', label: 'Company Name' },
    { name: 'annualIncome', label: 'Annual Income', placeholder: 'e.g. ₹6–8 LPA' },
    { name: 'workLocation', label: 'Work Location' }
  ]

  return (
    <>
      <SectionHeader
        title="Professional Details"
        description="Provide your current employment information."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <FormField
            key={field.name}
            {...field}
            value={data[field.name] || ''}
            onChange={(e) => onChange(field.name, e.target.value)}
          />
        ))}
      </div>
    </>
  )
}

export default ProfessionalDetails

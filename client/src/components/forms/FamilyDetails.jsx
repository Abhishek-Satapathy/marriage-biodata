
import FormField from '../common/FormField'
import SectionHeader from '../common/SectionHeader'

function FamilyDetails({ data, onChange }) {
  const fields = [
    { name: 'fatherName', label: "Father's Name" },
    { name: 'fatherOccupation', label: "Father's Occupation" },
    { name: 'motherName', label: "Mother's Name" },
    { name: 'motherOccupation', label: "Mother's Occupation" },
    { name: 'brothers', label: 'Number of Brothers', type: 'number', min: 0 },
    { name: 'sisters', label: 'Number of Sisters', type: 'number', min: 0 }
  ]

  return (
    <>
      <SectionHeader
        title="Family Details"
        description="Provide information about your family."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <FormField
            key={field.name}
            {...field}
            value={data[field.name] ?? ''}
            onChange={(e) => onChange(field.name, e.target.value)}
          />
        ))}

        <div className="sm:col-span-2">
          <FormField
            label="Family Address"
            name="familyAddress"
            type="textarea"
            value={data.familyAddress || ''}
            onChange={(e) => onChange('familyAddress', e.target.value)}
          />
        </div>
      </div>
    </>
  )
}

export default FamilyDetails

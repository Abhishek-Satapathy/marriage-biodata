
import FormField from '../common/FormField'
import SectionHeader from '../common/SectionHeader'

function PersonalDetails({ data, onChange }) {
  const fields = [
    { name: 'fullName', label: 'Full Name', required: true },
    { name: 'gender', label: 'Gender', options: ['Male', 'Female', 'Other'] },
    { name: 'dateOfBirthCertificate', label: 'Date of Birth (Certificate)', type: 'date' },
    { name: 'dateOfBirthOriginal', label: 'Original Date of Birth', type: 'date' },
    { name: 'dateOfTime', label: 'Birth Time', type: 'time' },
    { name: 'height', label: 'Height', placeholder: 'e.g. 5 ft 8 in' },
    { name: 'religion', label: 'Religion' },
    { name: 'caste', label: 'Caste' },
    { name: 'gotra', label: 'Gotra' },
    { name: 'motherTongue', label: 'Mother Tongue' },
    {
      name: 'zodiacSign',
      label: 'Zodiac Sign (Rashi)',
      options: [
        'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
        'Libra', 'Scorpio', 'Sagittarius', 'Capricorn',
        'Aquarius', 'Pisces'
      ]
    },
    { name: 'star', label: 'Star / Nakshatra' },
    {
      name: 'maritalStatus',
      label: 'Marital Status',
      options: ['Never Married', 'Divorced', 'Widowed']
    },
    { name: 'nationality', label: 'Nationality' },
    {
      name: 'eatingHabits',
      label: 'Eating Habits',
      options: ['Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Vegan']
    },
    { name: 'mobileNumber', label: 'Mobile Number', type: 'tel' },
    { name: 'email', label: 'Email Address', type: 'email' }
  ]

  return (
    <>
      <SectionHeader
        title="Personal Details"
        description="Enter your basic and personal information."
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

        <div className="sm:col-span-2">
          <FormField
            label="Current Address"
            name="currentAddress"
            type="textarea"
            value={data.currentAddress || ''}
            onChange={(e) => onChange('currentAddress', e.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <FormField
            label="Permanent Address"
            name="permanentAddress"
            type="textarea"
            value={data.permanentAddress || ''}
            onChange={(e) => onChange('permanentAddress', e.target.value)}
          />
        </div>
      </div>
    </>
  )
}

export default PersonalDetails

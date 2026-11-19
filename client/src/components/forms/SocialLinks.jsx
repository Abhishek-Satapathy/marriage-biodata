
import {
  AtSign,
  Globe,
  Link
} from 'lucide-react'

import FormField from '../common/FormField'
import SectionHeader from '../common/SectionHeader'

function SocialLinks({ data, onChange }) {
  const fields = [
  {
    name: 'instagram',
    label: 'Instagram',
    placeholder: 'https://instagram.com/username',
    icon: AtSign
  },
  {
    name: 'facebook',
    label: 'Facebook',
    placeholder: 'https://facebook.com/username',
    icon: Globe
  },
  {
    name: 'x',
    label: 'X (Twitter)',
    placeholder: 'https://x.com/username',
    icon: AtSign
  },
  {
    name: 'youtube',
    label: 'YouTube',
    placeholder: 'https://youtube.com/@username',
    icon: Link
  },
  {
    name: 'website',
    label: 'Personal Website',
    placeholder: 'https://example.com',
    icon: Globe
  }
]

  return (
    <>
      <SectionHeader
        title="Social Media Links"
        description="Add only the social profiles you want to share."
      />

      <div className="space-y-4">
        {fields.map((field) => {
          const Icon = field.icon

          return (
            <div key={field.name} className="flex items-start gap-3">
              <div className="mt-8 rounded-lg bg-brand/10 p-2.5 text-brand">
                <Icon size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <FormField
                  label={field.label}
                  name={field.name}
                  type="url"
                  placeholder={field.placeholder}
                  value={data[field.name] || ''}
                  onChange={(e) => onChange(field.name, e.target.value)}
                />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default SocialLinks

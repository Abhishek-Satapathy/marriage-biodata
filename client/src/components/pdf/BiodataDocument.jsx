function BiodataDocument({ data }) {
  const personal = data.personalDetails || {}
  const family = data.familyDetails || {}
  const professional = data.professionalDetails || {}
  const education = data.educationDetails || []
  const social = data.socialLinks || {}
  const otherPhotos = data.otherPhotos || []

  const colors = {
    ink: '#292524',
    muted: '#78716c',
    line: '#e7e5e4',
    accent: '#92400e',
    accentLight: '#fef3c7',
    white: '#ffffff'
  }

  const formatDate = (value) => {
    if (!value) return ''
    const datePart = String(value).slice(0, 10)
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(datePart)
    return match ? `${match[3]}/${match[2]}/${match[1]}` : String(value)
  }

  const formatLabel = (value) =>
    value
      ? value.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())
      : ''

  const detail = (label, value) => {
    if (value === undefined || value === null || value === '') return null

    return (
      <div
        key={label}
        style={{
          display: 'grid',
          gridTemplateColumns: '145px minmax(0, 1fr)',
          gap: '10px',
          padding: '7px 0',
          borderBottom: `1px solid ${colors.line}`,
          fontSize: '12px',
          lineHeight: 1.5
        }}
      >
        <span style={{ color: colors.muted, fontWeight: 600 }}>{label}</span>
        <span style={{ color: colors.ink, overflowWrap: 'anywhere' }}>{String(value)}</span>
      </div>
    )
  }

  const section = (title, content) => (
    <section
      key={title}
      style={{
        marginBottom: '22px',
        breakInside: 'auto',
        pageBreakInside: 'auto'
      }}
    >
      <h2
        style={{
          margin: '0 0 10px',
          paddingBottom: '7px',
          borderBottom: `2px solid ${colors.accent}`,
          color: colors.accent,
          fontSize: '14px',
          fontWeight: 700,
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}
      >
        {title}
      </h2>
      {content}
    </section>
  )

  const socialRows = Object.entries(social).filter(([, value]) => value)

  return (
    <div
      id="biodata-pdf"
      style={{
        width: '794px',
        boxSizing: 'border-box',
        padding: '38px',
        margin: '0 auto',
        backgroundColor: colors.white,
        color: colors.ink,
        fontFamily: '"Segoe UI", Arial, sans-serif',
        fontSize: '12px'
      }}
    >
      {/* Profile header */}
      <div
        style={{
          marginBottom: '26px',
          paddingBottom: '22px',
          borderBottom: `4px solid ${colors.accent}`,
          textAlign: 'center'
        }}
      >
        <p
          style={{
            margin: '0 0 14px',
            color: colors.accent,
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '4px',
            textTransform: 'uppercase'
          }}
        >
          Marriage Biodata
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px'
          }}
        >
          {data.profilePhoto?.url && (
            <img
              src={data.profilePhoto.url}
              crossOrigin="anonymous"
              alt="Profile"
              style={{
                width: '145px',
                height: '165px',
                objectFit: 'cover',
                border: `2px solid ${colors.accent}`,
                borderRadius: '8px'
              }}
            />
          )}

          <div style={{ textAlign: 'left', maxWidth: '440px' }}>
            <h1
              style={{
                margin: 0,
                color: '#451a03',
                fontSize: '27px',
                lineHeight: 1.25
              }}
            >
              {personal.fullName || 'Marriage Biodata'}
            </h1>
            {personal.gender && (
              <p style={{ margin: '9px 0 0', color: colors.muted }}>
                {personal.gender}
              </p>
            )}
            {personal.height && (
              <p style={{ margin: '5px 0 0', color: colors.muted }}>
                Height: {personal.height}
              </p>
            )}
          </div>
        </div>
      </div>

      {section('Personal Details', (
        <div>
          {detail('Date of Birth (Certificate)', formatDate(personal.dateOfBirthCertificate))}
          {detail('Date of Birth (Original)', formatDate(personal.dateOfBirthOriginal))}
          {detail('Birth Time', personal.dateOfTime)}
          {detail('Gender', personal.gender)}
          {detail('Height', personal.height)}
          {detail('Zodiac Sign', personal.zodiacSign)}
          {detail('Star / Nakshatra', personal.star)}
          {detail('Religion', personal.religion)}
          {detail('Caste', personal.caste)}
          {detail('Gotra', personal.gotra)}
          {detail('Mother Tongue', personal.motherTongue)}
          {detail('Marital Status', personal.maritalStatus)}
          {detail('Nationality', personal.nationality)}
          {detail('Eating Habits', personal.eatingHabits)}
          {detail('Mobile Number', personal.mobileNumber)}
          {detail('Email', personal.email)}
          {detail('Current Address', personal.currentAddress)}
          {detail('Permanent Address', personal.permanentAddress)}
        </div>
      ))}

      {section('Family Details', (
        <div>
          {detail('Father Name', family.fatherName)}
          {detail('Father Occupation', family.fatherOccupation)}
          {detail('Mother Name', family.motherName)}
          {detail('Mother Occupation', family.motherOccupation)}
          {detail('Brothers', family.brothers)}
          {detail('Sisters', family.sisters)}
          {detail('Family Address', family.familyAddress)}
        </div>
      ))}

      {education.some((item) => item.qualification || item.institution || item.passingYear) &&
        section('Educational Qualifications', (
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '12px'
            }}
          >
            <thead>
              <tr style={{ backgroundColor: colors.accentLight }}>
                {['Qualification', 'Institution', 'Passing Year'].map((heading) => (
                  <th
                    key={heading}
                    style={{
                      padding: '9px',
                      border: `1px solid ${colors.line}`,
                      textAlign: 'left',
                      color: colors.ink
                    }}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {education.map((item, index) => (
                <tr key={`${item.qualification || 'qualification'}-${item.passingYear || index}-${index}`}>
                  <td style={{ padding: '9px', border: `1px solid ${colors.line}` }}>
                    {item.qualification || '-'}
                  </td>
                  <td style={{ padding: '9px', border: `1px solid ${colors.line}` }}>
                    {item.institution || '-'}
                  </td>
                  <td style={{ padding: '9px', border: `1px solid ${colors.line}` }}>
                    {item.passingYear || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ))
      }

      {section('Professional Details', (
        <div>
          {detail('Occupation', professional.occupation)}
          {detail('Designation', professional.designation)}
          {detail('Company', professional.companyName)}
          {detail('Annual Income', professional.annualIncome)}
          {detail('Work Location', professional.workLocation)}
        </div>
      ))}

      {data.kundaliPhoto?.url && section('Kundali Photograph', (
        <div style={{ textAlign: 'center' }}>
          <img
            src={data.kundaliPhoto.url}
            crossOrigin="anonymous"
            alt="Kundali"
            style={{
              display: 'inline-block',
              maxWidth: '100%',
              maxHeight: '560px',
              objectFit: 'contain'
            }}
          />
        </div>
      ))}

      {otherPhotos.length > 0 && section('Additional Photographs', (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px'
          }}
        >
          {otherPhotos.map((photo, index) => (
            <img
              key={photo.fileId || photo.url || index}
              src={photo.url}
              crossOrigin="anonymous"
              alt={`Additional photograph ${index + 1}`}
              style={{
                width: '100%',
                height: '175px',
                objectFit: 'cover',
                borderRadius: '6px'
              }}
            />
          ))}
        </div>
      ))}

      {socialRows.length > 0 && section('Social Links', (
        <div>
          {socialRows.map(([key, value]) =>
            detail(formatLabel(key), value)
          )}
        </div>
      ))}

      <div
        style={{
          marginTop: '28px',
          paddingTop: '12px',
          borderTop: `1px solid ${colors.line}`,
          color: colors.muted,
          textAlign: 'center',
          fontSize: '10px'
        }}
      >
        Marriage Biodata
      </div>
    </div>
  )
}

export default BiodataDocument

function BiodataDocument({ data }) {
  const personal = data.personalDetails || {}
  const family = data.familyDetails || {}
  const professional = data.professionalDetails || {}
  const education = data.educationDetails || []
  const social = data.socialLinks || {}
  const otherPhotos = data.otherPhotos || []

  const colors = {
    ink: '#26382f',
    forest: '#28483a',
    muted: '#6e786e',
    line: '#e6dcc9',
    gold: '#b89458',
    goldLight: '#f7f1e6',
    paper: '#fffefa'
  }

  const formatDate = (value) => {
    if (!value) return ''
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value).slice(0, 10))
    return match ? match[3] + '/' + match[2] + '/' + match[1] : String(value)
  }

  const detail = (label, value, wide = false) => {
    if (value === undefined || value === null || value === '') return null
    return (
      <div className="pdf-detail-item" key={label} style={{
        gridColumn: wide ? '1 / -1' : 'auto',
        padding: '8px 10px',
        borderBottom: '1px solid ' + colors.line,
        breakInside: 'avoid',
        pageBreakInside: 'avoid'
      }}>
        <div style={{ color: colors.muted, fontSize: '9px', fontWeight: 700, letterSpacing: '0.7px', textTransform: 'uppercase' }}>{label}</div>
        <div style={{ marginTop: '3px', color: colors.ink, fontSize: '11px', lineHeight: 1.45, overflowWrap: 'anywhere' }}>{String(value)}</div>
      </div>
    )
  }

  const section = (title, rows) => {
    const visibleRows = rows.filter(Boolean)
    if (!visibleRows.length) return null
    return (
      <div key={title} className="pdf-details-card" style={{
        marginBottom: '14px',
        padding: '12px 14px 10px',
        border: '1px solid ' + colors.line,
        borderLeft: '3px solid ' + colors.gold,
        borderRadius: '9px',
        backgroundColor: colors.paper
      }}>
        <h2 style={{
          margin: '0 0 8px',
          padding: '0 0 7px',
          borderBottom: '1px solid ' + colors.line,
          color: colors.forest,
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.45px',
          textTransform: 'uppercase'
        }}>{title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '10px' }}>
          {visibleRows}
        </div>
      </div>
    )
  }

  const personalRows = [
    detail('Full Name', personal.fullName),
    detail('Date of Birth (Certificate)', formatDate(personal.dateOfBirthCertificate)),
    detail('Date of Birth (Original)', formatDate(personal.dateOfBirthOriginal)),
    detail('Birth Time', personal.dateOfTime),
    detail('Gender', personal.gender),
    detail('Height', personal.height),
    detail('Zodiac Sign (Rashi)', personal.zodiacSign),
    detail('Star / Nakshatra', personal.star),
    detail('Religion', personal.religion),
    detail('Caste', personal.caste),
    detail('Gotra', personal.gotra),
    detail('Mother Tongue', personal.motherTongue),
    detail('Marital Status', personal.maritalStatus),
    detail('Nationality', personal.nationality),
    detail('Eating Habits', personal.eatingHabits),
    detail('Mobile Number', personal.mobileNumber),
    detail('Email', personal.email),
    detail('Current Address', personal.currentAddress, true),
    detail('Permanent Address', personal.permanentAddress, true)
  ]
  const familyRows = [
    detail('Father Name', family.fatherName),
    detail('Father Occupation', family.fatherOccupation),
    detail('Mother Name', family.motherName),
    detail('Mother Occupation', family.motherOccupation),
    detail('Brothers', family.brothers),
    detail('Sisters', family.sisters),
    detail('Family Address', family.familyAddress, true)
  ]
  const professionalRows = [
    detail('Occupation', professional.occupation),
    detail('Designation', professional.designation),
    detail('Company', professional.companyName),
    detail('Annual Income', professional.annualIncome),
    detail('Work Location', professional.workLocation)
  ]
  const educationRows = education.some((item) => item.qualification || item.institution || item.passingYear)
    ? [(
        <table key="education" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: colors.goldLight }}>
              {['Qualification', 'Institution / University', 'Passing Year'].map((heading) => (
                <th key={heading} style={{
                  padding: '8px', borderBottom: '1px solid ' + colors.line,
                  color: colors.forest, textAlign: 'left', fontSize: '9px', letterSpacing: '0.35px'
                }}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>{education.map((item, index) => (
            <tr key={(item.qualification || 'qualification') + '-' + (item.passingYear || index) + '-' + index}>
              <td style={{ padding: '8px', borderBottom: '1px solid ' + colors.line }}>{item.qualification || '-'}</td>
              <td style={{ padding: '8px', borderBottom: '1px solid ' + colors.line, overflowWrap: 'anywhere' }}>{item.institution || '-'}</td>
              <td style={{ padding: '8px', borderBottom: '1px solid ' + colors.line }}>{item.passingYear || '-'}</td>
            </tr>
          ))}</tbody>
        </table>
      )]
    : []
  const socialNames = {
    instagram: 'Instagram',
    facebook: 'Facebook',
    x: 'X (Twitter)',
    youtube: 'YouTube',
    website: 'Personal Website'
  }
  const socialRows = Object.entries(social)
    .filter(([, value]) => value)
    .map(([key, value]) => detail(socialNames[key] || key, value, true))

  const photoItems = []
  if (data.kundaliPhoto?.url) photoItems.push({ url: data.kundaliPhoto.url, label: 'Kundali Photograph', key: 'kundali', className: 'pdf-photo-card kundali-photo' })
  otherPhotos.forEach((photo, index) => {
    photoItems.push({
      url: photo.url,
      label: 'Photograph ' + (index + 1),
      key: photo.fileId || photo.url || index,
      className: 'pdf-photo-card'
    })
  })

  return (
    <div id="biodata-pdf" style={{
      width: '710px',
      boxSizing: 'border-box',
      padding: '24px',
      margin: '0 auto',
      backgroundColor: colors.paper,
      color: colors.ink,
      fontFamily: '"Segoe UI", Arial, sans-serif',
      fontSize: '11px'
    }}>
      <header style={{
        marginBottom: '15px',
        padding: '10px 16px 14px',
        textAlign: 'center',
        border: '1px solid ' + colors.line,
        borderRadius: '13px',
        background: 'linear-gradient(180deg, #fffefa 0%, #fbf8f1 100%)'
      }}>
        <img src="/ganesha-mark.png" crossOrigin="anonymous" alt="Ganesh emblem"
          style={{ display: 'block', width: '92px', height: '48px', objectFit: 'contain', margin: '0 auto 8px' }} />
        {data.profilePhoto?.url && (
          <img src={data.profilePhoto.url} crossOrigin="anonymous" alt="Profile photograph"
            style={{
              display: 'block', width: '112px', height: '128px', margin: '0 auto 10px',
              objectFit: 'cover', border: '2px solid ' + colors.gold, borderRadius: '8px',
              boxShadow: '0 0 0 3px ' + colors.goldLight
            }} />
        )}
        <div style={{ color: colors.gold, fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>Marriage Biodata</div>
        <h1 style={{ margin: '5px 0 0', color: colors.forest, fontSize: '23px', lineHeight: 1.2 }}>
          {personal.fullName || 'Marriage Biodata'}
        </h1>
        <p style={{ margin: '6px 0 0', color: colors.muted, fontSize: '10px' }}>
          {[personal.gender, personal.height].filter(Boolean).join('  ·  ')}
        </p>
        <div style={{ width: '42px', height: '2px', margin: '12px auto 0', backgroundColor: colors.gold }} />
      </header>

      {section('Personal Details', personalRows)}
      {section('Family Details', familyRows)}
      {educationRows.length > 0 && (
        <div className="pdf-details-card" style={{
          marginBottom: '14px', padding: '12px 14px 10px',
          border: '1px solid ' + colors.line, borderLeft: '3px solid ' + colors.gold,
          borderRadius: '9px', backgroundColor: colors.paper
        }}>
          <h2 style={{
            margin: '0 0 8px', padding: '0 0 7px', borderBottom: '1px solid ' + colors.line,
            color: colors.forest, fontSize: '12px', fontWeight: 700, letterSpacing: '0.45px',
            textTransform: 'uppercase'
          }}>Educational Qualifications</h2>
          {educationRows}
        </div>
      )}
      {section('Professional Details', professionalRows)}
      {section('Social Links', socialRows)}

      {photoItems.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2 style={{
            margin: '0 0 11px', paddingBottom: '7px', borderBottom: '2px solid ' + colors.gold,
            color: colors.forest, fontSize: '12px', fontWeight: 700, letterSpacing: '0.6px',
            textTransform: 'uppercase'
          }}>Photographs</h2>
          {data.kundaliPhoto?.url && (
            <figure className="pdf-photo-card kundali-photo" style={{
              margin: '0 0 14px', padding: '10px', textAlign: 'center',
              border: '1px solid ' + colors.line, borderRadius: '9px', backgroundColor: colors.paper
            }}>
              <figcaption style={{ marginBottom: '6px', color: colors.muted, fontSize: '9px', fontWeight: 600 }}>Kundali</figcaption>
              <img src={data.kundaliPhoto.url} crossOrigin="anonymous" alt="Kundali"
                style={{ display: 'block', maxWidth: '100%', maxHeight: '360px', margin: '0 auto', objectFit: 'contain' }} />
            </figure>
          )}
          {otherPhotos.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {otherPhotos.map((photo, index) => (
                <figure className="pdf-photo-card" key={photo.fileId || photo.url || index} style={{
                  margin: 0, padding: '9px', textAlign: 'center',
                  border: '1px solid ' + colors.line, borderRadius: '9px', backgroundColor: colors.paper
                }}>
                  <figcaption style={{ marginBottom: '6px', color: colors.muted, fontSize: '9px', fontWeight: 600 }}>
                    Photograph {index + 1}
                  </figcaption>
                  <img src={photo.url} crossOrigin="anonymous" alt={'Photograph ' + (index + 1)}
                    style={{ display: 'block', width: '100%', height: '310px', margin: '0 auto', objectFit: 'contain' }} />
                </figure>
              ))}
            </div>
          )}
        </div>
      )}

      <footer style={{
        marginTop: '18px', paddingTop: '8px', borderTop: '1px solid ' + colors.line,
        color: colors.muted, textAlign: 'center', fontSize: '9px'
      }}>Marriage Biodata</footer>
    </div>
  )
}

export default BiodataDocument

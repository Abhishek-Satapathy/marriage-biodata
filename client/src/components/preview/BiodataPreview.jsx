import {
  FaInstagram,
  FaFacebook,
  FaXTwitter,
  FaYoutube,
  FaGlobe,
} from "react-icons/fa6";
function BiodataPreview({ data, profileNameRef }) {
  const p = data.personalDetails || {};
  const f = data.familyDetails || {};
  const job = data.professionalDetails || {};
  const education = data.educationDetails || [];
  const socialLinks = data.socialLinks || {};

  const socialIcons = {
    instagram: FaInstagram,
    facebook: FaFacebook,
    x: FaXTwitter,
    youtube: FaYoutube,
    website: FaGlobe,
  };
  const socialLabels = {
    instagram: "Instagram",
    facebook: "Facebook",
    x: "X (Twitter)",
    youtube: "YouTube",
    website: "Personal Website",
  };

  const formatDate = (value) => {
    if (!value) return "";
    const datePart = String(value).slice(0, 10);
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(datePart);
    if (!match) return String(value);
    return `${match[3]}/${match[2]}/${match[1]}`;
  };

  const sections = [
    {
      title: "Personal Details",
      values: [
        ["Date of Birth (Certificate)", formatDate(p.dateOfBirthCertificate)],
        ["Date of Birth (Original)", formatDate(p.dateOfBirthOriginal)],
        ["Birth Time", p.dateOfTime],
        ["Gender", p.gender],
        ["Height", p.height],
        ["Religion", p.religion],
        ["Caste", p.caste],
        ["Gotra", p.gotra],
        ["Mother Tongue", p.motherTongue],
        ["Zodiac Sign", p.zodiacSign],
        ["Nakshatra", p.star],
        ["Marital Status", p.maritalStatus],
        ["Nationality", p.nationality],
        ["Eating Habits", p.eatingHabits],
        ["Mobile Number", p.mobileNumber],
        ["Email", p.email],
        ["Current Address", p.currentAddress],
        ["Permanent Address", p.permanentAddress],
      ],
    },
    {
      title: "Family Details",
      values: [
        ["Father", f.fatherName],
        ["Father Occupation", f.fatherOccupation],
        ["Mother", f.motherName],
        ["Mother Occupation", f.motherOccupation],
        ["Brothers", f.brothers],
        ["Sisters", f.sisters],
        ["Family Address", f.familyAddress],
      ],
    },
    {
      title: "Professional Details",
      values: [
        ["Occupation", job.occupation],
        ["Designation", job.designation],
        ["Company", job.companyName],
        ["Annual Income", job.annualIncome],
        ["Work Location", job.workLocation],
      ],
    },
  ];

  return (
    <div className="rounded-xl border border-stone-100 bg-[#fffefa] p-4 sm:p-6">
      {/* Profile header */}
      <div className="border-b border-stone-100 pb-6 text-center">
        <img
          src="/ganesha-mark.png"
          alt="Ganesh emblem"
          className="mx-auto mb-3 h-16 w-[128px] object-contain"
        />
        <div className="mx-auto mb-4 h-44 w-44 overflow-hidden rounded-full border-4 border-brand/30 bg-cream shadow-[0_0_0_5px_rgba(222,199,168,0.24)] sm:h-56 sm:w-56">
          {data.profilePhoto?.url ? (
            <img
              src={data.profilePhoto.url}
              alt={`${p.fullName || "Profile"} photograph`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-stone-400">
              No profile photo
            </div>
          )}
        </div>

        <h2
          ref={profileNameRef}
          className="text-2xl font-semibold text-brand-dark sm:text-3xl"
        >
          {p.fullName || "Your Name"}
        </h2>
        {p.gender && <p className="mt-2 text-sm text-stone-500">{p.gender}</p>}
      </div>

      {/* Detail sections */}
      {sections.map((section) => {
        const values = section.values.filter(
          ([, value]) => value !== "" && value !== null && value !== undefined,
        );

        if (!values.length) return null;

        return (
          <section
            key={section.title}
            className="mt-6 border-b border-brand-line/60 pb-5"
          >
            <h3 className="mb-3 text-base font-semibold text-brand-dark">
              {section.title}
            </h3>

            <div className="space-y-2">
              {values.map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-2 text-sm sm:gap-3"
                >
                  <span className="text-stone-500">{label}</span>
                  <span
                    className={`min-w-0 text-right font-medium text-stone-800 ${
                      label === "Email" ? "break-all" : "break-words"
                    }`}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* Education */}
      {education.some(
        (item) => item.qualification || item.institution || item.passingYear,
      ) && (
        <section className="mt-6 border-b border-brand-line/60 pb-5">
          <h3 className="mb-3 text-base font-semibold text-brand-dark">
            Educational Qualifications
          </h3>

          <div className="space-y-3">
            {education.map((item, index) => (
              <div
                key={`${item.qualification || "qualification"}-${item.passingYear || index}-${index}`}
                className="rounded-lg bg-stone-50 p-3 text-sm"
              >
                {item.qualification && (
                  <p className="font-semibold text-stone-800">
                    {item.qualification}
                  </p>
                )}
                {item.institution && (
                  <p className="mt-1 text-stone-600">{item.institution}</p>
                )}
                {item.passingYear && (
                  <p className="mt-1 text-xs text-stone-500">
                    Passing Year: {item.passingYear}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Social links */}
      {Object.entries(socialLinks).some(([, value]) => value) && (
        <section className="mt-6 pt-1">
          <h3 className="mb-3 text-base font-semibold text-brand-dark">
            Social Profiles
          </h3>
          <div className="flex flex-wrap gap-4">
            {Object.entries(socialLinks).map(([name, url]) => {
              if (!url) return null;
              const Icon = socialIcons[name] || Globe;
              const label = socialLabels[name] || name;
              const href = /^https?:\/\//i.test(url) ? url : `https://${url}`;

              return (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  aria-label={`Open ${label} profile`}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-[#fffdf9] px-3 py-2 text-sm font-medium text-brand-dark transition hover:border-brand/40 hover:bg-brand/5"
                >
                  <Icon
                    size={17}
                    className="shrink-0"
                    style={{
                      color: {
                        instagram: "#E4405F",
                        facebook: "#1877F2",
                        x: "#000000",
                        youtube: "#FF0000",
                        website: "currentColor",
                      }[name],
                    }}
                  />
                  <span>{label}</span>
                </a>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

export default BiodataPreview;

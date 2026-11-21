
function SectionHeader({ title, description }) {
  return (
    <div className="section-heading mb-6">
      <h3 className="text-lg font-semibold text-brand-dark">
        {title}
      </h3>

      {description && (
        <p className="mt-1 text-sm text-stone-500">
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeader



function FormField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  required = false,
  options,
  rows = 3,
  min,
  max,
  step
}) {
  const className =
    'w-full rounded-xl border border-stone-200 bg-white px-3.5 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-brand focus:ring-2 focus:ring-brand/10'

  return (
    <div className="min-w-0 space-y-1.5">
      <label className="block text-sm font-medium text-stone-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {options ? (
        <select
          name={name}
          value={value ?? ''}
          onChange={onChange}
          required={required}
          className={className}
        >
          <option value="">Select {label}</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          name={name}
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={`${className} resize-y`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
          step={step}
          className={className}
        />
      )}
    </div>
  )
}

export default FormField

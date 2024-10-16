export default function FormRowComponent({
  labelText,
  type,
  name,
  // required,
  defaultValue,
  onChange,
}) {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className='form-input'
        defaultValue={defaultValue || ''}
        // required={required ? true : false}
        // required={required || false}
        required
        onChange={onChange}
      />
    </div>
  )
}

export default function FormRowSelect({
  list,
  name,
  defaultValue,
  labelText,
  onChange,
}) {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className='form-select'
        defaultValue={defaultValue}
        onChange={onChange}>
        {list.map((itemValue) => {
          return (
            <option key={itemValue} value={itemValue}>
              {itemValue}
            </option>
          )
        })}
      </select>
    </div>
  )
}

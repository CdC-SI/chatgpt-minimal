import React from 'react'

interface SelectOption {
  value: string;
  label: string;
}

const options: SelectOption[] = [
  { value: 'de', label: 'DE' },
  { value: 'fr', label: 'FR' },
  { value: 'it', label: 'IT' },
  { value: 'en', label: 'EN' }
]

const LanguageSwitcher = () => {
  return (
    <>
      <div className="computedClass">
        <select>
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </>
  )
}

export default LanguageSwitcher

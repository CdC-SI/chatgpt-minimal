import React from 'react'

interface SelectOption {
  value: string;
  label: string;
  disable: boolean;
}

const options: SelectOption[] = [
  { value: 'de', label: 'DE', disable: false },
  { value: 'fr', label: 'FR', disable: true },
  { value: 'it', label: 'IT', disable: true },
  { value: 'en', label: 'EN', disable: true }
]

const LanguageSwitcher = () => {
  return (
    <>
      <div className="language-switcher language-switcher--desktop">
        <div className="form__group__select">
          <div className="select select--bare ">
            <select className="input--negative input--sm ">
              {options.map(option => (
                <option key={option.value} value={option.value} disabled={option.disable}>{option.label}</option>
              ))}
            </select>
            <div className="select__icon">
              <svg viewBox="0 0 24 24">
                <path d="m5.706 10.015 6.669 3.85 6.669-3.85.375.649-7.044 4.067-7.044-4.067z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LanguageSwitcher

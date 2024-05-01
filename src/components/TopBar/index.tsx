import React from 'react'

import LanguageSwitcher from './LanguageSwitcher'

import './index.less'

const TopBar = () => {
  return (
    <>
    <div className="topBar">
      <div className="container">
        <LanguageSwitcher />
      </div>
    </div>
  </>
  )
}

export default TopBar

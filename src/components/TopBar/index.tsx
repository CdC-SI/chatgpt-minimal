import React from 'react'

import LanguageSwitcher from './LanguageSwitcher'
import TopBarNavigation from './TopBarNavigation'

import './index.less'

const TopBar = () => {
  return (
    <>
    <div className="topBar">
      <div className="container">
        <TopBarNavigation />
        <LanguageSwitcher />
      </div>
    </div>
  </>
  )
}

export default TopBar

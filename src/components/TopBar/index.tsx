import React from 'react'

import LanguageSwitcher from './LanguageSwitcher'
import TopBarNavigation from './TopBarNavigation'

const TopBar = () => {
  return (
    <>
    <div className="top-bar">
      <div className="top-bar__bar">
        <div className="container container--flex">
          <button className="top-bar__btn">
            <span>EAK-Copilot</span>
          </button>
          <div className="top-bar__right">
            <TopBarNavigation />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
</>
)
}

export default TopBar

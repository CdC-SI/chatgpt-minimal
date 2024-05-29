import React from 'react'

import Logo from './Logo'
import MetaNavigation from './MetaNavigation'

const TopHeader = () => {
  return (
    <>
      <div className="top-header">
        <div className="container container--flex">
          <Logo />
          <div className="top-header__right">
            <MetaNavigation />
          </div>
        </div>
      </div>
    </>
  )
}

export default TopHeader

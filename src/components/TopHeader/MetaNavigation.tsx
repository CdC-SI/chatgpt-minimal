import React from 'react'

const MetaNavigation = () => {
  return (
    <>
    <div className="meta-navigation-container">
      <nav className="meta-navigation meta-navigation--desktop " aria-label="Meta">
        <ul>
          <li>
            <a href="/" className="meta-navigation__item"> Copilot
            </a>
          </li>
          <li>
            <a href="/about" className="meta-navigation__item"> About us
            </a>
          </li>
        </ul>
      </nav>
    </div>
    </>
  )
}

export default MetaNavigation

import React from 'react'
import Link from 'next/link'

const MetaNavigation = () => {
  return (
    <>
    <div className="meta-navigation-container">
      <nav className="meta-navigation meta-navigation--desktop " aria-label="Meta">
        <ul>
          <li>
            <Link href="/" className="meta-navigation__item"> Copilot
            </Link>
          </li>
          <li>
            <Link href="/about" className="meta-navigation__item"> About us
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    </>
  )
}

export default MetaNavigation

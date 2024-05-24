import React from 'react'

const MetaNavigation = () => {
  return (
    <>
    <div className="meta-navigation-container">
      <nav className="meta-navigation meta-navigation--desktop " aria-label="Meta">
      <ul>
        <li>
          <a href="#" className="meta-navigation__more">
            <span> Login </span>
            <svg className="icon icon--md icon--MoreFilled" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="m13.187 5.616v.75h6.73v12.018h-6.73v.75h7.48v-13.518z" />
              <path d="m9.368 5.323-.649.375 3.633 6.294h-7.886v.75h7.886l-3.633 6.294.649.375 4.067-7.044z" />
            </svg>
          </a>
        </li>
      </ul>
      </nav>
    </div>
    </>
  )
}

export default MetaNavigation

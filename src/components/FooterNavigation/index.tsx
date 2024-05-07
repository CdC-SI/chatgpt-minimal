import React from 'react'

const FooterNavigation = () => {
  return (
    <>
      <div className="bg--secondary-100">
        <nav className="container container--flex" aria-label="Footer">
          <ul className="footer-navigation">
            <li><a href="javascript:void(0)" className="footer__link">
              <span className="color--text-500">Rechtliches</span>
            </a></li>
            <li><a href="javascript:void(0)" className="footer__link">
              <span className="color--text-500">Datenschutz</span>
            </a></li>
          </ul>
          <div className="footer-navigation footer__link">
            <span className="color--text-500">Version 0.1.0</span>
          </div>
        </nav>
      </div>
    </>
  )
}

export default FooterNavigation

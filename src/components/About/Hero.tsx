import React from 'react'


import './index.less'
import 'highlight.js/styles/atom-one-dark.css'

const Hero = () => {

  return (
    <section className="hero hero--default ">
      <div className="container container--grid gap--responsive">
        <div className="hero__content">
          <h1 className="hero__title">
            About the project
          </h1>
          <div className="hero__description">
            ZAS/EAK-Copilot challenge is developed as part of the Innovation Fellowship 2024. This project is designed to enhance workplace efficiency and foster innovation by providing AI-supported tools that assist employees in their daily tasks.
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

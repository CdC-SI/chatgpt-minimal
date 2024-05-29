import React from 'react'


import './index.less'
import 'highlight.js/styles/atom-one-dark.css'

const Section = () => {

  return (
    <section className="section section--default">
    <div className="container container--grid gap--responsive">
      <div className="container__center--xs vertical-spacing">
        <p>The ZAS/EAK-Copilot, a multilingual AI chatbot, is designed to effectively assist ZAS/EAK-staff with complex social
          security enquiries. It draws on public data sources and integrates advanced AI, natural language processing
          and information retrieval to ensure proactive interaction expertise.</p>

        <p>The chatbot reduces the workload and increases the precision of information procurement. The modular,
          scalable
          assistant makes it easy to train new staff, and its features can be adapted and networked for use by other
          authorities.</p>

        <p>The focus is on digital government services in the NLP area. The ZAS/EAK-Copilot experience can serve as a
          starting point for the future development of AI government services.</p>

        <p>The ZAS/EAK-Copilot is an open-source, data-aware project capable of interacting with its environment and making
          decisions. Both open source LLMs and on-premises solutions and offerings from OpenAI and Microsoft will be
          compared to ensure an optimal, customisable and sovereign implementation.</p>

        <p>The project contributes to AI skills development. It not only provides an innovative tool for information
          procurement and learning, but also promotes digital sovereignty through the use and development of
          corresponding technology processes.</p>

        <h2 className="h2">Further information</h2>
        <ul>
          <li>
            <a href="https://www.zas.admin.ch/">https://www.zas.admin.ch/</a>
          </li>
          <li>
            <a href="https://www.eak.admin.ch/">https://www.eak.admin.ch/</a>
          </li>
          <li>
            <a href="https://www.innovationfellowship.ch/challenges">https://www.innovationfellowship.ch/challenges
              (Challenge #8)</a>
          </li>
          <li>
            <a
              href="https://cnai.swiss/dienstleistungen/projektdatenbank/">https://cnai.swiss/dienstleistungen/projektdatenbank/</a>
          </li>
        </ul>

        <h2 className="h2">Status</h2>
        <div className="table-rapper">
          <table className="table table--default">
            <tbody>
              <tr>
                <th>Start</th>
                <td>2024</td>
              </tr>
              <tr>
                <th>End</th>
                <td>2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </section>
  )
}

export default Section

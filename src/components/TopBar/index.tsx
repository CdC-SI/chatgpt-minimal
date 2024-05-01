import React from 'react'

import styles from './index.module.less'
import LanguageSwitcher from './LanguageSwitcher'

const TopBar = () => {
  return (
    <>
    <div className={styles.topBar}>
      <div className={styles.container}>
        <LanguageSwitcher />
      </div>
    </div>
  </>
)
}

export default TopBar

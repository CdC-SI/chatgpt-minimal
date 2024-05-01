import React from 'react'

import styles from './index.module.less'

const TopHeader = () => {
  return (
    <>
      <div className={styles.topHeader}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <img className={styles.logo__flag} src="/logo_flag.svg" />
            <img className={styles.logo__name} src="/logo_text.svg" />
            <div className={styles.logo__separator} />
            <div className={styles.logo__title}>
              Eidgenössische Ausgleichskasse EAK
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TopHeader

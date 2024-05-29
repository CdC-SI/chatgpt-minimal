import { Layout } from 'antd'
import { Content } from 'antd/lib/layout/layout'


import FooterNavigation from '@/components/FooterNavigation'
import TopHeader from '@/components/TopHeader'
import TopBar from '@/components/TopBar'
import About from '@/components/About'

import styles from './index.module.less'

export default function Home() {
  return (
    <Layout hasSider className={styles.layout}>
      <Layout>
        <TopBar />
        <TopHeader />
        <Content className={styles.main}>
          <About />
        </Content>
        <FooterNavigation />
      </Layout>
    </Layout>
  )
}

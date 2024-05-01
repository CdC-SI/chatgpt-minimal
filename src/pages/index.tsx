import ChatGPT from '@/components/ChatGPT'
import { Layout } from 'antd'
import { Content } from 'antd/lib/layout/layout'

import FooterBar from '@/components/FooterBar'
import HeaderBar from '@/components/HeaderBar'

import styles from './index.module.less'
import TopHeader from '@/components/TopHeader'
import TopBar from '@/components/TopBar'

export default function Home() {
  return (
    <Layout hasSider className={styles.layout}>
      <Layout>
        <TopHeader />
        <Content className={styles.main}>
          <ChatGPT fetchPath="/api/chat-completion" />
        </Content>
        <FooterBar />
      </Layout>
    </Layout>
  )
}

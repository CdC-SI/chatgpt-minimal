import ChatGPT from '@/components/ChatGPT'
import { Layout } from 'antd'
import { Content } from 'antd/lib/layout/layout'

import FooterBar from '@/components/FooterBar'
import TopHeader from '@/components/TopHeader'
import TopBar from '@/components/TopBar'

import styles from './index.module.less'

export default function Home() {
  return (
    <Layout hasSider className={styles.layout}>
      <Layout>
        <TopBar />
        <TopHeader />
        <Content className={styles.main}>
          <ChatGPT fetchPath="/api/chat-completion" />
        </Content>
        <FooterBar />
      </Layout>
    </Layout>
  )
}

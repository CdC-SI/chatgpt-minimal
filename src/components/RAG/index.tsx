import React from 'react'

import { RAGProps, ChatRole } from './interface'
import MessageItem from './MessageItem'
import SendBar from './SendBar'
import { useRAG } from './useRAG'

import './index.less'
import 'highlight.js/styles/atom-one-dark.css'

const RAG = (props: RAGProps) => {
  const { loading, disabled, messages, currentMessage, onSend, onClear, onStop } = useRAG(props)

  return (
    <div className="chat-wrapper">
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
      {currentMessage.current && (
        <MessageItem message={{ content: currentMessage.current, role: ChatRole.Assistant }} />
      )}
      <SendBar
        loading={loading}
        disabled={disabled}
        onSend={onSend}
        onClear={onClear}
        onStop={onStop}
      />
    </div>
  )
}

export default RAG

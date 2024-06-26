import React, { useEffect, useRef } from 'react'

import { RAGProps, ChatRole } from './interface'
import MessageItem from './MessageItem'
import SendBar from './SendBar'
import { useRAG } from './useRAG'

import './index.less'
import 'highlight.js/styles/atom-one-dark.css'

const RAG = (props: RAGProps) => {
  const { loading, disabled, messages, currentMessage, onSend, onClear, onStop } = useRAG(props)

  const chatEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }
  useEffect(scrollToBottom, [messages]);

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
      <div ref={chatEndRef} />
    </div>
  )
}

export default RAG

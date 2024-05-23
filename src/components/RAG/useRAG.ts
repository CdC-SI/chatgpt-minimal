import { useEffect, useReducer, useRef, useState } from 'react'

import ClipboardJS from 'clipboard'
import { throttle } from 'lodash-es'

import { RAGProps, ChatMessage, ChatRole } from './interface'

const scrollDown = throttle(
  () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  },
  300,
  {
    leading: true,
    trailing: false
  }
)

// Make RAG API call
async function fetchRAGResponse(userQuery: string, controller: AbortController | null) {
  try {
    const response = await fetch('http://localhost:8010/rag/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: userQuery}),
      signal: controller?.signal
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = response.body;
    return data!.getReader();
  } catch (error) {
    console.error('Failed to fetch RAG Response:', error);
    return '';  // Return empty string in case of an error
  }
}

const requestMessage = async (
  messages: ChatMessage[],
  controller: AbortController | null
) => {

  const userQuery = messages[messages.length - 1]?.content;

  // Fetch RAG response from the /rag/process API endpoint
  const reader = await fetchRAGResponse(userQuery, controller);

  if (!reader) {
    throw new Error('No data');
  }

  return reader;
}

export const useRAG = (props: RAGProps) => {
  const { fetchPath } = props
  const [, forceUpdate] = useReducer((x) => !x, false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [disabled] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const controller = useRef<AbortController | null>(null)
  const currentMessage = useRef<string>('')

  const archiveCurrentMessage = () => {
    const content = currentMessage.current
    currentMessage.current = ''
    setLoading(false)
    if (content) {
      setMessages((messages) => {
        return [
          ...messages,
          {
            content,
            role: ChatRole.Assistant
          }
        ]
      })
      scrollDown()
    }
  }

  const fetchMessage = async (messages: ChatMessage[]) => {
    try {
      currentMessage.current = '';
      controller.current = new AbortController();
      setLoading(true);

      const reader = await requestMessage(messages, controller.current);
      const decoder = new TextDecoder('utf-8');
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        if (value) {
          const char = decoder.decode(value);
          if (char) {
            // Check if the character is the special end token indicating the source URL
            if (char.includes("<a href=")) {
              currentMessage.current += char;
              forceUpdate();
              scrollDown();
              break;
            } else {
              currentMessage.current += char;
              forceUpdate();
              scrollDown();
            }
          }
        }
        done = readerDone;
      }

      archiveCurrentMessage();
    } catch (e) {
      console.error(e);
      setLoading(false);
      return;
    }
  };

  const onStop = () => {
    if (controller.current) {
      controller.current.abort()
      archiveCurrentMessage()
    }
  }

  const onSend = (message: ChatMessage) => {
    setMessages(prevMessages => [...prevMessages, message]);

    if (!message.isFromSuggestion) {
      fetchMessage([...messages, message]);
    }
  };

  const onClear = () => {
    setMessages([])
  }

  useEffect(() => {
    new ClipboardJS('.chat-wrapper .copy-btn')
  }, [])

  return {
    loading,
    disabled,
    messages,
    currentMessage,
    onSend,
    onClear,
    onStop
  }
}

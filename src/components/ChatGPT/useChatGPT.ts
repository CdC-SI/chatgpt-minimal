import { useEffect, useReducer, useRef, useState } from 'react'

import ClipboardJS from 'clipboard'
import { throttle } from 'lodash-es'

import { ChatGPTProps, ChatMessage, ChatRole } from './interface'

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

// Get context docs API call
async function fetchContextDocs(userQuery: string) {
  try {
    const response = await fetch('http://localhost:8000/docs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: userQuery})
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch context docs:', error);
    return '';  // Return empty string in case of an error
  }
}

const requestMessage = async (
  url: string,
  messages: ChatMessage[],
  controller: AbortController | null
) => {
  // Fetch context docs from the /get_docs API
  let userQuery = messages[messages.length - 1]?.content;
  let ragResponse = await fetchContextDocs(userQuery);
  let systemPrompt = "Vous êtes un assistant serviable et attentioné qui répond aux questions de la population au sujet des assurances sociales en Suisse. Répondez uniquement sur la base des documents contextuels fournis. Utilisez TOUTE l'information à disposition dans les documents contextuels fournis pour votre réponse. Si vous ne pouvez pas baser votre réponse uniquement sur les documents contextuels fournis, répondez « Désolé, je ne peux pas répondre à cette question »."

  const RAGMessages = messages.map(message => ({
    ...message,
    content: systemPrompt + '\n\n' + 'CONTEXTE: ' + ragResponse.contextDocs + '\n\n' + 'QUESTION: ' + userQuery + 'REPONSE: '
  }));

  let currentMessage = systemPrompt + '\n\n' + 'CONTEXTE: ' + ragResponse.contextDocs + '\n\n' + 'QUESTION: ' + userQuery + 'REPONSE: '
  console.log(`RAG Messages: ${JSON.stringify(currentMessage)}`);

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      messages: RAGMessages
    }),
    signal: controller?.signal
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = response.body;

  if (!data) {
    throw new Error('No data');
  }

  return { sourceUrl: ragResponse.sourceUrl, reader: data.getReader() };
}

export const useChatGPT = (props: ChatGPTProps) => {
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
      currentMessage.current = ''
      controller.current = new AbortController()
      setLoading(true)

      const { sourceUrl, reader } = await requestMessage(fetchPath, messages, controller.current)
      const decoder = new TextDecoder('utf-8')
      let done = false

      while (!done) {
        const { value, done: readerDone } = await reader.read()
        if (value) {
          const char = decoder.decode(value)
          if (char === '\n' && currentMessage.current.endsWith('\n')) {
            continue
          }
          if (char) {
            currentMessage.current += char
            forceUpdate()
          }
          scrollDown()
        }
        done = readerDone

      }

      currentMessage.current += `\n\n<a href="${sourceUrl}" target="_blank">${sourceUrl}</a>`;
      archiveCurrentMessage()
    } catch (e) {
      console.error(e)
      setLoading(false)
      return
    }
  }

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

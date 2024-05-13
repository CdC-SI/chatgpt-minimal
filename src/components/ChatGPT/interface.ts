import type { ReactNode } from 'react'

export enum ChatRole {
  Assistant = 'assistant',
  User = 'user',
  System = 'system'
}

export interface ChatGPTProps {
  fetchPath: string
}

export interface ChatMessage {
  content: string
  role: ChatRole
  isFromSuggestion?: boolean
}

export interface ChatMessageItemProps {
  message: ChatMessage
}

export interface SendBarProps {
  loading: boolean
  disabled: boolean
  onSend: (message: ChatMessage) => void
  onClear: () => void
  onStop: () => void
}

export interface ShowProps {
  loading?: boolean
  fallback?: ReactNode
  children?: ReactNode
}

export interface Suggestion {
  question: string;
  answer: string;
  url: string;
}

export interface SuggestionsFetchRequestedParams {
  value: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  answer: string;
  url: string;
  children?: React.ReactNode;
}
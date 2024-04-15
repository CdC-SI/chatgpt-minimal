import React, { KeyboardEventHandler, useState } from 'react'
import Autosuggest from 'react-autosuggest'
import { ClearOutlined, SendOutlined } from '@ant-design/icons'
import { ChatRole, SendBarProps } from './interface'
import Show from './Show'

const SendBar = (props: SendBarProps) => {
  const { loading, disabled, onSend, onClear, onStop } = props

  const [suggestions, setSuggestions] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')

  const fixedSuggestions = ['Suggestion 1', 'Suggestion 2', 'Suggestion 3']

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0 ? [] : fixedSuggestions.filter(item =>
      item.toLowerCase().slice(0, inputLength) === inputValue
    )
  }

  const onSuggestionsFetchRequested = ({ value }: any) => {
    setSuggestions(getSuggestions(value))
  }

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }

  const getSuggestionValue = (suggestion: string) => suggestion

  const renderSuggestion = (suggestion: string) => (
    <div>
      {suggestion}
    </div>
  )

  const inputProps = {
    placeholder: "Type a message",
    value: inputValue,
    className: "input",
    onChange: (_: any, { newValue }: any) => {
      setInputValue(newValue)
    },
    onKeyDown: (e: KeyboardEventHandler<HTMLTextAreaElement>) => {
      if (e.shiftKey) {
        return
      }

      if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
        handleSend()
      }
    }
  }

  const handleClear = () => {
    setInputValue('')
    onClear()
  }

  const handleSend = () => {
    if (inputValue) {
      setInputValue('')
      onSend({
        content: inputValue,
        role: ChatRole.User
      })
    }
  }

  return (
    <Show
      fallback={
        <div className="thinking">
          <span>Please wait ...</span>
          <div className="stop" onClick={onStop}>
            Stop
          </div>
        </div>
      }
      loading={loading}
    >
      <div className="send-bar">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        <button className="button" title="Send" disabled={disabled} onClick={handleSend}>
          <SendOutlined />
        </button>
        <button className="button" title="Clear" disabled={disabled} onClick={handleClear}>
          <ClearOutlined />
        </button>
      </div>
    </Show>
  )
}

export default SendBar
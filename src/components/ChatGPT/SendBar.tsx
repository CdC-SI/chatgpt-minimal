import React, { KeyboardEventHandler, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { ClearOutlined, SendOutlined } from '@ant-design/icons';
import { ChatRole, SendBarProps } from './interface';
import Show from './Show';
import { REACT_APP_QUERY_AUTOCOMPLETE_API_URL } from './const';

const SendBar = (props: SendBarProps) => {
  const { loading, disabled, onSend, onClear, onStop } = props;

  const [suggestions, setSuggestions] = useState<{ question: string, answer: string }[]>([]);
  const [inputValue, setInputValue] = useState('');

  const fetchSuggestions = async (value: string) => {
    const url = `${REACT_APP_QUERY_AUTOCOMPLETE_API_URL}/search/?question=${encodeURIComponent(value)}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('No matching suggestions found.');
      }
      const data = await response.json();
      return data.map(item => ({ question: item.question, answer: item.answer }));
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
      return [];
    }
  }

  const onSuggestionsFetchRequested = async ({ value }) => {
    const fetchedSuggestions = await fetchSuggestions(value);
    setSuggestions(fetchedSuggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = suggestion => suggestion.question;

  const renderSuggestion = suggestion => (
    <div>
      {suggestion.question}
    </div>
  );

  const onSuggestionSelected = (event, { suggestion }) => {
    setInputValue('');

    // Display question in chat
    onSend({
      content: suggestion.question,
      role: ChatRole.User,
      isFromSuggestion: true // Ensures no OpenAI API call is triggered
    });

    // Display answer in chat with short delay
    setTimeout(() => {
      onSend({
        content: suggestion.answer,
        role: ChatRole.Assistant,
        isFromSuggestion: true  // Ensures no OpenAI API call is triggered
      });
    }, 100); // Small delay to ensure messages appear in order
  };

  const inputProps = {
    placeholder: "Type a message",
    value: inputValue,
    className: "input",
    onChange: (_: any, { newValue }: any) => {
      setInputValue(newValue);
    },
    onKeyDown: (e: KeyboardEventHandler<HTMLTextAreaElement>) => {
      if (e.shiftKey) {
        return;
      }

      if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
        handleSend();
      }
    }
  };

  const handleClear = () => {
    setInputValue('');
    onClear();
  };

  const handleSend = () => {
    if (inputValue) {
      setInputValue('');
      onSend({
        content: inputValue,
        role: ChatRole.User
      });
    }
  };

  const theme = {
    suggestionsList: {
      listStyleType: 'none',
      margin: 0,
      padding: 0,
    },
    suggestion: {
      padding: '5px',
    },
    container: {
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },
  };

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
          onSuggestionSelected={onSuggestionSelected}
          inputProps={inputProps}
          theme={theme}
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
};

export default SendBar;
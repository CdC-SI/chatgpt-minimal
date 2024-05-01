import React, { useState } from 'react';
import { renderToString } from 'react-dom/server';
import Autosuggest from 'react-autosuggest';
import { ClearOutlined, SendOutlined } from '@ant-design/icons';
import { ChatRole, SendBarProps, Suggestion, SuggestionsFetchRequestedParams } from './interface';
import Show from './Show';
import { REACT_APP_QUERY_AUTOCOMPLETE_API_URL } from './const';

const SendBar = (props: SendBarProps) => {
  const { loading, disabled, onSend, onClear, onStop } = props;

  const [suggestions, setSuggestions] = useState<{ question: string, answer: string, url: string }[]>([]);
  const [inputValue, setInputValue] = useState('');

  const fetchSuggestions = async (value: string) => {
    const url = `${REACT_APP_QUERY_AUTOCOMPLETE_API_URL}/search/?question=${encodeURIComponent(value)}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('No matching suggestions found.');
      }
      const data = await response.json();
      return data.map((item: Suggestion) => ({ question: item.question, answer: item.answer, url: item.url}));
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
      return [];
    }
  }

  const onSuggestionsFetchRequested = async ({ value }: SuggestionsFetchRequestedParams) => {
    const fetchedSuggestions = await fetchSuggestions(value);
    setSuggestions(fetchedSuggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion: Suggestion) => suggestion.question;

  const renderSuggestion = (suggestion: Suggestion) => (
    <div>
      {suggestion.question}
    </div>
  );

  const onSuggestionSelected = (
    event: React.SyntheticEvent,
    { suggestion }: { suggestion: Suggestion }
    ) => {
    setInputValue('');

    // Display question in chat
    onSend({
      content: suggestion.question,
      role: ChatRole.User,
      isFromSuggestion: true // Ensure no OpenAI API call is triggered
    });

    // Display answer in chat with short delay and clickable link (answer source)
    setTimeout(() => {

      const contentString = renderToString(
        <>
          {suggestion.answer}
          <br />
          <br />
          <a href={suggestion.url} target="_blank" rel="noopener noreferrer">
            {suggestion.url}
          </a>
        </>
      );

      onSend({
        content: contentString,
        role: ChatRole.Assistant,
        isFromSuggestion: true  // Ensure no OpenAI API call is triggered
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
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
        <div className="autosuggest">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            onSuggestionSelected={onSuggestionSelected}
            inputProps={inputProps}
          />
        </div>
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
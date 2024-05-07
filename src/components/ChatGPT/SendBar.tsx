import React, { useState } from 'react';
import { renderToString } from 'react-dom/server';
import Autosuggest from 'react-autosuggest';
import { ChatRole, SendBarProps, Suggestion, SuggestionsFetchRequestedParams } from './interface';
import Show from './Show';
import { REACT_APP_QUERY_AUTOCOMPLETE_API_URL } from './const';
import Modal from '../SurveyPipeline/Modal';

const SendBar = (props: SendBarProps) => {
  const { loading, disabled, onSend, onClear, onStop } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [suggestions, setSuggestions] = useState<{ question: string, answer: string, url: string }[]>([]);
  const [inputValue, setInputValue] = useState('');

  const fetchSuggestions = async (value: string) => {
    const url = `${REACT_APP_QUERY_AUTOCOMPLETE_API_URL}/search/?question=${encodeURIComponent(value)}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Keine passenden Vorschläge gefunden.'); //EN: No matching suggestions found.
      }
      const data = await response.json();
      return data.map((item: Suggestion) => ({ question: item.question, answer: item.answer, url: item.url}));
    } catch (error) {
      console.error('Fehler beim Abrufen von Vorschlägen:', error); //EN: Failed to fetch suggestions:
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
    placeholder: "Nachricht eingeben", //EN: Type a message
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

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  return (
    <Show
      fallback={
        <div className="thinking">
          <span>Bitte warten ...</span>
          <span hidden>DE: Please wait ...</span>
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
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m4.30225 10.63623 5.8081 3.01465.02393 2.96484 1.32031-1.84863 3.9043 3.40625 4.77148-13.74316zm1.81152.09571 11.68-4.58008-7.37164 6.8164zm4.752 3.56933-.00049-.04785.02149.01855zm4.14942 2.57715-3.97065-3.46436 7.61835-7.04443z" />
          </svg>
        </button>
        <button className="button" title="Clear" disabled={disabled} onClick={handleClear}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m15.20188 5.61579-1.30994-1.53223h-3.00049l-1.30994 1.53223h-5.149v.75h1.1831v14.30078h13.519v-14.30078h1.13086v-.75zm-3.96473-.78223h2.30909l.66894.78223h-3.647zm7.14746 15.083h-12.01904v-13.55077h12.019z" />
            <path d="m7.39585 7.83356h.75v10.92578h-.75z" />
            <path d="m9.68491 7.83356h.75v10.92578h-.75z" />
            <path d="m11.97397 7.83356h.75v10.92578h-.75z" />
            <path d="m14.26303 7.83356h.75v10.92578h-.75z" />
            <path d="m16.5521 7.83356h.75v10.92578h-.75z" />
          </svg>
        </button>
        <button className="button" title="Edit" disabled={disabled} onClick={handleEdit}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m17.11768 5.09522-11.31495 11.36132-.57714 3.06836 3.0791-.5664 11.31982-11.36719zm.002 1.06054 1.44432 1.4375-1.873 1.88086-1.44869-1.43335zm-9.1812 12.10743-1.77348.32617.332-1.76758 8.21606-8.24951 1.44867 1.4331z" />
          </svg>
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
        </Modal>
      </div>
    </Show>
  )
};

export default SendBar;
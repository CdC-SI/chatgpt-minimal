import process from 'process';

// Determine if running in a GitHub Codespace by checking if CODESPACE_NAME is defined
const inCodespace = !!process.env.CODESPACE_NAME;

// Set the API URL based on environment
export const REACT_APP_QUERY_AUTOCOMPLETE_API_URL = inCodespace ?
  `https://${process.env.CODESPACE_NAME}-8000.app.github.dev` :
  'localhost:8000';
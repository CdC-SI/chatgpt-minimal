// We need this file to define the url for the /search endpoint for the autocomplete feature
// Currently, we are unable to import the REACT_APP_QUERY_AUTOCOMPLETE_API_URL from the .env file in the eak-copilot repo (docker-compose)

export const REACT_APP_QUERY_AUTOCOMPLETE_API_URL =
  process.env.REACT_APP_QUERY_AUTOCOMPLETE_API_URL || 'http://localhost:8000';
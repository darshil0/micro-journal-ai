/**
 * API utilities for communicating with the backend
 * Includes error handling, retry logic, and request management
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_TIMEOUT = 30000; // 30 seconds

/**
 * Custom error class for API errors
 */
export class APIError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.details = details;
  }
}

/**
 * Make a fetch request with timeout
 * @param {string} url
 * @param {Object} options
 * @param {number} timeout
 * @returns {Promise<Response>}
 */
async function fetchWithTimeout(url, options = {}, timeout = API_TIMEOUT) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new APIError('Request timeout', 408, 'The request took too long to complete');
    }
    throw error;
  }
}

/**
 * Check if the backend is healthy
 * @returns {Promise<boolean>}
 */
export async function checkHealth() {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/api/health`, {
      method: 'GET',
    }, 5000);
    
    return response.ok;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
}

/**
 * Get AI insights for a journal entry
 * @param {string} entry - The journal entry text
 * @returns {Promise<Object>} AI insights object
 * @throws {APIError}
 */
export async function getAIInsights(entry) {
  if (!entry || typeof entry !== 'string' || entry.trim().length === 0) {
    throw new APIError('Invalid entry', 400, 'Entry cannot be empty');
  }
  
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/api/insights`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ entry: entry.trim() }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 429) {
        throw new APIError(
          'Too many requests',
          429,
          data.error || 'Please wait before trying again'
        );
      }
      
      if (response.status === 400) {
        throw new APIError(
          'Invalid request',
          400,
          data.error || 'Invalid journal entry'
        );
      }
      
      throw new APIError(
        'Request failed',
        response.status,
        data.error || 'An unexpected error occurred'
      );
    }
    
    // Validate response structure
    if (!data.success || !data.data) {
      throw new APIError(
        'Invalid response',
        500,
        'Received invalid response from server'
      );
    }
    
    const { mood, insights, reflection } = data.data;
    
    if (!mood || !Array.isArray(insights) || !reflection) {
      throw new APIError(
        'Invalid response format',
        500,
        'AI response is missing required fields'
      );
    }
    
    return data.data;
    
  } catch (error) {
    // Re-throw APIErrors as-is
    if (error instanceof APIError) {
      throw error;
    }
    
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new APIError(
        'Network error',
        0,
        'Unable to connect to the server. Please check your connection.'
      );
    }
    
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      throw new APIError(
        'Parse error',
        500,
        'Unable to parse server response'
      );
    }
    
    // Generic error
    throw new APIError(
      'Unknown error',
      500,
      error.message || 'An unexpected error occurred'
    );
  }
}

/**
 * Get AI insights with retry logic
 * @param {string} entry - The journal entry text
 * @param {number} maxRetries - Maximum number of retry attempts
 * @returns {Promise<Object>}
 */
export async function getAIInsightsWithRetry(entry, maxRetries = 2) {
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await getAIInsights(entry);
    } catch (error) {
      lastError = error;
      
      // Don't retry on client errors (4xx)
      if (error.status >= 400 && error.status < 500) {
        throw error;
      }
      
      // Don't retry on the last attempt
      if (attempt === maxRetries) {
        break;
      }
      
      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
}

/**
 * Create a debounced version of the insights function
 * Useful for auto-save or real-time analysis features
 * @param {Function} func
 * @param {number} delay
 * @returns {Function}
 */
export function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);
    
    return new Promise((resolve, reject) => {
      timeoutId = setTimeout(async () => {
        try {
          const result = await func(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
}

/**
 * Create a debounced version of getAIInsights
 * Usage: const debouncedGetInsights = createDebouncedInsights(2000);
 */
export const createDebouncedInsights = (delay = 2000) => {
  return debounce(getAIInsights, delay);
};

/**
 * Format API error for display to users
 * @param {Error} error
 * @returns {string}
 */
export function formatErrorMessage(error) {
  if (error instanceof APIError) {
    return error.details || error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
}

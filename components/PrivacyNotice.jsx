import { useState, useEffect } from 'react';

/**
 * PrivacyNotice Component
 * Displays important information about data storage and privacy
 */
export default function PrivacyNotice() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has seen the notice before
    const hasSeenNotice = localStorage.getItem('privacy_notice_seen');
    if (!hasSeenNotice) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('privacy_notice_seen', 'true');
    setIsDismissed(true);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className={`fixed bottom-4 right-4 max-w-md bg-blue-50 border border-blue-200 rounded-lg shadow-lg p-4 transition-opacity duration-300 z-50 ${
        isDismissed ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-blue-800">
            Privacy & Data Storage
          </h3>
          <div className="mt-2 text-sm text-blue-700">
            <p className="mb-2">
              Your journal entries are stored <strong>locally in your browser</strong>. 
              They are only sent to our server when requesting AI insights.
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Entries are never permanently stored on our servers</li>
              <li>AI analysis is powered by Anthropic's Claude</li>
              <li>Clearing browser data will delete all your entries</li>
              <li>We recommend exporting your data regularly</li>
            </ul>
          </div>
          
          <button
            onClick={handleDismiss}
            className="mt-3 text-sm font-medium text-blue-700 hover:text-blue-600 underline"
          >
            Got it, don't show again
          </button>
        </div>
        
        <div className="ml-3 flex-shrink-0">
          <button
            onClick={handleDismiss}
            className="inline-flex rounded-md p-1.5 text-blue-700 hover:bg-blue-100 focus:outline-none"
          >
            <span className="sr-only">Dismiss</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

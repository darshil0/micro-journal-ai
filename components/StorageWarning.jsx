import { useState, useEffect } from 'react';
import { checkStorageQuota, downloadEntriesAsFile } from '../utils/storageUtils';

/**
 * StorageWarning Component
 * Displays warnings when localStorage is approaching quota limits
 */
export default function StorageWarning() {
  const [storageStatus, setStorageStatus] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    checkStorage();
    
    // Check storage periodically
    const interval = setInterval(checkStorage, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const checkStorage = () => {
    const status = checkStorageQuota();
    setStorageStatus(status);
    
    // Auto-show if critical
    if (status.isCritical) {
      setDismissed(false);
    }
  };

  const handleExport = () => {
    downloadEntriesAsFile();
  };

  const handleDismiss = () => {
    setDismissed(true);
  };

  // Don't show if no warning or dismissed (unless critical)
  if (!storageStatus || (!storageStatus.isWarning && !storageStatus.isCritical)) {
    return null;
  }

  if (dismissed && !storageStatus.isCritical) {
    return null;
  }

  const isCritical = storageStatus.isCritical;
  const bgColor = isCritical ? 'bg-red-50' : 'bg-yellow-50';
  const borderColor = isCritical ? 'border-red-200' : 'border-yellow-200';
  const textColor = isCritical ? 'text-red-800' : 'text-yellow-800';
  const iconColor = isCritical ? 'text-red-600' : 'text-yellow-600';

  return (
    <div className={`${bgColor} border ${borderColor} rounded-lg p-4 mb-4`}>
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${iconColor}`}>
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        
        <div className="ml-3 flex-1">
          <h3 className={`text-sm font-medium ${textColor}`}>
            {isCritical ? 'Storage Almost Full!' : 'Storage Usage Warning'}
          </h3>
          <div className={`mt-2 text-sm ${textColor}`}>
            <p>
              Your browser storage is {storageStatus.percentage}% full ({storageStatus.sizeFormatted} used).
              {isCritical 
                ? ' You may not be able to save new entries.' 
                : ' Consider exporting and deleting old entries.'}
            </p>
          </div>
          
          <div className="mt-3 flex gap-3">
            <button
              onClick={handleExport}
              className={`text-sm font-medium ${
                isCritical 
                  ? 'text-red-700 hover:text-red-600' 
                  : 'text-yellow-700 hover:text-yellow-600'
              } underline`}
            >
              Export Entries
            </button>
            
            {!isCritical && (
              <button
                onClick={handleDismiss}
                className="text-sm font-medium text-gray-600 hover:text-gray-500"
              >
                Dismiss
              </button>
            )}
          </div>
        </div>
        
        {!isCritical && (
          <div className="ml-3 flex-shrink-0">
            <button
              onClick={handleDismiss}
              className={`inline-flex rounded-md p-1.5 ${textColor} hover:bg-yellow-100 focus:outline-none`}
            >
              <span className="sr-only">Dismiss</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

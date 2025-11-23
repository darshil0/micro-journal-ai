import { useState, useRef } from 'react';
import { downloadEntriesAsFile, importEntries } from '../utils/storageUtils';

/**
 * ExportImport Component
 * Allows users to export and import their journal entries
 */
export default function ExportImport({ onImportComplete }) {
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState(null);
  const fileInputRef = useRef(null);

  const handleExport = () => {
    try {
      downloadEntriesAsFile();
      setMessage({ type: 'success', text: 'Entries exported successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to export entries.' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setMessage(null);

    try {
      const text = await file.text();
      const result = importEntries(text);
      
      setMessage({
        type: 'success',
        text: `Successfully imported ${result.imported} entries${
          result.skipped > 0 ? ` (${result.skipped} duplicates skipped)` : ''
        }`,
      });
      
      // Notify parent component
      if (onImportComplete) {
        onImportComplete(result);
      }
      
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to import entries. Please check the file format.',
      });
    } finally {
      setImporting(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Clear message after 5 seconds
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Backup & Restore
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="flex-1">
              <p className="text-sm text-gray-700 font-medium">Export Entries</p>
              <p className="text-xs text-gray-500 mt-1">
                Download all your journal entries as a JSON file
              </p>
            </div>
            <button
              onClick={handleExport}
              className="ml-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Export
            </button>
          </div>

          <div className="border-t border-gray-200 pt-3">
            <div className="flex items-start">
              <div className="flex-1">
                <p className="text-sm text-gray-700 font-medium">Import Entries</p>
                <p className="text-xs text-gray-500 mt-1">
                  Restore entries from a previously exported file
                </p>
              </div>
              <button
                onClick={handleImportClick}
                disabled={importing}
                className="ml-4 px-4 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {importing ? 'Importing...' : 'Import'}
              </button>
            </div>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {message && (
        <div
          className={`rounded-lg p-4 ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}
        >
          <div className="flex items-center">
            {message.type === 'success' ? (
              <svg className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <p className={`ml-3 text-sm font-medium ${
              message.type === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>
              {message.text}
            </p>
          </div>
        </div>
      )}

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Important Reminder
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Clearing your browser data will permanently delete all journal entries. 
                Export your data regularly to prevent data loss.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

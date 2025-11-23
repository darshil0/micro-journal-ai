/**
 * Storage utilities for managing journal entries in localStorage
 * with quota monitoring and error handling
 */

const STORAGE_KEY = 'journal_entries';
const STORAGE_WARNING_THRESHOLD = 4 * 1024 * 1024; // 4MB
const STORAGE_CRITICAL_THRESHOLD = 4.5 * 1024 * 1024; // 4.5MB

/**
 * Calculate the size of localStorage usage in bytes
 * @returns {number} Size in bytes
 */
export function getStorageSize() {
  let total = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }
  return total * 2; // UTF-16 uses 2 bytes per character
}

/**
 * Check if storage is approaching quota limits
 * @returns {Object} Status object with size info and warnings
 */
export function checkStorageQuota() {
  const size = getStorageSize();
  const percentage = (size / (5 * 1024 * 1024)) * 100; // Assume 5MB limit
  
  return {
    size,
    sizeFormatted: formatBytes(size),
    percentage: percentage.toFixed(1),
    isWarning: size > STORAGE_WARNING_THRESHOLD,
    isCritical: size > STORAGE_CRITICAL_THRESHOLD,
  };
}

/**
 * Format bytes to human-readable string
 * @param {number} bytes
 * @returns {string}
 */
export function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Get all journal entries from localStorage
 * @returns {Array} Array of journal entries
 */
export function getEntries() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    const entries = JSON.parse(data);
    return Array.isArray(entries) ? entries : [];
  } catch (error) {
    console.error('Error reading entries from storage:', error);
    return [];
  }
}

/**
 * Save journal entries to localStorage
 * @param {Array} entries - Array of journal entries
 * @throws {Error} If quota exceeded or storage fails
 */
export function saveEntries(entries) {
  try {
    const data = JSON.stringify(entries);
    
    // Check if this will exceed quota
    const estimatedSize = data.length * 2;
    if (estimatedSize > 4.5 * 1024 * 1024) {
      throw new Error('QUOTA_EXCEEDED');
    }
    
    localStorage.setItem(STORAGE_KEY, data);
  } catch (error) {
    if (error.name === 'QuotaExceededError' || error.message === 'QUOTA_EXCEEDED') {
      throw new Error('Storage quota exceeded. Please delete some old entries or export your data.');
    }
    throw new Error('Failed to save entries: ' + error.message);
  }
}

/**
 * Add a new journal entry
 * @param {Object} entry - Journal entry object
 * @returns {Object} Updated entry with ID and timestamp
 */
export function addEntry(entry) {
  const entries = getEntries();
  
  const newEntry = {
    ...entry,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
  };
  
  entries.unshift(newEntry); // Add to beginning
  saveEntries(entries);
  
  return newEntry;
}

/**
 * Update an existing journal entry
 * @param {string} id - Entry ID
 * @param {Object} updates - Fields to update
 * @returns {boolean} Success status
 */
export function updateEntry(id, updates) {
  const entries = getEntries();
  const index = entries.findIndex(entry => entry.id === id);
  
  if (index === -1) {
    return false;
  }
  
  entries[index] = {
    ...entries[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  saveEntries(entries);
  return true;
}

/**
 * Delete a journal entry
 * @param {string} id - Entry ID
 * @returns {boolean} Success status
 */
export function deleteEntry(id) {
  const entries = getEntries();
  const filtered = entries.filter(entry => entry.id !== id);
  
  if (filtered.length === entries.length) {
    return false; // Entry not found
  }
  
  saveEntries(filtered);
  return true;
}

/**
 * Export all entries as JSON
 * @returns {string} JSON string of all entries
 */
export function exportEntries() {
  const entries = getEntries();
  const exportData = {
    exportDate: new Date().toISOString(),
    version: '2.1.2',
    entriesCount: entries.length,
    entries,
  };
  
  return JSON.stringify(exportData, null, 2);
}

/**
 * Import entries from JSON
 * @param {string} jsonString - JSON string to import
 * @returns {Object} Result with success status and count
 */
export function importEntries(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    
    if (!data.entries || !Array.isArray(data.entries)) {
      throw new Error('Invalid import format');
    }
    
    const currentEntries = getEntries();
    const existingIds = new Set(currentEntries.map(e => e.id));
    
    // Only import entries that don't already exist
    const newEntries = data.entries.filter(e => !existingIds.has(e.id));
    
    if (newEntries.length === 0) {
      return { success: true, imported: 0, skipped: data.entries.length };
    }
    
    const mergedEntries = [...currentEntries, ...newEntries]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    saveEntries(mergedEntries);
    
    return {
      success: true,
      imported: newEntries.length,
      skipped: data.entries.length - newEntries.length,
    };
  } catch (error) {
    throw new Error('Import failed: ' + error.message);
  }
}

/**
 * Clear all journal entries (with confirmation)
 * @returns {boolean} Success status
 */
export function clearAllEntries() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing entries:', error);
    return false;
  }
}

/**
 * Download entries as a JSON file
 */
export function downloadEntriesAsFile() {
  const jsonString = exportEntries();
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `journal_backup_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

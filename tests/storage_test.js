import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  getEntries,
  saveEntries,
  addEntry,
  updateEntry,
  deleteEntry,
  exportEntries,
  importEntries,
  clearAllEntries,
  checkStorageQuota,
} from '../src/utils/storageUtils';

/**
 * Storage Utilities Tests
 */

describe('Storage Utils', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    // Clean up after each test
    localStorage.clear();
  });

  describe('getEntries', () => {
    it('should return empty array when no entries exist', () => {
      const entries = getEntries();
      expect(entries).toEqual([]);
    });

    it('should return entries from localStorage', () => {
      const testEntries = [
        { id: '1', text: 'Entry 1', timestamp: new Date().toISOString() },
        { id: '2', text: 'Entry 2', timestamp: new Date().toISOString() },
      ];
      localStorage.setItem('journal_entries', JSON.stringify(testEntries));

      const entries = getEntries();
      expect(entries).toEqual(testEntries);
    });

    it('should handle corrupted data gracefully', () => {
      localStorage.setItem('journal_entries', 'invalid json');
      const entries = getEntries();
      expect(entries).toEqual([]);
    });
  });

  describe('saveEntries', () => {
    it('should save entries to localStorage', () => {
      const testEntries = [
        { id: '1', text: 'Entry 1' },
      ];
      
      saveEntries(testEntries);
      
      const stored = JSON.parse(localStorage.getItem('journal_entries'));
      expect(stored).toEqual(testEntries);
    });

    it('should throw error if quota exceeded', () => {
      const largeEntries = Array(1000).fill(null).map((_, i) => ({
        id: i.toString(),
        text: 'x'.repeat(10000), // 10KB per entry
      }));

      expect(() => saveEntries(largeEntries)).toThrow();
    });
  });

  describe('addEntry', () => {
    it('should add new entry with ID and timestamp', () => {
      const entry = { text: 'Test entry', mood: 'happy' };
      const newEntry = addEntry(entry);

      expect(newEntry.id).toBeDefined();
      expect(newEntry.timestamp).toBeDefined();
      expect(newEntry.text).toBe('Test entry');
      expect(newEntry.mood).toBe('happy');

      const entries = getEntries();
      expect(entries).toHaveLength(1);
      expect(entries[0]).toEqual(newEntry);
    });

    it('should add new entries at the beginning', () => {
      addEntry({ text: 'First' });
      addEntry({ text: 'Second' });

      const entries = getEntries();
      expect(entries[0].text).toBe('Second');
      expect(entries[1].text).toBe('First');
    });
  });

  describe('updateEntry', () => {
    it('should update existing entry', () => {
      const entry = addEntry({ text: 'Original' });
      
      const success = updateEntry(entry.id, { text: 'Updated' });
      expect(success).toBe(true);

      const entries = getEntries();
      expect(entries[0].text).toBe('Updated');
      expect(entries[0].updatedAt).toBeDefined();
    });

    it('should return false for non-existent entry', () => {
      const success = updateEntry('nonexistent', { text: 'Updated' });
      expect(success).toBe(false);
    });
  });

  describe('deleteEntry', () => {
    it('should delete existing entry', () => {
      const entry = addEntry({ text: 'To Delete' });
      
      const success = deleteEntry(entry.id);
      expect(success).toBe(true);

      const entries = getEntries();
      expect(entries).toHaveLength(0);
    });

    it('should return false for non-existent entry', () => {
      const success = deleteEntry('nonexistent');
      expect(success).toBe(false);
    });
  });

  describe('exportEntries', () => {
    it('should export entries as JSON string', () => {
      addEntry({ text: 'Entry 1' });
      addEntry({ text: 'Entry 2' });

      const exported = exportEntries();
      const data = JSON.parse(exported);

      expect(data.version).toBe('2.1.2');
      expect(data.entriesCount).toBe(2);
      expect(data.entries).toHaveLength(2);
      expect(data.exportDate).toBeDefined();
    });

    it('should export empty array if no entries', () => {
      const exported = exportEntries();
      const data = JSON.parse(exported);

      expect(data.entriesCount).toBe(0);
      expect(data.entries).toEqual([]);
    });
  });

  describe('importEntries', () => {
    it('should import valid entries', () => {
      const exportData = {
        version: '2.1.2',
        entriesCount: 2,
        entries: [
          { id: '1', text: 'Entry 1', timestamp: new Date().toISOString() },
          { id: '2', text: 'Entry 2', timestamp: new Date().toISOString() },
        ],
      };

      const result = importEntries(JSON.stringify(exportData));
      
      expect(result.success).toBe(true);
      expect(result.imported).toBe(2);
      expect(result.skipped).toBe(0);

      const entries = getEntries();
      expect(entries).toHaveLength(2);
    });

    it('should skip duplicate entries', () => {
      const entry = addEntry({ text: 'Existing' });
      
      const exportData = {
        entries: [entry],
      };

      const result = importEntries(JSON.stringify(exportData));
      
      expect(result.imported).toBe(0);
      expect(result.skipped).toBe(1);
    });

    it('should throw error for invalid format', () => {
      expect(() => importEntries('invalid json')).toThrow();
      expect(() => importEntries('{}')).toThrow('Invalid import format');
    });
  });

  describe('checkStorageQuota', () => {
    it('should return storage status', () => {
      addEntry({ text: 'Test entry' });
      
      const status = checkStorageQuota();
      
      expect(status.size).toBeGreaterThan(0);
      expect(status.sizeFormatted).toBeDefined();
      expect(status.percentage).toBeDefined();
      expect(typeof status.isWarning).toBe('boolean');
      expect(typeof status.isCritical).toBe('boolean');
    });
  });

  describe('clearAllEntries', () => {
    it('should clear all entries', () => {
      addEntry({ text: 'Entry 1' });
      addEntry({ text: 'Entry 2' });

      const success = clearAllEntries();
      expect(success).toBe(true);

      const entries = getEntries();
      expect(entries).toEqual([]);
    });
  });
});

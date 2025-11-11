import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock the non-standard window.storage API
const storageMock = (() => {
  let store = {};
  return {
    get: vi.fn((key) => {
      return store[key] ? { value: store[key] } : null;
    }),
    set: vi.fn((key, value) => {
      store[key] = value;
    }),
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'storage', {
  value: storageMock,
});

/**
 * useLocalStorage.js
 * 
 * Custom hook to sync state with the browser's LocalStorage.
 * allowing data to persist even if the user refreshes the page.
 */

import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
    // 1. Initialize State
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    // 2. Return a wrapped version of useState's setter function
    const setValue = (value) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;

            // Save state
            setStoredValue(valueToStore);

            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue];
};

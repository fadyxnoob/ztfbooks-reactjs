/**
 * Set an item in localStorage.
 * @param {string} key - The key under which the value will be stored.
 * @param {any} value - The value to store (will be stringified if not a string).
 */
export const setLocalStorage = (key, value) => {
    try {
        const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);
        localStorage.setItem(key, valueToStore);
    } catch (error) {
        console.error('Error setting localStorage item:', error);
    }
};

/**
 * Get an item from localStorage.
 * @param {string} key - The key of the item to retrieve.
 * @returns {any} - The parsed value (if JSON) or the raw string value.
 */
export const getLocalStorage = (key) => {
    try {
        const value = localStorage.getItem(key);
        if (value === null) return null; // Return null if the key doesn't exist

        // Try to parse the value as JSON, fallback to raw value if parsing fails
        try {
            return JSON.parse(value);
        } catch {
            return value;
        }
    } catch (error) {
        console.error('Error getting localStorage item:', error);
        return null;
    }
};

/**
 * Remove an item from localStorage.
 * @param {string} key - The key of the item to remove.
 */
export const removeLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing localStorage item:', error);
    }
};

/**
 * Clear all items from localStorage.
 */
export const clearLocalStorage = () => {
    try {
        localStorage.clear();
    } catch (error) {
        console.error('Error clearing localStorage:', error);
    }
};


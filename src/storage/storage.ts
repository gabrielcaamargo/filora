import { Storage } from "./storageTypes";
import { MMKVStorage } from "./implementation/mmkvImplementation";

/**
 * Centralized storage instance for the application.
 *
 * This storage interface provides a unified way to persist data across app sessions.
 * Any storage service can be used as long as it implements the Storage interface,
 * making it easy to swap storage implementations without changing application code.
 *
 * @example
 * ```typescript
 * // Store data
 * await storage.setItem('user-preferences', { theme: 'dark' });
 *
 * // Retrieve data
 * const preferences = await storage.getItem('user-preferences');
 *
 * // Remove data
 * await storage.removeItem('user-preferences');
 * ```
 *
 * @see {@link Storage} for the interface definition
 */
export const storage: Storage = MMKVStorage;

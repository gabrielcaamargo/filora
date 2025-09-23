import { Storage } from "./storageTypes";

export let storage: Storage;

export function initializeStorage(storageImplementation: Storage) {
  storage = storageImplementation;
}

import { Storage } from "./storageTypes";

let storage: Storage;

export function initializeStorage(storageImplementation: Storage) {
  storage = storageImplementation;
}

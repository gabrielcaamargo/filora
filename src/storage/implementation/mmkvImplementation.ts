import { MMKV } from "react-native-mmkv";
import { Storage } from "../storageTypes";

export const storage = new MMKV();

export const mmkvImplementation: Storage = {
  getItem: async (key) => storage.getString(key),
  setItem: async (key, value) => storage.set(key, value),
  removeItem: async (key) => storage.delete(key),
};

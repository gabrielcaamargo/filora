import { MMKV } from "react-native-mmkv";

import { Storage } from "../storageTypes";

const MMKVInstance = new MMKV();

export const MMKVStorage: Storage = {
  getItem: async (key) => {
    const item = MMKVInstance.getString(key);

    if (item) {
      return JSON.parse(item);
    }

    return null;
  },

  setItem: async (key, value) => {
    MMKVInstance.set(key, JSON.stringify(value));
  },

  removeItem: async (key) => {
    MMKVInstance.delete(key);
  },
};

import type { KlbAPIResult } from "../types/klb";
import type { FetchResult } from "../types/utils";
import { defineStore } from "pinia";

type SharedState = {
  results: Record<number, KlbAPIResult | undefined>;
  fetchResults: Record<number, FetchResult | undefined>;
};

export const useRestState = defineStore({
  id: "restState",
  state: (): SharedState => ({
    results: {},
    fetchResults: {},
  }),
  actions: {
    addFetchResult(key: number, result: FetchResult) {
      this.fetchResults[key] = result;
    },
    removeFetchResult(key: number) {
      delete this.fetchResults[key];
    },
    getFetchResult(key: number) {
      return this.fetchResults[key];
    },
    addResult(key: number, result: KlbAPIResult) {
      this.results[key] = result;
    },
    removeResult(key: number) {
      delete this.results[key];
    },
    getResult(key: number) {
      return this.results[key];
    },
  },
});

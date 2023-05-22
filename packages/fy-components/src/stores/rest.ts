import type { KlbAPIResult } from "../types/klb";
import type { FetchResult } from "../types/utils";
import { defineStore } from "pinia";

type RequestResult = {
  [key: number]: KlbAPIResult | undefined;
};
type FetchResult_ = {
  [key: number]: FetchResult | undefined;
};
type RestSharedState = {
  results: RequestResult;
  fetchResults: FetchResult_;
};

export const useRestState = defineStore({
  id: "restState",
  state: (): RestSharedState => ({
    results: {},
    fetchResults: {},
  }),
  actions: {
    addFetchResult(key: number, result: FetchResult | undefined) {
      this.fetchResults[key] = result;
    },
    delFetchResult(key: number) {
      delete this.fetchResults[key];
    },
    getFetchResultByHash(key: number) {
      return this.fetchResults[key];
    },
    addResult(key: number, result: KlbAPIResult | undefined) {
      this.results[key] = result;
    },
    delResult(key: number) {
      delete this.results[key];
    },
    getByHash(key: number) {
      return this.results[key];
    },
  },
});

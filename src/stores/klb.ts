import { defineStore } from "pinia";
import type { KlbUser, KlbAPIResultUnknown } from "../types/klb";
import { rest } from "@karpeleslab/klbfw";

export type KlbStoreState = {
  user: KlbUser | null;
};
export const useKlbStore = defineStore({
  id: "KlbStore",
  state: (): KlbStoreState => ({
    user: null,
  }),
  getters: {
    isAuth: (state): boolean => {
      return !(state.user === null);
    },
  },
  actions: {
    async refreshUser(params = {}) {
      const apiData: KlbAPIResultUnknown = await rest(
        "User:get",
        "GET",
        params
      ).catch(() => {}); // @todo
      if (apiData.result == "success" && apiData.data != null) {
        this.user = apiData.data as KlbUser;
      } else {
        this.user = null;
      }
    },
    async logout() {
      const apiData: KlbAPIResultUnknown = await rest(
        "User:logout",
        "POST"
      ).catch(() => {}); // @todo

      if (apiData.result == "success") {
        this.setUser(null);
      }
    },
    setUser(user: KlbUser | null): void {
      this.user = user;
    },
  },
});

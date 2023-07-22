import { defineStore } from "pinia";
import type { KlbUser, KlbAPIResultUnknown } from "../types/klb";
import type { UserPrivate } from "../types/fy";
import { rest } from "@karpeleslab/klbfw";

export type FyStoreState = {
  user: UserPrivate | null;
};
export const useFyStore = defineStore({
  id: "fyStore",
  state: (): FyStoreState => ({
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
        this.user = apiData.data as UserPrivate;
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
    setUser(user: UserPrivate | null): void {
      this.user = user;
    },
  },
});

import { computed } from "vue";
import { RouteLocation, useRouter } from "vue-router";
import { useKlbStore } from "../stores/klb";
import { useServerRouter } from "@fy-/core";
export function useUserCheck(path = "/login", redirectLink = false) {
  const store = useKlbStore();
  const isAuth = computed(() => store.isAuth);
  const router = useRouter();

  const checkUser = (route: RouteLocation) => {
    if (route.meta.reqLogin) {
      if (!isAuth.value) {
        if (!redirectLink) router.push(path);
        else {
          router.push(`${path}?return_to=${route.path}`);
        }
      }
    }
  };

  store.refreshUser().then(() => {
    const router = useServerRouter();
    if (router.currentRoute) {
      checkUser(router.currentRoute);
    }
  });

  router.afterEach(async () => {
    await store.refreshUser();
  });
  router.beforeEach((to) => {
    if (to.fullPath != path) {
      checkUser(to);
    }
  });
}

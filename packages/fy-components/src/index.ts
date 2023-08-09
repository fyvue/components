import type { App, Plugin } from "vue";
import {
  rest as KlbRest,
  restFetch as KlbRestFetch,
  handleSSR as KlbHandleSSR,
} from "./helpers/KlbSSR";
import { useKlbStore as KlbUseStore } from "./stores/klb";
import { useFyStore } from "./stores/fy";
import { useRestState } from "./stores/rest";
import { useSeo } from "./composables/useSeo";
import { useUserCheck as KlbUseUserCheck } from "./composables/useUserCheck";
import {
  useCountries as KlbUseCountries,
  countriesPromise as KlbcountriesPromise,
} from "./composables/useCountries";
// Base
import DefaultTable from "./components/ui/DefaultTable.vue";
import DefaultInput from "./components/ui/DefaultInput.vue";
import DefaultModal from "./components/ui/DefaultModal.vue";
import DefaultPaging from "./components/ui/DefaultPaging.vue";
import DefaultBreadcrumb from "./components/ui/DefaultBreadcrumb.vue";
import DefaultSidebar from "./components/ui/DefaultSidebar.vue";
import DefaultStepper from "./components/ui/DefaultStepper.vue";
import DefaultNavbar from "./components/ui/DefaultNavbar.vue";
import DefaultConfirm from "./components/ui/DefaultConfirm.vue";
import DefaultBackButton from "./components/ui/DefaultBackButton.vue";
import DefaultDateSelection from "./components/ui/DefaultDateSelection.vue";
import DefaultRestError from "./components/ui/DefaultRestError.vue";
import DefaultDrawer from "./components/ui/DefaultDrawer.vue";
import DefaultGallery from "./components/ui/DefaultGallery.vue";
// KLB
import KlbUserFlow from "./components/klb/KlbUserFlow.vue";
import KlbContact from "./components/klb/KlbContact.vue";
import KlbPage from "./components/klb/KlbPage.vue";
import KlbLocation from "./components/klb/KlbLocation.vue";
import KlbPaymentMethod from "./components/klb/KlbPaymentMethod.vue";
import KlbBillingHistory from "./components/klb/KlbBillingHistory.vue";
import KlbUpdatePassword from "./components/klb/KlbUpdatePassword.vue";
import KlbUpdateEmail from "./components/klb/KlbUpdateEmail.vue";
import KlbDataTable from "./components/klb/KlbDataTable.vue";
import KlbFilterData from "./components/klb/KlbFilterData.vue";
import KLbNavbar from "./components/klb/KlbNavbar.vue";
// MISC
import type { FyHeadLazy } from "./types/utils";
import type { KlbAPIResult } from "./types/klb";
import type { DateInterval } from "./types/utils";
import "./global.scss";
// Rest
import { useRest, useRestComposable } from "./composables/useRest";
import type { FetchResult, FetchError } from "./types/utils";

export function createFyComponents(
  prefix: string | undefined,
  restMode: "KLB" | "Fy" = "KLB"
): Plugin {
  return {
    install(app: App) {
      if (app.config.globalProperties) {
        app.config.globalProperties.$restMode = restMode;
        app.provide("restMode", restMode);
        app.config.globalProperties.$restPrefix = prefix;
        app.provide("restPrefix", prefix);
        const rest = useRestComposable(app);
        app.config.globalProperties.$rest = rest;
        app.provide("rest", rest);
      }
    },
  };
}
export {
  // Base
  DefaultModal,
  DefaultInput,
  DefaultPaging,
  DefaultTable,
  DefaultBreadcrumb,
  DefaultSidebar,
  DefaultStepper,
  DefaultNavbar,
  DefaultConfirm,
  DefaultBackButton,
  DefaultDateSelection,
  DefaultRestError,
  DefaultDrawer,
  DefaultGallery,

  // KLB
  KlbUseStore,
  KlbUseUserCheck,
  KlbHandleSSR,
  KlbRestFetch,
  KlbRest,
  KlbcountriesPromise,
  KlbUseCountries,
  KLbNavbar,
  KlbContact,
  KlbUserFlow,
  KlbPage,
  KlbLocation,
  KlbPaymentMethod,
  KlbBillingHistory,
  KlbUpdatePassword,
  KlbUpdateEmail,
  KlbDataTable,
  KlbFilterData,
  useRestState,

  // Fy
  useFyStore,

  // Types
  KlbAPIResult,
  DateInterval,
  FetchResult,
  FetchError,

  // Helpers
  useSeo,
  useRest,
  FyHeadLazy,
};

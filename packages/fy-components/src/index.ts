import {
  rest as KlbRest,
  restFetch as KlbRestFetch,
  handleSSR as KlbHandleSSR,
} from "./helpers/KlbSSR";
import { useKlbStore as KlbUseStore } from "./stores/klb";
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
// KLB
import KlbUserFlow from "./components/klb/KlbUserFlow.vue";
import KlbContact from "./components/klb/KlbContact.vue";
import KlbPage from "./components/klb/KlbPage.vue";
import KlbNavbar from "./components/klb/KlbNavbar.vue";
import KlbLocation from "./components/klb/KlbLocation.vue";
import KlbPaymentMethod from "./components/klb/KlbPaymentMethod.vue";
import KlbBillingHistory from "./components/klb/KlbBillingHistory.vue";
import KlbUpdatePassword from "./components/klb/KlbUpdatePassword.vue";
import KlbUpdateEmail from "./components/klb/KlbUpdateEmail.vue";
// MISC
import type { FyHeadLazy } from "./types/utils";
import "./global.scss";

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

  // KLB
  KlbUseStore,
  KlbUseUserCheck,
  KlbHandleSSR,
  KlbRestFetch,
  KlbRest,
  KlbcountriesPromise,
  KlbUseCountries,
  KlbContact,
  KlbUserFlow,
  KlbPage,
  KlbNavbar,
  KlbLocation,
  KlbPaymentMethod,
  KlbBillingHistory,
  KlbUpdatePassword,
  KlbUpdateEmail,

  // Helpers
  useSeo,
  FyHeadLazy,
};

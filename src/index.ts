import {
  rest as KlbRest,
  restFetch as KlbRestFetch,
  handleSSR as KlbHandleSSR,
} from "./helpers/KlbSSR";
import { useKlbStore as KlbUseStore } from "./stores/klb";
import { useSeo } from "./composables/useSeo";
import { useUserCheck as KlbUseUserCheck } from "./composables/useUserCheck";
import DefaultModal from "./components/DefaultModal.vue";
import DefaultInput from "./components/DefaultInput.vue";
import DefaultPaging from "./components/DefaultPaging.vue";
import DefaultBreadcrumb from "./components/DefaultBreadcrumb.vue";

import KlbUserFlow from "./components/KlbUserFlow.vue";

import type { FyHeadLazy } from "./types/utils";

export {
  // Base
  DefaultModal,
  DefaultInput,
  DefaultPaging,
  DefaultBreadcrumb,

  // KLB
  KlbUseStore,
  KlbUserFlow,
  KlbUseUserCheck,
  KlbHandleSSR,
  KlbRestFetch,
  KlbRest,

  // Helpers
  useSeo,
  FyHeadLazy,
};

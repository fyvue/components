import { rest, restFetch, handleSSR } from "./helpers/KlbSSR";
import { useKlbStore } from "./stores/klb";
import { useSeo } from "./composables/useSeo";
import DefaultModal from "./components/DefaultModal.vue";
import type { FyHeadLazy } from "./types/utils";
// KLB Utils
export const KlbRest = rest;
export const KlbRestFetch = restFetch;
export const KlbHandleSSR = handleSSR;
export const KlbUseStore = useKlbStore;
export { DefaultModal, useSeo, FyHeadLazy };

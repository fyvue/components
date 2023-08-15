<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useStorage } from "@vueuse/core";

import { useEventBus } from "@fy-/core";
import { getLocale, getUrl, getPath } from "@karpeleslab/klbfw";
import { useServerRouter } from "@fy-/core";
import { useFyHead } from "@fy-/head";
import { useBilling } from "../../composables/useBilling";
import { useCountries } from "../../composables/useCountries";
import { KlbAPISetupIntent } from "../../types/klb";
import { useKlbStore } from "../../stores/klb";
import { useRest } from "../../composables/useRest";
const rest = useRest();
import DefaultModal from "../ui/DefaultModal.vue";
import DefaultInput from "../ui/DefaultInput.vue";
const props = defineProps({
  onComplete: { type: Function, default: () => {} },
});
const state = useStorage("state-klb-add-pm", {
  label: "",
  firstname: "",
  lastname: "",
  country: "",
  zip: "",
});
const rules = {
  label: { required },
  firstname: { required },
  lastname: { required },
  country: { required },
  zip: { required },
};
const countries = useCountries();
const v$ = useVuelidate(rules, state);
const store = useKlbStore();
const paymentSetupIntent = ref<KlbAPISetupIntent>();
const isAuth = computed(() => store.isAuth);
const eventBus = useEventBus();
const history = useServerRouter();
const stripePayment = ref();
const errorMessage = ref<string>();
let stripe: any;
let stripeElements: any;
const submitBillingCreate = async () => {
  if (await v$.value.$validate()) {
    errorMessage.value = undefined;
    if (stripe && stripeElements) {
      eventBus.emit("main-loading", true);
      const _stripeResult = await stripe.confirmSetup({
        elements: stripeElements,
        confirmParams: {
          return_url: `${getUrl().scheme}://${getUrl().host}${
            history.currentRoute.path
          }?newMode=1`,
          payment_method_data: {
            billing_details: {
              name: `${state.value.firstname} ${state.value.lastname}`,
              email: store.user?.Email,
              address: {
                country: state.value.country,
                postal_code: state.value.zip,
                state: "",
                city: "",
                line1: "",
                line2: "",
              },
            },
          },
        },
      });
      if (_stripeResult.error) {
        errorMessage.value = _stripeResult.error.message;
      }
      eventBus.emit("main-loading", false);
    }
  }
};
const showAddPaymentMethodModal = async () => {
  eventBus.emit("AddPaymentMethodModal", true);
  const _setupIntent = await useBilling().setupPaymentIntent();
  if (_setupIntent) {
    paymentSetupIntent.value = _setupIntent;
    if (paymentSetupIntent.value.data.Setup.key) {
      stripe = window.Stripe(paymentSetupIntent.value.data.Setup.key, {
        locale: getLocale(),
        stripeAccount: paymentSetupIntent.value.data.Setup.options
          .stripe_account
          ? paymentSetupIntent.value.data.Setup.options.stripe_account
          : undefined,
      });
    }
  }
  if (stripe) {
    stripeElements = stripe.elements({
      clientSecret: paymentSetupIntent.value?.data.Setup.client_secret,
    });
    await stripePayment.value;
    stripeElements
      .create("payment", {
        fields: {
          billingDetails: {
            address: "never",
            name: "never",
            email: "never",
          },
        },
      })
      .mount(stripePayment.value);
  }
};
onMounted(async () => {
  if (
    history.currentRoute.query.setup_intent &&
    history.currentRoute.query.setup_intent_client_secret &&
    state.value &&
    history.currentRoute.query.newMode == "1"
  ) {
    eventBus.emit("main-loading", true);
    const _result = await rest("User/Billing:create", "POST", {
      Label: state.value.label,
      First_Name: state.value.firstname,
      Last_Name: state.value.lastname,
      Zip: state.value.zip,
      Country__: state.value.country,
      method: "Stripe",
      stripe_intent: history.currentRoute.query.setup_intent,
    }).catch((err) => {
      errorMessage.value = err.message;
      eventBus.emit("main-loading", false);
      history.push(getPath());
    });
    if (_result && _result.result == "success") {
      eventBus.emit("AddPaymentMethodModal", false);
      props.onComplete(_result);
      state.value = null;
      history.push(getPath());
    } else {
      errorMessage.value = _result?.message;
    }
    eventBus.emit("main-loading", false);
  }
  eventBus.on("ShowAddPaymentMethodModal", showAddPaymentMethodModal);
});
onUnmounted(() => {
  eventBus.off("ShowAddPaymentMethodModal", showAddPaymentMethodModal);
});
useFyHead({
  scripts: [
    {
      src: "https://js.stripe.com/v3",
      id: "stripe-script",
    },
  ],
});
</script>
<template>
  <div v-if="isAuth">
    <DefaultModal
      id="AddPaymentMethod"
      :title="$t('add_pm_modal_title')"
      class="klb-add-method"
    >
      <!--<FyLoader id="modal-add-pm" size="6" :showLoadingText="false" />-->
      <form @submit.prevent="submitBillingCreate">
        <DefaultInput
          id="billingLabel"
          :req="true"
          :showLabel="true"
          :placeholder="$t('add_pm_label_placeholder')"
          :errorVuelidate="v$.label.$errors"
          v-model="state.label"
          :label="$t('add_pm_label_label')"
          type="text"
        ></DefaultInput>
        <div class="form-grid">
          <DefaultInput
            id="billingFirstname"
            :req="true"
            :showLabel="true"
            :placeholder="$t('add_pm_firstname_placeholder')"
            :errorVuelidate="v$.firstname.$errors"
            v-model="state.firstname"
            :label="$t('add_pm_firstname_label')"
            type="text"
            class="mt-3"
          ></DefaultInput>
          <DefaultInput
            id="billingLastname"
            :req="true"
            :showLabel="true"
            :placeholder="$t('add_pm_lastname_placeholder')"
            :errorVuelidate="v$.lastname.$errors"
            v-model="state.lastname"
            :label="$t('add_pm_lastname_label')"
            type="text"
            class="mt-3"
          ></DefaultInput>
          <DefaultInput
            id="billingZip"
            :req="true"
            :showLabel="true"
            :placeholder="$t('add_pm_zip_placeholder')"
            :errorVuelidate="v$.zip.$errors"
            v-model="state.zip"
            :label="$t('add_pm_zip_label')"
            type="text"
            class="mt-3"
          ></DefaultInput>
          <DefaultInput
            id="billingCountry"
            :req="true"
            type="select"
            :showLabel="true"
            :label="$t('klb_location_country_label')"
            v-model="state.country"
            :errorVuelidate="v$.country.$errors"
            :options="countries.countriesOptions"
            class="mt-3"
          ></DefaultInput>
        </div>
        <div class="fui-input mt-3">
          <label class="input-label" for="typeDef"
            >{{ $t("payment_method_label") }}
          </label>
          <div
            id="stripePayment"
            class="stripePayment"
            ref="stripePayment"
          ></div>
        </div>
        <div v-if="errorMessage" class="response-error">
          {{ errorMessage }}
        </div>
        <div class="btn-center">
          <button class="btn primary medium" type="submit">
            {{ $t("create_billing_profile") }}
          </button>
        </div>
      </form>
    </DefaultModal>
  </div>
</template>

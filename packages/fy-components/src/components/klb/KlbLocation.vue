<script setup lang="ts">
import { ref, onMounted, computed, reactive, watch } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import {
  KlbAPIUserLocations,
  KlbUserLocation,
  KlbAPIUserLocation,
  KlbAPIResultUnknown,
} from "../../types/klb";
import InnerLoader from "../ui/InnerLoader.vue";
import { useTranslation } from "@fy-/core";
import { useKlbStore } from "../../stores/klb";
import { rest as KlbRest } from "../../helpers/KlbSSR";
import { useCountries } from "../../composables/useCountries";
const props = withDefaults(
  defineProps<{
    displayOnly?: boolean;
    locationUuid?: string;
    modelValue?: string;
    selectedLocation?: string;
  }>(),
  {
    displayOnly: false,
    selectedLocation: undefined,
  }
);
interface KlbLocationsByUuid {
  [key: string]: KlbUserLocation;
}
const currentSelectedLocation = ref<string>();
const countries = useCountries();
const store = useKlbStore();
const translate = useTranslation();
const isAuth = computed(() => store.isAuth);
const location = ref<KlbUserLocation>();
const locationsSelectOptions = ref<Array<string[]>>([]);
const locations = ref<KlbLocationsByUuid>({});
const isLoaded = ref<boolean>(false);
const editMode = ref<boolean>(false);
const emit = defineEmits(["update:modelValue"]);
const model = computed({
  get: () => props.modelValue,
  set: (items) => {
    emit("update:modelValue", items);
  },
});

const state = reactive({
  firstname: "",
  lastname: "",
  country: "",
  zip: "",
});
const rules = {
  firstname: { required },
  lastname: { required },
  country: { required },
  zip: { required },
};

const v$ = useVuelidate(rules, state);

const getUserGeolocation = async () => {
  const _userLoc = await KlbRest<KlbAPIResultUnknown>(
    "ThirdParty/Geoip:lookup",
    "GET"
  ).catch(() => {});
  if (_userLoc && _userLoc.result == "success") {
    state.country = _userLoc.data.country.iso_code;
  }
};
const deleteLocation = async () => {
  await KlbRest<KlbAPIUserLocation>(
    `User/Location/${location.value?.User_Location__}`,
    "DELETE",
    {}
  ).catch(() => {});
  await getUserLocation();
};
const submitLocation = async () => {
  if (location.value) {
    await KlbRest<KlbAPIUserLocation>(
      `User/Location/${location.value?.User_Location__}`,
      "PATCH",
      {
        First_Name: state.firstname,
        Last_Name: state.lastname,
        Zip: state.zip,
        Country__: state.country,
      }
    ).catch(() => {});
    editMode.value = false;
    await getUserLocation();
  } else {
    await KlbRest<KlbAPIUserLocation>(`User/Location`, "POST", {
      First_Name: state.firstname,
      Last_Name: state.lastname,
      Zip: state.zip,
      Country__: state.country,
    }).catch(() => {});
    editMode.value = false;
    await getUserLocation();
  }
};
const getUserLocation = async () => {
  state.country = "";
  state.firstname = "";
  state.lastname = "";
  state.zip = "";
  if (isAuth.value) {
    const _locations = await KlbRest<KlbAPIUserLocations>(
      `User/Location`,
      "GET",
      {
        sort: "Created",
      }
    ).catch(() => {});
    if (_locations && _locations.result == "success") {
      if (_locations.data.length > 0) {
        location.value = _locations.data[0];
        if (props.selectedLocation) {
          currentSelectedLocation.value = props.selectedLocation;
        } else {
          currentSelectedLocation.value = _locations.data[0].User_Location__;
        }

        locationsSelectOptions.value = [];
        locations.value = {};
        _locations.data.forEach((loc) => {
          locations.value[loc.User_Location__] = loc;
          locationsSelectOptions.value.push([
            loc.User_Location__,
            loc.Display.join(", "),
          ]);
        });
        if (!props.displayOnly)
          locationsSelectOptions.value.push([
            "new",
            translate("klb_location_new_cta"),
          ]);

        editMode.value = false;
      } else {
        locations.value = {};
        locationsSelectOptions.value = [];
        if (!props.displayOnly) {
          locationsSelectOptions.value.push(["new", "New"]);
          currentSelectedLocation.value = "new";
        }
        editMode.value = true;
        if (!state.country) {
          await getUserGeolocation();
        }
      }
    }
  }
  isLoaded.value = true;
};

watch(currentSelectedLocation, async (v) => {
  if (v == "new") {
    state.firstname = "";
    state.lastname = "";
    state.zip = "";
    state.country = "";
    editMode.value = true;
    location.value = undefined;
    model.value = undefined;
    await getUserGeolocation();
  } else {
    if (v && locations.value[v]) {
      location.value = locations.value[v];
      state.firstname = location.value.First_Name;
      state.lastname = location.value.Last_Name;
      state.zip = location.value.Zip ? location.value.Zip : "";
      state.country = location.value.Country__;
      model.value = location.value.User_Location__;
    }
  }
});
watch(isAuth, async (v) => {
  if (v) {
    await getUserLocation();
  }
});
onMounted(async () => {
  if (isAuth.value) {
    await getUserLocation();
  }
});
</script>
<template>
  <div v-if="isAuth && isLoaded">
    <div class="inline-flex w-full gap-x-2">
      <DefaultInput
        id="selectLocation"
        :options="locationsSelectOptions"
        type="select"
        v-model="currentSelectedLocation"
        class="flex-grow"
      />
      <template v-if="!displayOnly">
        <button
          class="btn defaults primary"
          v-if="editMode == false"
          @click="editMode = true"
        >
          {{ $t("klb_edit_location") }}
        </button>
        <button
          class="btn defaults danger"
          v-if="
            editMode == true && location && currentSelectedLocation != 'new'
          "
          @click="deleteLocation()"
        >
          {{ $t("klb_delete_location") }}
        </button>
        <button
          class="btn defaults neutral"
          type="reset"
          @click="editMode = false"
          v-if="editMode == true"
        >
          {{ $t("klb_locations_reset_cta") }}
        </button>
        <button
          class="btn defaults primary"
          type="reset"
          @click="
            () => {
              currentSelectedLocation = 'new';
              editMode = true;
            }
          "
          v-if="
            async () => {
              editMode == false;
              await getUserGeolocation();
            }
          "
        >
          {{ $t("klb_location_new_cta") }}
        </button>
      </template>
    </div>
    <div
      v-if="editMode"
      class="mt-4 py-2 border-b border-t border-fv-neutral-500/[0.5]"
    >
      <div>
        <form @submit.prevent="submitLocation">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <DefaultInput
              id="billingFirstname"
              :req="true"
              :showLabel="true"
              type="text"
              :placeholder="$t('klb_location_firstname_placeholder')"
              :errorVuelidate="v$.firstname.$errors"
              v-model="state.firstname"
              :label="$t('klb_location_firstname_label')"
            ></DefaultInput>
            <DefaultInput
              id="billingLastname"
              :req="true"
              type="text"
              :showLabel="true"
              :placeholder="$t('klb_location_lastname_placeholder')"
              :errorVuelidate="v$.lastname.$errors"
              v-model="state.lastname"
              :label="$t('klb_location_lastname_label')"
            ></DefaultInput>
            <DefaultInput
              id="billingZip"
              :req="true"
              type="text"
              :showLabel="true"
              :placeholder="$t('klb_location_zip_placeholder')"
              :errorVuelidate="v$.zip.$errors"
              v-model="state.zip"
              :label="$t('klb_location_zip_label')"
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
            ></DefaultInput>
          </div>
          <br />
          <div class="btn-box">
            <button class="medium btn primary" type="submit">
              {{ $t("klb_locations_save_cta") }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <InnerLoader v-if="!isLoaded && isAuth" />
</template>

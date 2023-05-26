import { rest as KlbRest } from "../helpers/KlbSSR";
import {
  KlbAPIBillingHistory,
  KlbAPISetupIntent,
  KlbAPIUserLocation,
  KlbBillingAndLocation,
} from "../types/klb";

export function useBilling() {
  return {
    setupPaymentIntent: (method = "Stripe") => {
      return new Promise<KlbAPISetupIntent | null>((resolve) => {
        KlbRest<KlbAPISetupIntent>("Realm/PaymentMethod:setup", "POST", {
          method: method,
        })
          .then((_result) => {
            if (_result && _result.result == "success") {
              resolve(_result);
            } else {
              resolve(null);
            }
          })
          .catch(() => {
            resolve(null);
          });
      });
    },
    getUserBillingAndLoc: () => {
      return new Promise<KlbBillingAndLocation | null>((resolve) => {
        KlbRest<KlbAPIBillingHistory>("User/Billing", "GET")
          .then((_userBilling) => {
            if (
              _userBilling &&
              _userBilling.data &&
              _userBilling.data.length != 0
            ) {
              KlbRest<KlbAPIUserLocation>(
                `User/Location/${_userBilling.data[0].User_Location__}`,
                "GET"
              )
                .then((_userLocation) => {
                  if (_userLocation && _userLocation.result == "success") {
                    resolve({
                      location: _userLocation.data,
                      billing: _userBilling.data[0],
                    });
                  } else {
                    resolve(null);
                  }
                })
                .catch(() => {
                  resolve(null);
                });
            } else {
              resolve(null);
            }
          })
          .catch(() => {
            resolve(null);
          });
      });
    },
  };
}

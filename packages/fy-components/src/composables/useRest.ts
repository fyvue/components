import { inject } from "vue";
import type { App } from "vue";
import { useRestState } from "../stores/rest";
import { KlbAPIResult } from "../types/klb";
import { stringHash, isServerRendered, useEventBus } from "@fy-/core";
import { rest as _rest, getMode } from "@karpeleslab/klbfw";

export function useRest() {
  const rest =
    inject<
      <ResultType extends KlbAPIResult>(
        url: string,
        method: string,
        params?: any,
        ctx?: any,
        headers?: Headers
      ) => Promise<ResultType>
    >("rest");
  if (!rest) throw new Error("Did you apply app.use(fyComponents)?");

  return rest;
}
export function useRestMode() {
  const restMode = inject<"" | "Fy" | "KLB">("restMode");
  if (!restMode) throw new Error("Did you apply app.use(fyComponents)?");

  return "";
}
export function useRestPrefix() {
  const restMode = inject<string | undefined>("restPrefix");

  return restMode;
}

async function handleResponse(
  res: Response,
  eventBus: any
): Promise<KlbAPIResult> {
  return res
    .json()
    .then((data: any) => {
      const _res: KlbAPIResult = {
        data: undefined,
        paging: undefined,
        status: res.status,
        result: data.result,
      };
      _res.data = data.data;
      _res.time = data.time;
      _res.paging = data.paging;
      _res.token = data.token || null;
      _res.message = data.message || null;
      if (_res.result == "error") {
        eventBus.emit("main-loading", false);
        eventBus.emit("restError", _res);
      }
      return _res;
    })
    .catch((err) => {
      const _res: KlbAPIResult = {
        data: null,
        result: err.result,
        time: 0,
        status: err.status,
        token: "Invalid JSON",
      };
      eventBus.emit("main-loading", false);
      eventBus.emit("restError", _res);
      return _res;
    });
}

export function useRestComposable(
  app?: App
): <ResultType extends KlbAPIResult>(
  url: string,
  method: string,
  params?: any,
  ctx?: any,
  headers?: Headers
) => Promise<ResultType> {
  const restMode = app?.config.globalProperties.$restMode || "KLB";
  const eventBus = app?.config.globalProperties.$eventBus;
  const prefix = app?.config.globalProperties.$restPrefix || "";
  let restFunction: <ResultType extends KlbAPIResult>(
    url: string,
    method: string,
    params?: any,
    ctx?: any,
    headers?: Headers
  ) => Promise<ResultType>;
  if (restMode === "KLB") {
    restFunction = async <ResultType extends KlbAPIResult>(
      url: string,
      method: string = "GET",
      params: any = {},
      ctx: any = {}
    ): Promise<ResultType> => {
      const restState = useRestState();
      const requestHash = stringHash(url + method + JSON.stringify(params));

      if (isServerRendered() && restState.getResult(requestHash)) {
        const result = { ...restState.getResult(requestHash) } as ResultType;
        restState.removeResult(requestHash);
        if (result.result === "error") {
          eventBus.emit("main-loading", false);
          eventBus.emit("restError", result);
        }
        return Promise.resolve(result);
      }

      try {
        const restResult: ResultType = await _rest(url, method, params, ctx);
        if (getMode() === "ssr") {
          restState.addResult(requestHash, restResult);
        }
        return Promise.resolve(restResult);
      } catch (err) {
        const fetchError = err as KlbAPIResult;

        if (getMode() === "ssr") {
          restState.addResult(requestHash, fetchError as unknown as ResultType);
        }
        eventBus.emit("main-loading", false);
        eventBus.emit("restError", fetchError);
        return Promise.resolve(fetchError as unknown as ResultType);
      }
    };
  } else {
    restFunction = async <ResultType extends KlbAPIResult>(
      url: string,
      method: string = "GET",
      params: any = {},
      ctx: any = { getBody: false },
      headers: Headers = new Headers({ "Content-Type": "application/json" })
    ): Promise<ResultType> => {
      const restState = useRestState();
      url = prefix + url;
      let formattedParams = "";
      if (["POST", "PATCH"].includes(method)) {
        formattedParams = JSON.stringify(params);
      } else if (method == "GET") {
        formattedParams = "";
        if (params) {
          if (!ctx.getBody) {
            formattedParams =
              "?" + new URLSearchParams(params as Record<string, string>);
          } else {
            formattedParams +=
              "?magic=" + encodeURIComponent(JSON.stringify(params));
          }
        }
        if (formattedParams == "?") formattedParams = "";
        url = `${url}${formattedParams}`;
      }
      const formattedUrl = url.toString();
      const requestHash = stringHash(
        `${formattedUrl}${method}${formattedParams}`
      );

      if (isServerRendered() && restState.getResult(requestHash)) {
        const result = {
          ...restState.getResult(requestHash),
        } as ResultType;
        restState.removeResult(requestHash);
        if (result.result === "error") {
          eventBus.emit("main-loading", false);
          eventBus.emit("restError", result);
        }
        return Promise.resolve(result);
      }

      return fetch(formattedUrl, {
        method: method,
        body: ["POST", "PATCH"].includes(method) ? formattedParams : undefined,
        headers,
      })
        .then(async (res) => {
          if (!res.ok) throw res; // Throws HTTP errors to be caught in .catch block.
          const result = await handleResponse(res, eventBus);
          if (getMode() === "ssr") {
            restState.addResult(requestHash, result);
          }
          return Promise.resolve(result as unknown as ResultType);
        })
        .catch(async (err) => {
          if (err instanceof Response) {
            const result = await handleResponse(err, eventBus);
            if (getMode() === "ssr") {
              restState.addResult(requestHash, result);
            }
            return Promise.resolve(result as unknown as ResultType);
          } else {
            console.error("Network error:", err);
            throw err;
          }
        });
    };
  }
  return restFunction;
}

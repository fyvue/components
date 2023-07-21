import { inject } from "vue";
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
        params: any,
        ctx?: any,
        headers?: Headers
      ) => Promise<ResultType>
    >("fyRest");
  if (!rest) throw new Error("Did you apply app.use(fyComponents)?");

  return rest;
}
export function useRestMode() {
  const restMode = inject<"" | "Fy" | "KLB">("fyRestMode");
  if (!restMode) throw new Error("Did you apply app.use(fyComponents)?");

  return "";
}

export function useRestComposable(): <ResultType extends KlbAPIResult>(
  url: string,
  method: string,
  params: any,
  ctx?: any,
  headers?: Headers
) => Promise<ResultType> {
  const restMode = useRestMode();
  const eventBus = useEventBus();
  let restFunction: <ResultType extends KlbAPIResult>(
    url: string,
    method: string,
    params: any,
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
      const urlParams =
        method === "GET" && params
          ? "?" + new URLSearchParams(params as Record<string, string>)
          : "";
      const formattedUrl = `${url}${urlParams}`;
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

      try {
        const response = await fetch(formattedUrl, {
          method,
          body: formattedParams ? formattedParams : undefined,
          headers,
        });
        const data = await response.json();
        const result: KlbAPIResult = { ...data, status: response.status };

        if (getMode() === "ssr") {
          restState.addResult(requestHash, result);
        }
        return result as ResultType;
      } catch (err) {
        const fetchError = err as KlbAPIResult;

        const result: KlbAPIResult = {
          ...fetchError,
          status: fetchError.status || 500,
        };

        if (getMode() === "ssr") {
          restState.addResult(requestHash, result);
        }
        eventBus.emit("main-loading", false);
        eventBus.emit("restError", result);
        return Promise.resolve(result as ResultType);
      }
    };
  }
  return restFunction;
}

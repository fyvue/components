import { useRestState } from "../stores/rest";
import { KlbAPIResult } from "../types/klb";
import { FetchResult } from "../types/utils";
import { stringHash, isServerRendered, SSRRender } from "@fy-/core";
import {
  rest as _rest,
  getMode,
  getUuid,
  getPath,
  getUrl,
} from "@karpeleslab/klbfw";

interface FetchError extends Error {
  status?: number;
  fvReject?: boolean;
}

export async function restFetch<ResultType extends FetchResult>(
  url: string,
  method: string = "GET",
  params: object = {},
  headers: Headers = new Headers({ "Content-Type": "application/json" })
): Promise<ResultType> {
  const restState = useRestState();
  const formattedParams = method === "POST" ? JSON.stringify(params) : "";
  const urlParams =
    method === "GET" && params
      ? "?" + new URLSearchParams(params as Record<string, string>)
      : "";
  const formattedUrl = `${url}${urlParams}`;
  const requestHash = stringHash(`${formattedUrl}${method}${formattedParams}`);

  if (isServerRendered() && restState.getFetchResult(requestHash)) {
    const result = { ...restState.getFetchResult(requestHash) } as ResultType;
    restState.removeFetchResult(requestHash);
    return result.fvReject ? Promise.reject(result) : Promise.resolve(result);
  }

  try {
    const response = await fetch(formattedUrl, {
      method,
      body: formattedParams ? formattedParams : undefined,
      headers,
    });
    const data = await response.json();
    const result: FetchResult = { data, status: response.status };

    if (getMode() === "ssr") {
      restState.addFetchResult(requestHash, result);
    }
    return result as ResultType;
  } catch (err) {
    const fetchError = err as FetchError;

    const result: FetchResult = {
      data: fetchError,
      status: fetchError.status || 500,
      fvReject: getMode() === "ssr",
    };

    if (result.fvReject) {
      restState.addFetchResult(requestHash, result);
    }
    return Promise.reject(result as ResultType);
  }
}

export async function rest<ResultType extends KlbAPIResult>(
  url: string,
  method: string = "GET",
  params: object = {},
  ctx: object = {}
): Promise<ResultType> {
  const restState = useRestState();
  const requestHash = stringHash(url + method + JSON.stringify(params));

  if (isServerRendered() && restState.getResult(requestHash)) {
    const result = { ...restState.getResult(requestHash) } as ResultType;
    restState.removeResult(requestHash);
    return result.fvReject ? Promise.reject(result) : Promise.resolve(result);
  }

  try {
    const restResult: ResultType = await _rest(url, method, params, ctx);
    if (getMode() === "ssr") {
      restState.addResult(requestHash, restResult);
    }
    return restResult;
  } catch (err) {
    const fetchError = err as FetchError;

    if (getMode() === "ssr") {
      fetchError.fvReject = true;
      restState.addResult(requestHash, fetchError as unknown as ResultType);
    }
    return Promise.reject(err);
  }
}
export async function handleSSR(
  createApp: Function,
  cb: Function,
  options: { url?: string } = {}
) {
  const url =
    options.url || `${getPath()}${getUrl().query ? `?${getUrl().query}` : ""}`;
  return SSRRender(createApp, url, cb, getUuid());
}

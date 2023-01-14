import { KlbAPIResult } from "../types/klb";
import { FetchResult } from "../types/utils";
import { stringHash, isServerRendered, SSRRender } from "@fy-/core";
import { useRestState } from "../stores/rest";
import {
  rest as _rest,
  getMode,
  getUuid,
  getPath,
  getUrl,
} from "@karpeleslab/klbfw";

export interface SSROptions {
  url: string | null;
}
export function restFetch<ResultType extends FetchResult>(
  url: string,
  method: string = "GET",
  params: object = {},
  headers: Headers = new Headers()
): Promise<ResultType> {
  const requestHash = stringHash(url + method + JSON.stringify(params));
  const restState = useRestState();
  if (isServerRendered() && restState.getFetchResultByHash(requestHash)) {
    const result = {
      ...restState.getFetchResultByHash(requestHash),
    } as ResultType;
    restState.delFetchResult(requestHash);
    return new Promise<ResultType>((resolve, reject) => {
      if (result.fvReject) {
        delete result.fvReject;
        reject(result);
      } else resolve(result);
    });
  }
  //const headers = new Headers();
  headers.set("Content-Type", "application/json");
  let _params: any = params;
  if (method == "POST") {
    _params = JSON.stringify(params);
  } else if (method == "GET") {
    _params = undefined;
    if (params) {
      _params = "?" + new URLSearchParams(params as Record<string, string>);
    }
    if (_params == "?") _params = "";
  }
  return new Promise<ResultType>((resolve, reject) => {
    fetch(`${url}${method == "GET" ? _params : ""}`, {
      method: method,
      body: method == "POST" ? _params : undefined,
      headers,
    })
      .catch((err) => {
        const _res: FetchResult = {
          //raw: err,
          data: err,
          status: err.status,
        };

        if (getMode() == "ssr") {
          _res.fvReject = true;
          restState.addFetchResult(requestHash, _res);
        }
        reject(_res as ResultType);
      })
      .then((res) => {
        if (res) {
          const _res: FetchResult = {
            //raw: res,
            data: undefined,
            status: res.status,
          };

          res.json().then((data: any) => {
            _res.data = data;
            if (getMode() == "ssr") restState.addFetchResult(requestHash, _res);
            resolve(_res as ResultType);
          });
        }
      });
  });
}

export function rest<ResultType extends KlbAPIResult>(
  url: string,
  method: string = "GET",
  params: object = {},
  ctx: object = {}
): Promise<ResultType> {
  const requestHash = stringHash(url + method + JSON.stringify(params));
  const restState = useRestState();
  if (isServerRendered() && restState.results[requestHash]) {
    const result = { ...restState.getByHash(requestHash) } as ResultType;
    restState.delResult(requestHash);
    return new Promise<ResultType>((resolve, reject) => {
      if (result.fvReject) {
        delete result.fvReject;
        reject(result);
      } else resolve(result);
    });
  }

  return new Promise<ResultType>((resolve, reject) => {
    _rest(url, method, params, ctx)
      .then((restResult: ResultType) => {
        if (getMode() == "ssr") restState.addResult(requestHash, restResult);
        resolve(restResult);
      })
      .catch((err: ResultType) => {
        if (getMode() == "ssr") {
          err.fvReject = true;
          restState.addResult(requestHash, err);
        }
        reject(err);
      });
  });
}
export async function handleSSR(
  createApp: Function,
  cb: Function,
  options: SSROptions = { url: null }
) {
  let url: string;
  if (options.url) url = options.url;
  else {
    //url = `${getPath()}`;
    const query = getUrl().query;
    url = `${getPath()}${query ? `?${query}` : ""}`;
  }
  return SSRRender(createApp, url, cb, getUuid());
}

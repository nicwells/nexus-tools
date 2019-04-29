import {
  applyMiddleware,
  makePost,
  makePatch,
  makePut,
  makeDelete,
} from './utils';
import Organization from './oragnizations';
import NFile from './file';

export interface NexusClientOptions {
  uri: string; // the base path, i.e. https://api.com
  version: string; // v1
  fetch?: any; // use node-fetch in node for example
}

function createNexusClient(nexusOptions: NexusClientOptions) {
  const middlewares: Array<any> = [];
  const afterwares: Array<any> = [];
  const fetcher = nexusOptions.fetch || fetch;
  const parser = (response: Response, options: any) => {
    // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    // default is 'json'
    switch (options && options.as) {
      case 'text':
        return response.text();
      case 'blob':
        return response.blob();
      case 'document':
        return response.formData();
      default:
        return response.json();
    }
  };

  // TODO: define what's needed in the context
  // and how a middleware/afterware can modify it
  const context = {
    ...nexusOptions,
  };

  const request = async (
    url: string,
    options?: RequestInit,
  ): Promise<Blob | ArrayBuffer | FormData | string | any> => {
    // run request through middlewares before reaching fetch
    const augmentedFetcher = applyMiddleware(fetcher, middlewares);
    // use augmented fetcher to get response from server
    const response = await augmentedFetcher(url, options);
    // run response though afterwres before reaching parser
    const augmentedParser = applyMiddleware(parser, afterwares);
    // return result of augmented parser
    return augmentedParser(response, options);
  };

  // Some handy "presets"
  const fetchers = {
    httpGet: request,
    httpPost: applyMiddleware(request, [makePost]),
    httpPatch: applyMiddleware(request, [makePatch]),
    httpPut: applyMiddleware(request, [makePut]),
    httpDelete: applyMiddleware(request, [makeDelete]),
  };

  const use = (m: any) => {
    middlewares.push(m);
    return {
      use,
      useAfter,
    };
  };

  const useAfter = (a: any) => {
    afterwares.push(a);
    return {
      use,
      useAfter,
    };
  };

  return {
    use,
    useAfter,
    Organization: Organization(fetchers, context),
    File: NFile(fetchers, context),
  };
}

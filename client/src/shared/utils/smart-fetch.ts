import environment from '../../environment.json';

function smartFetchRaw<T = any>(
  url: string,
  body?: any,
  options: RequestInit = {}
): Promise<T> {
  return fetch(environment.baseUrl + url, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: body === undefined ? undefined : JSON.stringify(body),
    ...options
  }).then(response => {
    if (Math.abs(response.status - 200) > 100) {
      throw response.json();
    }

    return response.json();
  });
}

type SmartFetchFunctionType = <T = any>(
  url: string,
  body?: any,
  options?: RequestInit
) => Promise<T>;

type SmartFetchType = Function & {
  get: SmartFetchFunctionType;
  post: SmartFetchFunctionType;
  delete: SmartFetchFunctionType;
  put: SmartFetchFunctionType;
};

const smartFetch = (smartFetchRaw as unknown) as SmartFetchType;

for (const method of ['get', 'post', 'delete', 'put']) {
  smartFetch[method] = <T>(
    url: string,
    body?: any,
    options: RequestInit = {
      method
    }
  ) => smartFetchRaw<T>(url, body, options);
}

export default smartFetch;

if (!environment.production) {
  (window as any).smartFetch = smartFetch;
}

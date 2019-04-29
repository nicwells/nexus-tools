# `nexus-sdk`

> TODO: description

## Usage

```typescript
const nexus = createNexusClient({
  uri: 'https://api.io',
  version: 'v1',
});

nexus.Organization.list()
  .then(d => console.log(d))
  .catch(e => console.error(e));

nexus.Organization.get('Blah')
  .then(d => console.log(d))
  .catch(e => console.error(e));

nexus.File.get('orgLabel', 'projectLabel', 'file-id')
  .then(d => console.log(d.type))
  .catch(e => console.error(e));
```

### Middleware and Afterware

You can extend the client with middlewares and afterware.

A middleware will be apply to the request, and an afterware to the response. Examples:

```typescript
// Sets up cors on a request
const cors = () => (next: any) => (url: string, options?: RequestInit) => {
  return next(url, { ...options, mode: 'cors' });
};

// Auth middleware
// grabs the token from somewhere and sets Auth header
const token = () => (next: any) => (url: string, options?: RequestInit) => {
  const myToken = localstorage.getItem('token');
  const headers = {
    ...(options && options.headers && options.headers),
    Authorization: `Bearer ${myToken}`,
  };
  return next(url, { ...options, headers });
};

// Sets up cors on a request
export const cors = () => (next: any) => (
  url: string,
  options?: RequestInit,
) => {
  return next(url, { ...options, mode: 'cors' });
};

// That middleware will log an error to sentry
// when if the result of the afterware throws an exception
const logToSentry = () => (next: any) => async (
  response: Response,
  options: any,
) => {
  try {
    const res = await next(response, options);
    return res;
  } catch (e) {
    // Raven.captureException()...
    console.log('THIS IS GOING TO SENTRY', e.message);
  }
};

// Afterware that checks if the response if >400
// logs it somewhere when it is
// can be useful trigger alarms id there is a
// surge of 404 for instance
const checkStatus = () => (next: any) => async (
  response: Response,
  options: any,
) => {
  if (response.status >= 400) {
    console.log(
      'THIS WILL BE LOGGED SOMEWHERE',
      response.status + ': ' + response.statusText,
    );
  }
  return next(response, options);
};

// Afterware that checks if the response if >400
// logs it somewhere when it is
// can be useful trigger alarms id there is a
// surge of 404 for instance
const checkStatus = () => (next: any) => async (
  response: Response,
  options: any,
) => {
  if (response.status >= 400) {
    console.log(
      'THIS WILL BE LOGGED SOMEWHERE',
      response.status + ': ' + response.statusText,
    );
  }
  return next(response, options);
};

// use them all
nexus
  .use(token)
  .use(logger)
  .use(cors)
  .useAfter(logger)
  .useAfter(checkStatus)
  .useAfter(logToSentry);
```

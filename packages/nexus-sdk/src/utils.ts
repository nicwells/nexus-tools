// Apply a list of functions to eaach others
// this is some currying, composition and higher order function stuff
export const applyMiddleware = (fun: any, middlewares: Array<any>) => {
  middlewares = middlewares.slice();
  middlewares.reverse();
  let next = fun;
  middlewares.forEach(middleware => (next = middleware()(next)));
  return next;
};

// Middleware: Makes a request a POST request by setting the method to POST
export const makePost = () => (next: any) => (
  url: string,
  options?: RequestInit,
) => {
  if (!options || (options && !options.body)) {
    throw new Error('No body was found in the POST request');
  }
  return next(url, { ...options, method: 'POST' });
};

// Middleware: Makes the request a PATCH reques
export const makePatch = () => (next: any) => (
  url: string,
  options?: RequestInit,
) => {
  return next(url, { ...options, method: 'PATCH' });
};

// Middleware: Makes the request a PUT request
export const makePut = () => (next: any) => (
  url: string,
  options?: RequestInit,
) => {
  return next(url, { ...options, method: 'PUT' });
};

// Middleware: Makes the request a DELETE request
export const makeDelete = () => (next: any) => (
  url: string,
  options?: RequestInit,
) => {
  return next(url, { ...options, method: 'DELETE' });
};

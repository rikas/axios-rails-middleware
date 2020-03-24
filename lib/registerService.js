import axios from 'axios';
import { Service } from 'axios-middleware';
import { snakeCase, camelCase } from 'change-case';
import deepMapKeys from 'deep-map-keys';

export const convertData = (data, method) => {
  let convertedData;
  if (typeof data === 'string') {
    convertedData = JSON.parse(data);
  } else {
    convertedData = data;
  }

  convertedData = deepMapKeys(convertedData, method);

  return convertedData;
};

// Register a new service middleware to work with Rails backends, where typically the JSON keys are
// sent as snake_case, that we want to convert to camelCase, since it's the default case in JS.
export const registerService = () => {
  const service = new Service(axios);

  service.register({
    onRequest(request) {
      if (request.data && !(request.data instanceof FormData)) {
        return { ...request, data: JSON.stringify(convertData(request.data, snakeCase)) };
      }

      return request;
    },
    onSync(promise) {
      return promise;
    },
    onResponse(response) {
      if (response.data) {
        return { ...response, data: convertData(response.data, camelCase) };
      }

      return response;
    },
    onResponseError(error) {
      const newError = error;

      if (error.response && error.response.data) {
        newError.response = {
          ...error.response,
          data: convertData(error.response.data, camelCase)
        };
      }

      throw newError;
    }
  });
};

export default registerService;

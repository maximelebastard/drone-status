export const fetchOptions = {
  headers: new Headers({
    Authorization: process.env.REACT_APP_DRONE_TOKEN
  })
};

export const apiRoot = process.env.REACT_APP_DRONE_API;

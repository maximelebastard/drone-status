import * as client from "./client";

export function getBuilds() {
  return fetch(`${client.apiRoot}/builds/incomplete`, {
    ...client.fetchOptions,
    method: "GET"
  }).then(response => response.json());
}

export function getLatest(owner, name, branch = "master") {
  return fetch(
    `${client.apiRoot}/repos/${owner}/${name}/builds/latest?branch=${branch}`,
    {
      ...client.fetchOptions,
      method: "GET"
    }
  ).then(response => response.json());
}

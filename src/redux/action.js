import * as buildApi from "../api/builds";
import * as streamApi from "../api/stream";
import { actions } from "./reducer";

export const fetchBuilds = () => async dispatch => {
  dispatch({ type: actions.FETCH_BUILDS_REQUESTED });

  try {
    const data = await buildApi.getBuilds();

    const builds = data.reduce((acc, build) => {
      acc[build.build.id] = {
        repoSlug: build.slug,
        number: build.build.number,
        message: build.build.message,
        authorAvatar: build.build.author_avatar,
        authorName: build.build.author_name,
        event: build.build.event,
        source: build.build.source,
        after: build.build.after
      };
      return acc;
    }, {});

    dispatch({ type: actions.FETCH_BUILDS_SUCCEEDED });
    dispatch({ type: actions.UPDATE_BUILDS, builds });
  } catch (e) {
    dispatch({ type: actions.FETCH_BUILDS_FAILED, error: e });
  }
};

export const watchBuilds = () => async dispatch => {
  dispatch({ type: actions.WATCH_BUILDS_REQUESTED });

  try {
    for await (const streamData of streamApi.watchStream()) {
      dispatch({ type: actions.WATCH_BUILDS_SUCCEEDED });

      if (streamData.ping) {
        dispatch({ type: actions.WATCH_PING });
      }

      if (streamData.data) {
        if (streamData.data.build) {
          dispatch({
            type: actions.UPDATE_BUILDS,
            builds: {
              [streamData.data.build.id]: streamData.data.build
            }
          });
        }
      }
    }
  } catch (e) {
    dispatch({ type: actions.WATCH_BUILDS_FAILED, error: e });
  }
};

export const fetchLatestBuild = (owner, name, branch) => async dispatch => {
  dispatch({ type: "FETCH_LATEST_BUILD", repo: `${owner}/${name}/${branch}` });

  try {
    const data = await buildApi.getLatest(owner, name, branch);
    console.log({ data });

    /*const builds = data.reduce((acc, build) => {
      acc[build.build.id] = {
        repoSlug: build.slug,
        number: build.build.number,
        message: build.build.message,
        authorAvatar: build.build.author_avatar,
        authorName: build.build.author_name,
        event: build.build.event,
        source: build.build.source,
        after: build.build.after
      };
      return acc;
    }, {});*/

    dispatch({
      type: "FETCH_LATEST_BUILD_RESPONSE",
      repo: `${owner}/${name}/${branch}`
    });
  } catch (e) {
    dispatch({
      type: "FETCH_LATEST_BUILD_FAILED",
      repo: `${owner}/${name}/${branch}`,
      error: e
    });
  }
};

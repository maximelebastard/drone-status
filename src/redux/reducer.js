const initialState = {
  builds: {},
  watchBuildsFailed: false,
  fetchBuildsFailed: false,
  isFetchingBuilds: false,
  isWatchingBuilds: false
};

export const actions = {
  WATCH_PING: "WATCH_PING",
  FETCH_BUILDS_REQUESTED: "FETCH_BUILDS_REQUESTED",
  FETCH_BUILDS_FAILED: "FETCH_BUILDS_FAILED",
  FETCH_BUILDS_SUCCEEDED: "FETCH_BUILDS_SUCCEEDED",
  WATCH_BUILDS_REQUESTED: "WATCH_BUILDS_REQUESTED",
  WATCH_BUILDS_FAILED: "WATCH_BUILDS_FAILED",
  WATCH_BUILDS_SUCCEEDED: "WATCH_BUILDS_SUCCEEDED",
  UPDATE_BUILDS: "UPDATE_BUILDS"
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.WATCH_PING:
      return {
        ...state,
        latestPing: Date.now()
      };

    case actions.FETCH_BUILDS_REQUESTED:
      return {
        ...state,
        isFetchingBuilds: true
      };

    case actions.FETCH_BUILDS_FAILED:
      return {
        ...state,
        fetchBuildsFailed: true,
        isFetchingBuilds: false
      };

    case actions.FETCH_BUILDS_SUCCEEDED:
      return {
        ...state,
        fetchBuildsFailed: false,
        isFetchingBuilds: false
      };

    case actions.WATCH_BUILDS_REQUESTED:
      return {
        ...state,
        isWatchingBuilds: true
      };

    case actions.WATCH_BUILDS_FAILED:
      return {
        ...state,
        watchBuildsFailed: true
      };

    case actions.WATCH_BUILDS_SUCCEEDED:
      return {
        ...state,
        watchBuildsFailed: false
      };

    case actions.UPDATE_BUILDS:
      return {
        ...state,
        builds: {
          ...state.activeBuilds,
          ...action.builds
        }
      };
    default:
      return state;
  }
}

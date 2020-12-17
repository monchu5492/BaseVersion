import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  gamesList,
  ownerList,
  ownerReportsList,
  tournamentsList,
  servertime,
  expiretime,
  player,
  videosList,
  message,
  blogsList,
} from "./reducers.js";

const clientLogger = (store) => (next) => (action) => {
  if (action.type) {
    let result;
    console.groupCollapsed("client side dispatching", action.type);
    console.log("prev state", store.getState().gamesList.games);
    console.log("action", action);
    result = next(action);
    console.log("next state", store.getState().gamesList.games);
    console.groupEnd();
    return result;
  }
  return next(action);
};

const serverLogger = (store) => (next) => (action) => {
  console.log("current state", store.getState());
  console.log("\n  dispatching server action\n");
  console.log(action);
  console.log("\n");
  console.log("next state", store.getState());
  return next(action);
};

const middleware = (server) => [server ? serverLogger : clientLogger, thunk];

const storeFactory = (server = true, initialState) =>
  applyMiddleware(...middleware(server))(createStore)(
    combineReducers({
      gamesList,
      ownerList,
      ownerReportsList,
      tournamentsList,
      servertime,
      expiretime,
      player,
      videosList,
      message,
      blogsList,
    }),
    initialState
  );

export default storeFactory;

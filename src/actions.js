import fetch from "isomorphic-fetch";
import { func } from "prop-types";
import C from "./constants";

const parseResponse = (response) => response.json();
const logError = (error) => console.error(error);

const apiPath = "http://localhost:4500";

const actionCreators = {
  requestOwnerTournaments: () => ({
    type: "FETCH_OWNER_TOURNAMENTS",
    loading: true,
    error: null,
  }),
  requestOwnerTournamentsSuccess: (ownertournaments) => ({
    type: "FETCH_OWNER_TOURNAMENTS_SUCCESS",
    payload: ownertournaments,
  }),
  requestOwnerTournamentsError: (error) => ({
    type: "FETCH_OWNER_TOURNAMENTS_ERROR",
    loading: false,
    time: "",
    error,
  }),
  requestTime: () => ({
    type: "FETCH_TIME",
    loading: true,
    error: null,
  }),
  requestTimeSuccess: (time) => ({
    type: "FETCH_TIME_SUCCESS",
    payload: time,
  }),
  requestTimeError: (error) => ({
    type: "FETCH_TIME_ERROR",
    loading: false,
    time: "",
    error,
  }),
  checkEmail: () => ({
    type: "FETCH_EMAIL",
    loading: true,
    error: null,
  }),
  checkAuth: () => ({
    type: "FETCH_AUTH",
    loading: true,
    error: null,
  }),
  checkVideo: () => ({
    type: "FETCH_VIDEOS",
    loading: true,
    error: null,
  }),
  checkVideoSuccess: (orders) => ({
    type: "FETCH_VIDEOS_SUCCESS",
    payload: orders,
  }),
  checkVideoError: (error) => ({
    type: "FETCH_VIDEOS_ERROR",
    loading: false,
    orders: "",
    error,
  }),
  checkBlog: () => ({
    type: "FETCH_BLOGS",
    loading: true,
    error: null,
  }),
  checkBlogSuccess: (orders) => ({
    type: "FETCH_BLOGS_SUCCESS",
    payload: orders,
  }),
  checkBlogError: (error) => ({
    type: "FETCH_BLOGS_ERROR",
    loading: false,
    orders: "",
    error,
  }),
  requestPlayerName: () => ({
    type: "FETCH_PLAYERNAME",
    loading: true,
    error: null,
  }),
  requestPlayerNameSuccess: (playername) => ({
    type: "FETCH_PLAYERNAME_SUCCESS",
    payload: playername,
  }),
  requestPlayerNameError: (error) => ({
    type: "FETCH_PLAYERNAME_ERROR",
    loading: false,
    playername: "",
    error,
  }),
  requestTournaments: () => ({
    type: "FETCH_TOURNAMENTS",
    loading: true,
    error: null,
  }),
  requestTournamentsSuccess: (tournaments) => ({
    type: "FETCH_TOURNAMENTS_SUCCESS",
    payload: tournaments,
  }),
  requestTournamentsError: (error) => ({
    type: "FETCH_TOURNAMENTS_ERROR",
    loading: false,
    gameList: [],
    error,
  }),
  requestMessageSuccess: (message) => ({
    type: "FETCH_MESSAGE_SUCCESS",
    text: message,
  }),
  requestMessageError: (error) => ({
    type: "FETCH_MESSAGE_ERROR",
    loading: false,
    error,
  }),
  // blogPageLoaded: () => ({
  //   type: 'BLOG_PAGE_LOADED'
  // }),
};
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client

const fetchThenDispatch = (dispatch, url, method, body) =>
  fetch(url, {
    method,
    body,
    mode: "cors",
    headers: { Accept: "application/json" },
  })
    .then(parseResponse)
    .then(dispatch)
    .catch(logError);

// starting with creating a socket through action
export const addNewItemSocket = (socket, id, item) => (dispatch) => {
  const postData = {
    id: id + 1,
    item,
    completed: false,
  };
  socket.emit("addItem", postData);
};

export const fetchPlayerName = () =>
  function(dispatch) {
    dispatch(actionCreators.requestPlayerName());
    return fetch(`${apiPath}/players/username`, {
      credentials: "include",
      mode: "cors",
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Bad HTTP stuff");
      })
      .then((fetchedPlayerName) =>
        dispatch(actionCreators.requestPlayerNameSuccess(fetchedPlayerName))
      )
      .catch((error) => {
        console.error(error);
        dispatch(actionCreators.requestPlayerNameError(error));
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

export const fetchOwnerTournaments = () =>
  function(dispatch) {
    dispatch(actionCreators.requestOwnerTournaments());

    return fetch(`${apiPath}/invited/owner`, {
      credentials: "include",
      mode: "cors",
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Bad HTTP stuff");
      })
      .then((fetchedOwner) =>
        dispatch(actionCreators.requestOwnerTournamentsSuccess(fetchedOwner))
      )
      .catch((error) => {
        console.error(error);
        dispatch(actionCreators.requestOwnerTournamentsError(error));
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

export const fetchTime = () =>
  function(dispatch) {
    dispatch(actionCreators.requestTime());

    return fetch(`${apiPath}/games/servertime`, {
      credentials: "include",
      mode: "cors",
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Bad HTTP stuff");
      })
      .then((fetchedTime) =>
        dispatch(actionCreators.requestTimeSuccess(fetchedTime))
      )
      .catch((error) => {
        console.error(error);
        dispatch(actionCreators.requestTimeError(error));
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

export const setMessage = (message) =>
  function(dispatch) {
    console.log(`\n\n\n Message Message!!! ${message}\n\n\n`);
    if (message !== undefined) {
      dispatch(actionCreators.requestMessageSuccess(message));
      return fetch(`${apiPath}/message/${message}`, {
        method: "get",
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("404");
      });
    }
    return true;
  };

export const checkForVideo = () =>
  function(dispatch) {
    dispatch(actionCreators.checkVideo());
    return fetch(`${apiPath}/adaptation/checkvideo`, {
      method: "get",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("404");
      })
      .then((videoStatus) =>
        dispatch(actionCreators.checkVideoSuccess(videoStatus))
      )
      .catch((error) => {
        console.error(error);
        dispatch(actionCreators.checkVideoError(error));
      });
  };

export const checkForBlog = () =>
  function(dispatch) {
    dispatch(actionCreators.checkBlog());
    return fetch(`${apiPath}/blogs/checkBlog`, {
      method: "get",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("404");
      })
      .then((blogStatus) =>
        dispatch(actionCreators.checkBlogSuccess(blogStatus))
      )
      .catch((error) => {
        console.error(error);
        dispatch(actionCreators.checkBlogError(error));
      });
  };

// export const addBlog = () => function(dispatch) {

// };

export const fetchTournaments = () =>
  function(dispatch) {
    dispatch(actionCreators.requestTournaments());

    return fetch(`${apiPath}/games/joinedtournaments`, {
      credentials: "include",
      mode: "cors",
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Bad HTTP stuff");
      })
      .then((fetchedTournaments) =>
        dispatch(actionCreators.requestTournamentsSuccess(fetchedTournaments))
      )
      .catch((error) => {
        console.error(error);
        dispatch(actionCreators.requestTournamentsError(error));
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

export const fetchLogout = () =>
  function() {
    return fetch(`${apiPath}/logout`, {
      credentials: "include",
      mode: "cors",
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Bad HTTP stuff");
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

export const login = (email, password) => (dispatch) =>
  fetchThenDispatch(
    dispatch,
    "/login_v2",
    "POST",
    JSON.stringify({ email, password })
  );

export const resetPassword = (token, password) =>
  function(dispatch) {
    dispatch(actionCreators.checkEmail());
    // return fetch(`apiPath/reset/${token}`, {
    return fetch(`${apiPath}/reset_v2/${token}/${password}`, {
      mode: "cors",
      method: "post",
      credentials: "include",
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Bad HTTP stuff");
      })
      .then((changedPassword) =>
        dispatch(actionCreators.requestMessageSuccess(changedPassword))
      )
      .catch((error) => {
        console.error(error);
        dispatch(actionCreators.requestMessageError(error));
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

export const forgotPassword = (email) =>
  function(dispatch) {
    dispatch(actionCreators.checkEmail());

    return fetch(`${apiPath}/forgot_v2/${email}`, {
      mode: "cors",
      method: "post",
      credentials: "include",
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Bad HTTP stuff");
      })
      .then((fetchedEmail) =>
        dispatch(actionCreators.requestMessageSuccess(fetchedEmail))
      )
      .catch((error) => {
        console.error(error);
        dispatch(actionCreators.requestMessageError(error));
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

export const addUser = () =>
  function(dispatch) {
    dispatch(actionCreators.checkEmail());

    return fetch(`${apiPath}/signup_v2`, {
      method: "post",
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Bad HTTP stuff");
      })
      .then((fetchedEmail) =>
        dispatch(actionCreators.requestMessageSuccess(fetchedEmail))
      )
      .catch((error) => {
        console.error(error);
        dispatch(actionCreators.requestMessageError(error));
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

export const checkAuth = () =>
  function(dispatch) {
    dispatch(actionCreators.checkAuth());

    return fetch(`${apiPath}/noauth`, {
      mode: "cors",
      method: "get",
      credentials: "include",
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Bad HTTP stuff");
      })
      .then((fetchedAuth) =>
        dispatch(actionCreators.requestMessageSuccess(fetchedAuth))
      )
      .catch((error) => {
        if (error) {
          console.error(error);
          dispatch(actionCreators.requestMessageError(error));
        }
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

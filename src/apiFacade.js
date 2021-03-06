import URL from "./settings";
import jwtDecode from "jwt-decode";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() })
  }
  return res.json();
}

function apiFacade() {
  /* Insert utility-methods from a later step (d) here (REMEMBER to uncomment in the returned object when you do)*/
  const setToken = (token) => {
    localStorage.setItem('jwtToken', token)
  }
  const getToken = () => {
    return localStorage.getItem('jwtToken')
  }

  const decodeToken = () => {
    const token = getToken()
    const decodeToken = token;
    const decode = jwtDecode(decodeToken)
    setToken(token);
    return decode
  }

  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  }
  const logout = () => {
    localStorage.removeItem("jwtToken");
  }

  const login = (user, password) => {
    const options = makeOptions("POST", true, { username: user, password: password });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then(res => { setToken(res.token) })
  }
  const fetchUserInfo = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/info/userinfo", options).then(handleHttpErrors);
  }

  const fetchCat = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/cat/cat", options).then(handleHttpErrors);
  }

  const fetchMatches= () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/matches/all", options).then(handleHttpErrors);
  }

  const fetchLocations= () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/matches/locations", options).then(handleHttpErrors);
  }

  const fetchPlayers= () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/matches/players", options).then(handleHttpErrors);
  }

  const fetchByPlayerId = (id) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + `/api/matches/${id}/play`, options).then(handleHttpErrors);
  }

  const fetchByLocationId = (id) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + `/api/matches/${id}/location`, options).then(handleHttpErrors);
  }

  const createLocation = (locationInfo) => {
    const options = makeOptions("POST", true, locationInfo); //True add's the token
    return fetch(URL + "/api/admin/location", options)
      .then(handleHttpErrors)
      .then(res => { setToken(res.token) })
  }

  const createMatch = (matchInfo) => {
    const options = makeOptions("POST", true, matchInfo); //True add's the token
    console.log(matchInfo);
    return fetch(URL + "/api/admin/match", options)
      .then(handleHttpErrors)
      .then(res => { setToken(res.token) })
  }

  const createPlayer = (playerInfo) => {
    const options = makeOptions("POST", true, playerInfo); //True add's the token
    return fetch(URL + "/api/admin/player", options)
      .then(handleHttpErrors)
      .then(res => { setToken(res.token) })
  }

  const create = (username, password) => {
    const options = makeOptions("POST", true, { userName: username, userPass: password }); //True add's the token
    console.log(username + " " + password);
    return fetch(URL + "/api/info/newuser", options)
      .then(handleHttpErrors)
      .then(res => { setToken(res.token) })
  }

  const updateMatch = (matchID,matchInfo) => {
    const options = makeOptions("PUT", true, matchInfo); //True add's the token
    return fetch(URL + `/api/admin/${matchID}/match`, options)
      .then(handleHttpErrors)
      .then(res => { setToken(res.token) })
  }

  const connectMatch = (ids) => {
    const options = makeOptions("PUT", true); //True add's the token
    return fetch(URL + `/api/admin/${ids.matchId}/connect/${ids.locationId}`, options)
      .then(handleHttpErrors)
      .then(res => { setToken(res.token) })
  }

  const deletePlayer = (id) => {
    const options = makeOptions("DELETE", true); //True add's the token
    return fetch(URL + `/api/admin/${id}/delete`, options).then(handleHttpErrors);
  }

  const deleteLocation = (id) => {
    const options = makeOptions("DELETE", true); //True add's the token
    return fetch(URL + `/api/admin/${id}/delete/location`, options).then(handleHttpErrors);
  }

  const deleteMatch = (id) => {
    const options = makeOptions("DELETE", true); //True add's the token
    return fetch(URL + `/api/admin/${id}/delete/location`, options).then(handleHttpErrors);
  }

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        'Accept': 'application/json',
      }
    }
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  }
  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchUserInfo,
    fetchCat,
    create,
    decodeToken,
    updateMatch,
    deletePlayer,
    fetchMatches,
    fetchByPlayerId,
    fetchByLocationId,
    createLocation,
    createMatch,
    createPlayer,
    connectMatch,
    fetchLocations,
    fetchPlayers,
    deleteLocation,
    deleteMatch,
  }
}
const facade = apiFacade();
export default facade;

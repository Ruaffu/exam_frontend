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

  const create = (username, password) => {
    const options = makeOptions("POST", true, { userName: username, userPass: password }); //True add's the token
    console.log(username + " " + password);
    return fetch(URL + "/api/info/newuser", options)
      .then(handleHttpErrors)
      .then(res => { setToken(res.token) })
  }

  const updatetemplate = (boatID,boatInfo) => {
    const options = makeOptions("PUT", true, boatInfo); //True add's the token
    console.table(boatInfo);
    return fetch(URL + `/api/boats/${boatID.id}/update`, options)
      .then(handleHttpErrors)
      .then(res => { setToken(res.token) })
  }

  const deleteTemplate = (id) => {
    const options = makeOptions("DELETE", true); //True add's the token
    return fetch(URL + `/api/boats/${id.boatID}/delete`, options).then(handleHttpErrors);
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
    updatetemplate,
    deleteTemplate,
  }
}
const facade = apiFacade();
export default facade;

import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import "../styles/LoginPage.css";

function LogIn({ login, error, creatingUser }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div className="smaller-container">
      <div className="login-section">
        <h2>Log in</h2>
        <div >
        <form onChange={onChange}>
          <input type="text" placeholder="User Name" id="username" />
          <input type="password" placeholder="Password" id="password" />
          <div style={{ color: "red" }}>{error}</div>
          <button className="button" onClick={performLogin}>
            Login
          </button>
          <button className="button" onClick={creatingUser}>
            Create
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}

function CreateUser({ create }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    create(loginCredentials.username, loginCredentials.password);
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div className="smaller-container">
      <div className="login-section">
        <h2>Create user</h2>
        <form onChange={onChange}>
          <input type="text" placeholder="User Name" id="username" />
          <input type="password" placeholder="Password" id="password" />
          <button className="login-button" onClick={performLogin}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
function LoggedIn({ setIsAdmin, setIsUser }) {
  const [dataFromServer, setDataFromServer] = useState("Loading...");

  useEffect(() => {
    facade.fetchUserInfo().then((data) => {
      setDataFromServer(data);
      console.log(data.roles);
      if (data.roles.includes("admin")) {

        setIsAdmin(true);
      }
      if (data.roles.includes("user")) {
        setIsUser(true)
      }
    });
  }, []);

  return (
    <div>
      <h2>Data Received from server</h2>
      <h3>
        Hello {dataFromServer.userName} Role: {dataFromServer.roles}
      </h3>
    </div>
  );
}

function LoginPage({ loggedIn, setLoggedIn, setIsAdmin, setIsUser }) {
  const [creatingUser, setCreatingUser] = useState(false);
  const [error, setError] = useState(null);

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    setIsAdmin(false);
    setIsUser(false)
  };
  const login = (user, pass) => {
    facade
      .login(user, pass)
      .then((res) => setLoggedIn(true))
      .catch((err) => {
        if (err.status == 403) {
          setError("Wrong username or Password");
        } else {
          setError("Something went wrong");
        }
      });
  };

  function createUser() {
    setCreatingUser(!creatingUser);
  }

  const create = (user, pass) => {
    facade.create(user, pass);
  };

  return (
    <main>
      {!loggedIn ? (
        !creatingUser ? (
          <LogIn login={login} error={error} creatingUser={createUser} />
        ) : (
          <CreateUser create={create} />
        )
      ) : (
        <div>
          <LoggedIn setIsAdmin={setIsAdmin} setIsUser={setIsUser} />
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </main>
  );
}
export default LoginPage;

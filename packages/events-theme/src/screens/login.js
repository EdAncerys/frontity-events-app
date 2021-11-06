import React, { useState } from "react";
import { connect } from "frontity";

const login = ({ state, actions }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // HELPERS ----------------------------------------------------
  const handleUserLogin = async () => {
    console.log("handleUserLogin triggered");
    if (username === "" || password === "") return;
    const URL = "http://localhost:8888/events/wp-json/jwt-auth/v1/token";

    const userCredentials = JSON.stringify({
      username,
      password,
    });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: userCredentials,
    };
    try {
      const data = await fetch(URL, requestOptions);
      const response = await data.json();
      if (response.token) {
        actions.router.set("/");
        actions.theme.setLogin(true);
      } else {
        alert(`${response.message}`);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>Email address</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="email"
          className="form-control"
          placeholder="Enter email or username"
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
          placeholder="Password"
        />
      </div>
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" />
        <label className="form-check-label">Check me out</label>
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={handleUserLogin}
      >
        Login
      </button>
    </div>
  );
};

export default connect(login);

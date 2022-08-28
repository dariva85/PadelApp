import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import "./LoginScreen.css";
import * as api from "../api/api.js";
import * as tk from "../api/token";

export default function LoginScreen(onLogin) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [message, setMessage] = useState(null);
  const [token, setToken] = useState(tk.readToken);

  const SaveToken = (token) => {
    setToken(token);
    tk.saveToken(token);
    navigate("/me/competitions");
  };

  const login = async (userData) => {
    const { success, result: token, error } = await api.login(userData);
    console.log(success);
    if (success) {
      SaveToken(token);
    } else {
      setMessage(error);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    console.log("submit");
    login({ email, password });
  };

  return (
    <div className="login-screen">
      <TopBar />
      <div>
        <div id="login-container">
          <form className="login" onSubmit={submit}>
            <h1>Login</h1>
            <p className="error-message">{message}</p>
            <label>
              <div>Email</div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              <div>Password</div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <input className="submit" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import "./LoginScreen.css";
import * as api from "../api/api.js";
import * as tk from "../api/token";
import * as usr from "../User";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginScreen(onLogin) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const SaveToken = (token) => {
    tk.saveToken(token);
  };

  const login = async (userData) => {
    const {
      success,
      result: { token, user },
      error,
    } = await api.login(userData);

    if (success) {
      SaveToken(token);
      usr.saveUser(user);
      return true;
    } else {
      if (error == "InvalidData") {
        setMessage("Los datos introducidos son incorrectos.");
      } else {
        setMessage(error);
      }
      return false;
    }
  };

  const loginWithGoogle = async (userData) => {
    const {
      success,
      result: { token, user },
      error,
    } = await api.loginWithGoogle(userData);

    if (success) {
      SaveToken(token);
      usr.saveUser(user);
      return true;
    } else {
      if (error == "InvalidData") {
        setMessage("Los datos introducidos son incorrectos.");
      } else {
        setMessage(error);
      }
      return false;
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const succesLogin = await login({ email, password });
    if (succesLogin) {
      navigate("/");
    }
  };

  const submitByGoogle = async (credentials) => {
    const succesLogin = await loginWithGoogle(credentials);
    if (succesLogin) {
      navigate("/");
    }
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
            <div id="google-login">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  submitByGoogle(credentialResponse);
                }}
                onError={() => {
                  setMessage("Login with google failed. Try it later.");
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

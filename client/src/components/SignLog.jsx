import React, { useState, useEffect, useRef, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
  useParams,
} from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
//context
import { GlobalContext } from "../GlobalContext";
// util
import { login, signup } from "./api";

import "./css/Form.css";
export function Login() {
  const form = useRef({});

  const { setUser } = useContext(GlobalContext);
  return (
    <div className="login">
      <Typography variant="h2" color="primary">
        Kissaan
      </Typography>
      <Typography variant="subtitle1">Log in</Typography>
      <div className="form">
        <TextField
          label="number"
          defaultValue=""
          variant="outlined"
          margin="dense"
          onChange={(e) => {
            form.current.username = e.target.value;
          }}
        />
        <TextField
          label="password"
          type="password"
          defaultValue=""
          variant="outlined"
          margin="dense"
          onChange={(e) => {
            form.current.password = e.target.value;
          }}
        />
      </div>
      <Button
        variant="outlined"
        onClick={() => {
          if (
            Number(form.current.username) &&
            form.current.username.length === 10
          ) {
            login({
              number: form.current.username,
              password: form.current.password,
            }).then(setUser);
          }
        }}
      >
        Log in
      </Button>
    </div>
  );
}
export function Signup() {
  const { setUser } = useContext(GlobalContext);
  const form = useRef({});
  const [errm, setErr] = useState("");
  const verify = async () => {
    if (!form.current.username) {
      setErr("Enter Name");
      return;
    } else if (form.current.username && !form.current.username.trim()) {
      setErr("Name invalid");
      return;
    } else if (!form.current.number) {
      setErr("Enter your phone number");
      return;
    } else if (
      form.current.number &&
      (!Number(form.current.number) || form.current.number.length > 10)
    ) {
      setErr("Enter a valid phone number");
      return;
    } else if (form.current.password !== form.current.password2) {
      setErr("passwords dont match");
      return;
    }
    setUser(await signup(form.current));
  };

  return (
    <div className="signup">
      <Typography variant="h2" color="primary">
        Kissaan
      </Typography>
      <Typography variant="subtitle1">Sign up</Typography>
      {errm ? (
        <Typography style={{ color: "red" }} variant="subtitle1">
          {errm}
        </Typography>
      ) : (
        <></>
      )}

      <div className="form">
        <div className="sub-form">
          <TextField
            label="Mobile no."
            defaultValue=""
            variant="outlined"
            margin="dense"
            onChange={(e) => {
              form.current.number = e.target.value;
            }}
          />
          <TextField
            label="Full name"
            defaultValue=""
            variant="outlined"
            margin="dense"
            onChange={(e) => {
              form.current.username = e.target.value;
            }}
          />
        </div>
        <div className="sub-form">
          <TextField
            label="password"
            type="password"
            defaultValue=""
            variant="outlined"
            margin="dense"
            onChange={(e) => {
              form.current.password = e.target.value;
            }}
          />
          <TextField
            label="retype password"
            type="password"
            defaultValue=""
            variant="outlined"
            margin="dense"
            onChange={(e) => {
              form.current.password2 = e.target.value;
            }}
          />
        </div>
      </div>
      <Button variant="outlined" onClick={verify}>
        Sign up
      </Button>
    </div>
  );
}

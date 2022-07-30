import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { signUpUser } from "../../services/authServices";
import { useGlobalState } from "../../utils/stateContext";
import { TextField, Button, Alert } from "@mui/material";
import styles from "./Form.module.css";
import Navbar from "../Navbar";

const SignUp = () => {
  const { dispatch } = useGlobalState();
  const location = useLocation();

  console.log("Signup");
  const navigate = useNavigate();
  const initialFormData = {
    username: "",
    email: "",
    password: "",
  };

  const [formData, setUser] = useState(initialFormData);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!location.state) {
      setUser(initialFormData);
    } else if (location.state.username === false) {
      setErr("You can't use the username. Please check the format");
    } else {
      setUser({
        ...formData,
        username: location.state.username,
      });
    } // eslint-disable-next-line
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();

    signUpUser(formData)
      .then((user) => {
        if (user.error) {
          setErr(user.error);
        } else {
          console.log("signup user", user);
          dispatch({
            type: "setLoggedInUser",
            data: user.username,
          });
          dispatch({
            type: "setToken",
            data: user.jwt,
          });
          dispatch({
            type: "setCurrentUserId",
            data: user.id,
          });
          sessionStorage.setItem("id", user.id);
          sessionStorage.setItem("username", user.username);
          sessionStorage.setItem("token", user.jwt);
          navigate("/dashboard", { state: { isNewUser: true } });
        }
      })
      .catch((error) => console.log(error));

    // setUser(userAuth.getUser());
  };

  const handleUserData = (e) => {
    // validate username
    if (e.target.id === "username") {
      console.log(e.target.id);
      console.log("validate username", e.target.value);
      const result = /^[a-z0-9_-]{0,30}$/.test(e.target.value);
      console.log(result);

      if (result) {
        setErr(null);
        setUser({
          ...formData,
          [e.target.id]: e.target.value,
        });
      } else {
        setErr("Please check your username format");
      }
    } else {
      setErr(null);
      setUser({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  return (
    <section className={styles.container}>
      <Navbar />

      <form onSubmit={handleSubmit} className={styles.form}>
        <div
          className={`${styles.error} ${err ? styles.display : styles.hidden}`}
        >
          <Alert severity="error" variant="outlined">
            {err && err}
          </Alert>
        </div>
        <h1 className={styles.title}>Welcome!</h1>
        <TextField
          required
          label="Username"
          variant="standard"
          name="username"
          id="username"
          data-testid="username"
          helperText="Username must not contain any space. Choose a username 4–30 characters long."
          onChange={handleUserData}
          value={formData.username}
        />
        <TextField
          required
          type="email"
          label="Email"
          variant="standard"
          name="email"
          id="email"
          data-testid="email"
          value={formData.email}
          onChange={handleUserData}
        />

        <TextField
          required
          label="Password"
          variant="standard"
          type="password"
          name="password"
          id="password"
          data-testid="password"
          value={formData.password}
          onChange={handleUserData}
        />

        <Button variant="outlined" type="submit" color="primary">
          Sign Up
        </Button>
      </form>
    </section>
  );
};

export default SignUp;

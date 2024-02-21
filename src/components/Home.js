import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import { Button, TextField } from "@mui/material";
import styles from "./Home.module.css";
import InfoPanel from "./infoPanel/InfoPanel";

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // pass the username to the Signup component
    navigate("/signup", { state: { username: username } });
  };

  const handleChange = (e) => {
    const result = /^[a-z0-9_-]{0,30}$/.test(e.target.value);
    result ? setUsername(e.target.value) : setUsername(false);
  };

  return (
    <section className={styles.container}>
      <Navbar />
      <InfoPanel />
      <div className={styles.home}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.title} data-testid="home-title">
            Everything in one link
          </h1>

          <TextField
            id="username"
            name="username"
            label="/yourname"
            onChange={handleChange}
            className={styles.paddedRight}
          />
          <Button variant="outlined" type="submit" color="primary">
            Claim your iLink
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Home;

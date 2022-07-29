import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../services/linksServices";
import Card from "./Card";
import styles from "./YouriLink.module.css";
import Footer from "../Footer";
import { useGlobalState } from "../../utils/stateContext";

const YouriLink = () => {
  const { username } = useParams();
  console.log(username);

  const { store, dispatch } = useGlobalState();
  const { token, links, appearance, loggedInUser } = store;

  console.log("******* check state ************");
  console.log("links", links);
  console.log("appearance", appearance);

  const [loading, setLoading] = useState(true);
  const [visitor, setVisitor] = useState(username ? true : false);

  useEffect(() => {
    console.log("visitor ? ", username ? true : false);
    if (visitor) {
      getData(username)
        .then((data) => {
          console.log("YouriLink - username useEffect - triggered");
          console.log(data);
          dispatch({
            type: "setLinks",
            data: data.links,
          });
          dispatch({
            type: "setAppearance",
            data: data.appearance,
          });
        })
        .then(setLoading(false))
        .catch((e) => console.log(e));
    } else {
      console.log("useEffect- token", token);
      getData(token) //
        .then((data) => {
          console.log("YouriLink - token useEffect - triggered");
          console.log(data);

          console.log("YouriLink - request dashboard data");
          dispatch({
            type: "setLinks",
            data: data.links,
          });
          dispatch({
            type: "setAppearance",
            data: data.appearance,
          });

          setVisitor(false);
        })
        .then(setLoading(false))
        .catch((e) => console.log(e));
    } // eslint-disable-next-line
  }, [visitor, username, token]);

  const setTheme = (theme) => {
    switch (theme) {
      case "light":
        return `${styles.light}`;
      case "dark":
        return `${styles.dark}`;
      case "colourful":
        return `${styles.colourful}`;
      case "pink":
        return `${styles.pink}`;
      case "blue":
        return `${styles.blue}`;
      case "green":
        return `${styles.green}`;
      case undefined:
        return `${styles.light}`;
      default:
        throw Error(`unknown theme ${theme}`);
    }
  };

  return (
    <>
      {loading ? (
        <h1> this is loading </h1>
      ) : (
        <section
          className={`${styles.container} ${setTheme(
            (appearance && appearance.bg_color) ?? "light"
          )}`}
        >
          <Card visitor={visitor} />
        </section>
      )}
      <Footer />
    </>
  );
};

export default YouriLink;

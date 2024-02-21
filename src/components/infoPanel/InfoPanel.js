import styles from "./InfoPanel.module.css";

const InfoPanel = () => {
  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <h3 className={styles.heading}>🚧 Heads up! 🚧</h3>
        <p className={styles.para}>Thanks for visiting iLink!</p>
        <p className={styles.para}>We're fixing 👷‍♀️ and moving...🚚</p>
        <p className={styles.para}>
          The server will point to your localhost. So it won't work as expected.
          Sorry about that 🥲
        </p>
        <p className={styles.para}>
          You can enjoy iLink locally. Other than that, hope to see you soon!
        </p>
      </div>
    </div>
  );
};

export default InfoPanel;

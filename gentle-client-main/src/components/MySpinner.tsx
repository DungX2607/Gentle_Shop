import React from "react";
import styles from "../assets/css/components/MySpinner.module.css";

const MySpinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <div className={styles.loader__bar}></div>
        <div className={styles.loader__bar}></div>
        <div className={styles.loader__bar}></div>
        <div className={styles.loader__bar}></div>
        <div className={styles.loader__bar}></div>
        <div className={styles.loader__ball}></div>
      </div>
    </div>
  );
};

export default MySpinner;

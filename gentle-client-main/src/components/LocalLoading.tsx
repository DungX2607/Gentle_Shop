import React from "react";
import styles from "../assets/css/components/localLoading.module.css";
const LocalLoading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.lds_ripple}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LocalLoading;

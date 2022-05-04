import { CheckCircleIcon, CheckIcon, WarningTwoIcon } from "@chakra-ui/icons";
import React, { ReactNode } from "react";
import styles from "../assets/css/pages/payment.module.css";
interface ErrorProps {
  type: string;
  message: string;
}

const MyErrorMessage = ({ type, message }: ErrorProps) => {
  let body: ReactNode = null;

  switch (type) {
    case "error":
      body = (
        <div className={styles.errorDisplay}>
          <WarningTwoIcon marginRight={1} />
          {message}
        </div>
      );
      break;
    case "success":
      body = (
        <div className={styles.successDisplay}>
          <CheckCircleIcon marginRight={1} />
          {message}
        </div>
      );
      break;
    default:
      break;
  }
  return <div>{body}</div>;
};

export default MyErrorMessage;

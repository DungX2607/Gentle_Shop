import { ChevronRightIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "../assets/css/components/redirectHeader.module.css";

export interface RedirectHeaderProps {
  displayName: string;
  url: string;
}

interface RedirectProps {
  pageName?: string;
  list: RedirectHeaderProps[];
}

const RedirectHeader = ({ list, pageName }: RedirectProps) => {
  if (pageName) {
    return (
      <>
        <div className="grid wide">
          <div className="row">
            <div className="col l-4 l-o-4 m-6 m-o-3 c-12">
              <div className="brandName">
              <h1 >{pageName}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.redirectBackground}>
          <div className="grid wide">
            <div className="row">
              <div className="col l-12 m-12 c-12">
                <div className={styles.header}>
                  {list.map((redirect, index) =>
                    index === 0 ? (
                      <Link href={redirect.url} key={index}>
                        <div className={styles.item}>
                          <p className={styles.redirectName}>
                            {redirect.displayName}
                          </p>
                        </div>
                      </Link>
                    ) : (
                      <Link href={redirect.url} key={index}>
                        <div className={styles.item}>
                          <ChevronRightIcon className={styles.redirectIcon} />
                          <p className={styles.redirectName}>
                            {redirect.displayName}
                          </p>
                        </div>
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className={styles.redirectBackground}>
        <div className="grid wide">
          <div className="row">
            <div className="col l-12 m-12 c-12">
              <div className={styles.header}>
                {list.map((redirect, index) =>
                  index === 0 ? (
                    <Link href={redirect.url} key={index}>
                      <div className={styles.item}>
                        <p className={styles.redirectName}>
                          {redirect.displayName}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <Link href={redirect.url} key={index}>
                      <div className={styles.item}>
                        <ChevronRightIcon className={styles.redirectIcon} />
                        <p className={styles.redirectName}>
                          {redirect.displayName}
                        </p>
                      </div>
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default RedirectHeader;

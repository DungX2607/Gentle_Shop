import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Carousel from "nuka-carousel"

import styles from "../assets/css/components/ImageFullScreen.module.css";
export interface ImageFullScreenProps {
  urlList: string[];
  callbackToClose: Function;
  index:number
}

const ImageFullScreen = ({
  urlList,
  callbackToClose,
  index
}: ImageFullScreenProps) => {

  return (
   <div className="grid wide">
     <div className="row">
       <div className="col l-12 m-12 c-12">
       <div className={styles.container}>
     
      <div className={styles.wrapper}>
      <Carousel slideIndex={index}>
        {urlList.map((item) => (
          <div className={styles.imageContainer} key={Math.random()}>
            <img src={item} />
          </div>
        ))}
      </Carousel>
      <FontAwesomeIcon
        icon={faXmark}
        className={styles.closeIcon}
        onClick={() => {
         
          callbackToClose()
        }}
      />
      </div>
     </div>
       </div>
     </div>
   </div>
  );
};

export default ImageFullScreen;

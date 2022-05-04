import Carousel from "nuka-carousel";
import React from "react";
import styles from "../assets/css/components/webEvent.module.css";


const WebEvent = () => {
  return (
    <div className={styles.container}>
     
     <Carousel
                speed={800}
                slidesToShow={1}
                autoplay={true}
                autoplayInterval={3000}
                wrapAround={true}
                swiping={true}
               
            
                defaultControlsConfig={{
                  pagingDotsStyle: { display: "none" },
                  // prevButtonStyle:{marginRight:},
                  // nextButtonStyle:{display:"none"}
                }}
              >
       <img src="https://images.pexels.com/photos/8264413/pexels-photo-8264413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
               <img src="https://images.pexels.com/photos/3788293/pexels-photo-3788293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
              </Carousel>
    </div>
  );
};

export default WebEvent;

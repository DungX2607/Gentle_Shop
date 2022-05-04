import React from "react";
import Navbar from "../components/Navbar";
import styles from "../assets/css/pages/paymentSuccess.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const Success = () => {
  return (
    <div>
      <Navbar />
      <div className="distance">
        <div className="grid wide">
          <div className="row">
            <div className="col l-12 m-12 c-12">
             <div>
             <div className={styles.backContainer}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                  <h2>Quay về trang chủ</h2>
                </div>
             <div className={styles.paymentSuccessContainer}>
                <h1>Đặt hàng thành công</h1>
                <p>
                  Cảm ơn quý khách đã mua hàng,nhân viên cửa hàng sẽ liên lạc
                  với quý khách để xác nhận đơn hàng!!!
                </p>
                
              </div>
              
             </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;

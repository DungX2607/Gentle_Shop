import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "../assets/css/components/footer.module.css";
import {faFacebookF,faYoutube,faInstagram,faTiktok} from "@fortawesome/free-brands-svg-icons"
import { ChevronRightIcon, EmailIcon } from "@chakra-ui/icons";
import clsx from "clsx";
import { useRouter } from "next/router";
const Footer = () => {
  const router = useRouter()
  return (
    <div className={styles.footerBg}>
      <div className="grid wide">
        <div className="row">
          <div className="col l-12 m-12 c-12">
            <div className={styles.footerContainer}>
              <div className="row">
                <div className="col l-6 m-6 c-12">
                  <div className={styles.left}>
                    <div className="row">
                      <div className="col l-4 m-4 c-4">
                        <img className={styles.imageIntro} src="https://bizweb.dktcdn.net/100/335/381/themes/762562/assets/logo.png?1650344273245" />
                      </div>
                      <div className="col l-8 m-8 c-8">
                        <div className={styles.textIntro}>
                        Cửa hàng nước hoa BLANC (tiền thân là Chietnuochoa.com) thành lập vào 2017.

Hiện tại có mặt ở tỉnh Trà Vinh

Shop bán các sản phẩm về nước hoa, hỗ trợ ship trên toàn quốc đối với tất cả các khách hàng từ Bắc vào Nam!


                        </div>
                      </div>
                    </div>
                    <div className={styles.shopInfo}>
                      <p>Địa chỉ: <span>60/3, Long Thới, Lái thiêu, thuận an, bình dương</span></p>
                      <p>Số điện thoại: <span>0774917635</span></p>
                      <p>Email: <span className={styles.gmail}>loc.d19.c01a1503@gmail.com</span></p>
                    </div>
                    <div className={styles.socialIconContainer}>
                   
                      <FontAwesomeIcon icon={faFacebookF} className={clsx(styles.socialIcon,styles.facebookIcon)} />
                      <FontAwesomeIcon icon={faInstagram} className={styles.socialIcon} />
                      <FontAwesomeIcon icon={faTiktok} className={styles.socialIcon} />
                      <FontAwesomeIcon icon={faYoutube} className={styles.socialIcon} />
                 
                     
                    </div>
                  </div>
                </div>
                <div className="col l-3 m-3 c-12">
                  <div className={styles.center}>
                    <h2 className={styles.heading}>Chính sách và điều khoản</h2>
                    <div className={styles.policyBody}>
                    <div className={styles.policyItem} onClick={() => router.push("/policy/privacy")}>
                      <ChevronRightIcon className={styles.policyIcon} />
                      Chính sách bảo mật
                    </div>
                    <div className={styles.policyItem}>
                      <ChevronRightIcon className={styles.policyIcon}/>
                      Chính sách vận chuyển
                    </div>
                    <div className={styles.policyItem}>
                      <ChevronRightIcon className={styles.policyIcon}/>
                      Chính sách bảo hành
                    </div>
                    <div className={styles.policyItem}>
                      <ChevronRightIcon className={styles.policyIcon}/>
                      Quy định sử dụng
                    </div>
                    <div className={styles.policyItem}>
                      <ChevronRightIcon className={styles.policyIcon}/>
                      Điều khoản dịch vụ
                    </div>
                    </div>
                  
                  </div>
                </div>
              
                <div className="col l-3 m-3 c-12">
                  <div className={styles.right}>
                    <h2 className={styles.heading}>Fanpage</h2>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

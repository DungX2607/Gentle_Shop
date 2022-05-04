import React from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import styles from "../../assets/css/pages/policy.module.css"
import { useRouter } from 'next/router'
import { ChevronRightIcon } from '@chakra-ui/icons'
import clsx from 'clsx'
const PrivacyPolicy = () => {
    const router = useRouter()
  return (
   <div>
       <Navbar/>
       <div className="distance">
        <div className={styles.bgProductRedirect}>

        <div className="grid wide">
          <div className="row">
            <div className="col l-12 c-12 m-12">
              <div className={styles.productNameAndBrand}>
               
                <div className={styles.redirectContainer}>
                  <p className={clsx(styles.redirectName,styles.home)}  onClick={() =>
                      router.push("/")
                    }>
                    Trang chủ
                  </p>
                  <ChevronRightIcon className={styles.redirectIcon} />
                  <p className={styles.redirectName}>
                    chính sách bảo mật
                  </p>
                  
                </div>
              </div>
              <div className={styles.body}>
                  
              </div>
            </div>
          </div>
          
          </div>
         
        </div>
       </div>
       <Footer/>
   </div>
  )
}

export default PrivacyPolicy
import {
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import styles from "../assets/css/components/login.module.css";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import clsx from "clsx";
import { SignInWithFirebaseGoogle } from "../utils/lib/FirebaseAPI";
import { IFirebaseResponse } from "../utils/type/customType";
import { AuthInput, useCreateAdminMutation, useLoginWithSocialsMutation } from "../generated/graphql";
import JwtManager from "../utils/other/JwtManager";

import { useDispatch } from "react-redux";
import { setIsAuthenticated, setUserAvatar } from "../store/reducers/authSlice";
import { useRouter } from "next/router";

export const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter()
  const dispatch = useDispatch()
  //Login
  const [userLogin] = useLoginWithSocialsMutation();
  const [adminLogin] = useCreateAdminMutation();

  const handleFacebookLogin = async () => {};
  const handleGooleLogin = async () => {
    const result: IFirebaseResponse = await SignInWithFirebaseGoogle();
    if (result.userId && result.userAvatar && result.userName) {
      const authInput: AuthInput = {
        userId: result.userId,
        userName: result.userName,
        userAvartar: result.userAvatar,
        type: "google",
      };
      const graphqlResponse = await userLogin({
        variables: {
          authInput,
        },
      });
      if (graphqlResponse.data?.loginWithsocial.success) {
        JwtManager.setToken(graphqlResponse.data.loginWithsocial.token!);
        dispatch(setIsAuthenticated(true));
        router.reload()
        //Close login modal
        onClose();
      }
    }
    if(result.error){
      
    }
  };
  const handleAdminLogin = async () =>{
    const result: IFirebaseResponse = await SignInWithFirebaseGoogle();
    if(result.userId){
      const graphqlResponse = await adminLogin({
        variables:{
          adminId:result.userId
        }
      })
      if(( graphqlResponse).data?.createAdmin.success){
        JwtManager.setToken(graphqlResponse.data.createAdmin.token!);
        dispatch(setIsAuthenticated(true));
        //Close login modal
        onClose();
      }
    }
  }
  return (
    <div>
      <div className={styles.loginEvent}>
      <h2 onClick={onOpen}>Đăng nhập</h2>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} size="xs">
        <ModalOverlay />
        <ModalContent>
          <div className={styles.loginContainer}>
            <h1>Đăng nhập</h1>
            {/* <p className={styles.textIntro}>
              Đăng nhập để có thể theo dõi đơn hàng và tham gia các sự kiện của
              cửa hàng bạn nha!
            </p> */}
            <div className={styles.body}>
            <div
              className={clsx(
                styles.loginButtonContainer,
                styles.loginWithFacebook
              )}
              onClick={handleFacebookLogin}
            >
              <FontAwesomeIcon icon={faFacebook} className={styles.iconLogin} />
              Đăng nhập với Facebook
            </div>
            <div
              className={clsx(
                styles.loginButtonContainer,
                styles.loginWithGoogle
              )}
              onClick={handleGooleLogin}
            >
              <FontAwesomeIcon icon={faGoogle} className={styles.iconLogin} />
              Đăng nhập với Google
            </div>

            
            <p className={styles.textRule}>
              Bằng cách đăng nhập, bạn đã đồng ý với các{" "}
              <span className={styles.linkRule}>Điều khoản dịch vụ</span> của
              chúng tôi.
            </p>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};

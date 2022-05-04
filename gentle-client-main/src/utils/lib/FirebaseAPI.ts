
import {
    FacebookAuthProvider,
    getAuth,
    getRedirectResult,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
  } from "firebase/auth";
import { app } from "../../config/firebase";
import { IFirebaseResponse } from "../type/customType";
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// ______________________Sign In With Google_______________________________________________________________
export const SignInWithFirebaseGoogle =
  async (): Promise<IFirebaseResponse> => {
      
    return await signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        
        const response: IFirebaseResponse = {
          userId: user.uid,
          userName: user.displayName ? user.displayName : "",
          userAvatar: user.photoURL ? user.photoURL : "",
        };
        return response;
      })
      .catch((error) => {
        const errorMessage = error.message;
        return {
          error: errorMessage,
        };
      });

     
  };
  
// ______________________Sign In With Facebook_______________________________________________________________
export const SignInWithFirebaseFacebook =
  async (): Promise<IFirebaseResponse> => {
    return await signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        console.log(user)
        const response: IFirebaseResponse = {
          userId: user.uid,
          userName: user.displayName ? user.displayName : "",
          userAvatar: user.photoURL ? user.photoURL : "",
        };
        return response;
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;

        return {
          error: errorMessage,
        };
      });
  };



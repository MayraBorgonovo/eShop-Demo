import { db, auth, provider } from "../../firebase/config";
import { updateProfile, updateEmail } from "@firebase/auth";
import { authActions } from "./auth-slice";
import { uiActions } from "../ui/ui-slice";
import { doc, setDoc, getDoc, Timestamp } from "@firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
} from "@firebase/auth";

export const getCurrentUser = (uid) => {
  return async (dispatch) => {
    dispatch(uiActions.setError(null));
    dispatch(uiActions.setIsLoading(true));

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      const user = docSnap.data();

      let isAdmin;
      if (user.userRoles.includes("admin")) {
        isAdmin = true;
      } else {
        isAdmin = false;
      }

      dispatch(
        authActions.setUser({
          id: uid,
          first: user.first,
          last: user.last,
          email: user.email,
          isAdmin,
        })
      );
    } catch (e) {
      dispatch(
        uiActions.setError(
          "Something went wrong! Please contact the administrator."
        )
      );
    }
    dispatch(uiActions.setIsLoading(false));
  };
};

const handleUserProfile = async (userData) => {
  const docRef = doc(db, "users", userData.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    try {
      await setDoc(doc(db, "users", userData.uid), {
        first: userData.first,
        last: userData.last,
        emailVerified: userData.emailVerified,
        email: userData.email,
        userRoles: ["user"],
        dateCreated: Timestamp.fromDate(new Date()),
      });
    } catch (e) {
      console.log("We coudn't reach the database.");
    }
  }
};

export const loginWithGoogle = () => {
  return async (dispatch) => {
    dispatch(uiActions.setError(null));

    try {
      const result = await signInWithPopup(auth, provider);
      const { uid, displayName, email, emailVerified } = result.user;
      const [first, last] = displayName.split(" ", 2);
      const userData = { uid, first, last, email, emailVerified };

      await handleUserProfile(userData);
    } catch (e) {
      console.log(e);
      dispatch(uiActions.setError("Something went wrong! Please try again."));
    }
  };
};

export const signupWithEmail = (
  name,
  surname,
  enteredEmail,
  enteredPassword
) => {
  return async (dispatch) => {
    dispatch(uiActions.setError(null));
    dispatch(uiActions.setIsLoading(true));

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword
      );
      const { uid, email, emailVerified } = response.user;
      const userData = {
        uid,
        first: name,
        last: surname,
        email,
        emailVerified,
      };

      await handleUserProfile(userData);
    } catch (error) {
      const errorcode = error.code;
      let errorMessage;
      switch (errorcode) {
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email.";
          break;
        case "auth/weak-password":
          errorMessage = "The password should be at least 6 characters.";
          break;
        default:
          errorMessage = "Request failed. Please try again.";
      }
      dispatch(uiActions.setError(errorMessage));
    }
    dispatch(uiActions.setIsLoading(false));
  };
};

export const loginWithEmail = (email, password) => {
  return async (dispatch) => {
    dispatch(uiActions.setError(null));
    dispatch(uiActions.setIsLoading(true));

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const errorcode = error.code;
      let errorMessage;
      switch (errorcode) {
        case "auth/wrong-password":
          errorMessage = "Email/Password combination not found.";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email.";
          break;
        case "auth/user-not-found":
          errorMessage = "Email/Password combination not found.";
          break;
        case "auth/too-many-requests":
          errorMessage = "You've tried too many times. Please try again later.";
          break;
        default:
          errorMessage = "Request failed. Please try again.";
      }
      dispatch(uiActions.setError(errorMessage));
    }
    dispatch(uiActions.setIsLoading(false));
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await signOut(auth);
      dispatch(authActions.logout());
    } catch (e) {
      console.log("Something went wrong while logging out.");
    }
  };
};

export const resetPassword = (email) => {
  return async (dispatch) => {
    dispatch(uiActions.setError(null));
    dispatch(uiActions.setIsLoading(true));

    try {
      await sendPasswordResetEmail(auth, email);
      dispatch(authActions.setSuccess(true));
    } catch (error) {
      const errorcode = error.code;

      let errorMessage;
      switch (errorcode) {
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email.";
          break;
        case "auth/user-not-found":
          errorMessage = "Email not found. Please create an account.";
          break;
        default:
          errorMessage = "Something went wrong. Please try again.";
      }
      dispatch(uiActions.setError(errorMessage));
    }
    dispatch(uiActions.setIsLoading(false));
  };
};

export const updateUserDetails = (data) => {
  return async (dispatch) => {
    const userData = JSON.parse(data);
    dispatch(uiActions.setError(null));
    dispatch(uiActions.setIsLoading(true));

    const updateDatabase = async () => {
      await setDoc(doc(db, "users", userData.id), {
        first: userData.first,
        last: userData.last,
        email: userData.email,
      }, { merge: true });
    };
    try {
      await updateDatabase();
      await updateProfile(auth.currentUser, {displayName: userData.first + ' ' + userData.last});
      await updateEmail(auth.currentUser, userData.email);

      dispatch(authActions.setSuccess(true));

      setTimeout(() => {
        dispatch(authActions.setSuccess(false));
      }, 2000);
    } catch (error) {
      let errorMessage;
      switch (error.code) {
        case "auth/requires recent login":
          errorMessage = "Sorry! You will need to login again to update your profile.";
          break;
        default:
          errorMessage = "Something went wrong. Please try again.";
      }
      dispatch(uiActions.setError(errorMessage));
    }
    dispatch(uiActions.setIsLoading(false));
  }
}
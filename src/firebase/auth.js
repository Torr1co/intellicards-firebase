import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./index";
import { getUserData } from "./firestore";
import { useRouter } from "next/router";
import Layout from "../hocs/Layout";
import DisconnectedPage from "../components/index/DisconnectedPage";
import CompleteLogin from "../components/index/CompleteLogin";
import toast from "react-hot-toast";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refreshUserData(uid) {
    setCurrentUserData(await getUserData(uid));
  }
  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      setLoading(true);
      if (!user) {
        setCurrentUser(null);
        setCurrentUserData(null);
        setLoading(false);
        return;
      }
      const token = await user.getIdToken();
      setCurrentUser(user);
      setCurrentUserData(await getUserData(user.uid));
      setLoading(false);
    });
  }, []);

  /* function PageToRender() {
    if (!currentUserData) {
      return (
        <Layout home>
          {!currentUser || loading ? (
            <DisconnectedPage loading={loading} />
          ) : (
            <CompleteLogin />
          )}
        </Layout>
      );
    } else return children;
  } */

  function PageToRender() {
    if (!currentUserData && currentUser && !loading)
      return (
        <Layout>
          <CompleteLogin />
        </Layout>
      );
    return children;
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, currentUserData, refreshUserData }}
    >
      <PageToRender />
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);

export const loginWithGoogle = () => {
  signInWithPopup(auth, new GoogleAuthProvider()).catch((error) =>
    console.log(error)
  );
};

export const createUserForAuth = (data) => {
  createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((result) => {
      updateProfile(result.user, {
        displayName: `${data.first_name} ${data.last_name}`,
      }).catch((err) => console.log(err));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const loginWithEmail = async (email, password) => {
  let error;
  error = await signInWithEmailAndPassword(auth, email, password).catch(
    (err) => {
      return err;
    }
  );
  return error;
};
export const logout = () => signOut(auth);

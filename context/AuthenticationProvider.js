import {createContext, useCallback, useEffect, useMemo} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {auth} from "../firebase";

export const Authentication = createContext({
  currentUser: null,
  login: () => {},
  logout: () => {},
});

const AuthenticationProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useLocalStorage("firebase.authentication", null);

  const login = useCallback(async () => {
    const provider = new auth.GoogleAuthProvider();
    try {
      await auth().signInWithPopup(provider);
    } catch (e) {
      setCurrentUser(null);
    }
  }, [setCurrentUser]);

  const logout = useCallback(() => {
    auth().signOut().then(() => {
      setCurrentUser(null);
    });
  }, [setCurrentUser]);

  useEffect(() => {
    return auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, [setCurrentUser]);

  const context = useMemo(() => ({
    login,
    logout,
    currentUser,
  }), [login, logout, currentUser]);

  return (
    <Authentication.Provider value={context}>
      {children}
    </Authentication.Provider>
  );
};

export default AuthenticationProvider;
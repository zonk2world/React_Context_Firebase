import { db } from '../firebase';
import {useEffect} from "react";
import {useAuthentication} from "./useAuthentication";
import {useLocalStorage} from "./useLocalStorage";

// TODO: need to introduce context to hold entries
const useVendorIndex = () => {
  const [vendors, setVendors] = useLocalStorage('firestore.index.vendors',[]);
  const { currentUser } = useAuthentication();

  useEffect(() => {
    return db.collection("index-vendors").onSnapshot((snapshot) => {
      setVendors(snapshot.docs.reduce((accu, doc) => {
        const data = doc.data();
        return accu.concat(Object.keys(data).map((key) => data[key]));
      }, []));
    });
  }, [currentUser]);

  return {
    vendors,
  };
}

export { useVendorIndex };
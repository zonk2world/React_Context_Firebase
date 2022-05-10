import { db } from '../firebase';
import {useCallback, useState} from "react";
import {useAuthentication} from "./useAuthentication";
import {useLocalStorage} from "./useLocalStorage";

const useTaxonomy = ({id}) => {
  const [taxonomy, setTaxonomy] = useLocalStorage(`firestore.taxonomies.${id}`,{tags:[]});
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuthentication();

  const refresh = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (currentUser) {
        setLoading(true);
        db.collection("taxonomies").doc(id)
          .get().then((doc) => {
            if (doc.exists) {
              setTaxonomy(doc.data());
            }
            setLoaded(true);
            resolve();
        }).catch(reject);
      }
    });
  }, [currentUser, setTaxonomy]);

  const save = useCallback((data) => {
    return db.collection("taxonomies").doc(id).set(data);
  });

  return {
    loading,
    loaded,
    refresh,
    save,
    taxonomy,
  };
}

export { useTaxonomy };
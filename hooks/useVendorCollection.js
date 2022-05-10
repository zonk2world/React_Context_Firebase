import { db } from '../firebase';
import {useCallback, useEffect, useMemo, useState} from "react";
import {useAuthentication} from "./useAuthentication";
import {useLocalStorage} from "./useLocalStorage";

const useVendorCollection = (props = {}) => {
  const [vendors, setVendors] = useLocalStorage("firestore.vendors", []);
  const first = useMemo(() => vendors[0], [vendors]);
  const last = useMemo(() => vendors[vendors.length - 1], [vendors]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuthentication();
  const [total, setTotal] = useState(0);
  const page = useMemo(() => props.page || 1, [props]);
  const pageSize = useMemo(() => props.pageSize || 10, [props]);
  const totalPages = useMemo(() => Math.ceil(total / pageSize), [total, pageSize]);

  useEffect(() => {
    return db.collection("counters").doc("vendors").onSnapshot(doc => {
      setTotal(doc.data().counter);
    });
  }, []);

  const collection = useMemo(() => {
    return db.collection("vendors").limit(pageSize);
  }, [pageSize]);

  const query = useCallback((q) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      if (currentUser) {
        setLoading(true);
        q.get().then((result) => {
          if (result.docs.length) {
            setVendors(result.docs.map(d => ({
              id: d.id,
              data: d.data(),
              doc: d
            })));
          }
          setLoading(false);
          resolve();
        }).catch(() => {
          setLoading(false);
          reject();
        });
      } else {
        setLoading(false);
        reject();
      }
    });
  }, [currentUser, setVendors]);

  const init = useCallback(() => {
    return query(collection);
  }, [query, collection])

  const next = useCallback(() => {
    if (last) {
      return query(collection.startAfter(last.doc));
    }
  }, [query, collection, last]);

  const prev = useCallback(() => {
    if (first) {
      return query(collection.endBefore(first.doc));
    }
  }, [query, collection, first]);

  return {
    loading,
    next,
    init,
    prev,
    page,
    total,
    totalPages,
    vendors
  };
}

export { useVendorCollection };
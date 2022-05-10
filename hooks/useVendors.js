import { db } from '../firebase';
import {useCallback} from "react";
import {useAuthentication} from "./useAuthentication";

const useVendors = () => {
  const { currentUser } = useAuthentication();

  const create = useCallback((id, vendor) => {
    return new Promise(async(resolve, reject) => {
      const ref = await db.collection("vendors").doc(id).get();
      if (ref.exists) {
        reject({ error: `error.already.exists` });
      } else {
        const record = {
          ...vendor,
          createdAt: new Date(),
          updatedAt: new Date(),
          acl: {
            [currentUser.uid]: "owner"
          },
          users: [currentUser.uid]
        };
        return db.doc(`vendors/${id}`).set(record).then(() => {
          resolve({ id, data: vendor });
        }).catch(e => {
          reject({ error: 'error.firestore' });
        });
      }
    });
  }, [currentUser])

  return {
    create,
  };
}

export { useVendors };
import { db } from '../firebase';
import {useCallback} from "react";
import {useAuthentication} from "./useAuthentication";

const useProducts = () => {
  const { currentUser } = useAuthentication();

  const create = useCallback((product) => {
    return new Promise(async(resolve, reject) => {
      const record = {
        ...product,
        createdAt: new Date(),
        updatedAt: new Date(),
        acl: {
          [currentUser.uid]: "owner"
        },
        users: [currentUser.uid]
      };
      return db.collection(`products`).add(record).then((ref) => {
        resolve({ id: ref.id, data: product });
      }).catch(e => {
        reject({ error: 'error.firestore' });
      });
    });
  }, [currentUser])

  return {
    create,
  };
}

export { useProducts };
import { doc, collection, getDocs, orderBy, query, setDoc, where } from "firebase/firestore/lite";
import { Auth, Db } from "./firebase";

export enum AUTHORITY {
    ADMINISTRATOR = 'ADMINISTRATOR',
    MODERATOR = 'MODERATOR',
}

export interface User {
    email: string;
    uid: string;
    createdAt: Date;
    createdBy: string;
    authority: AUTHORITY;
    displayName: string;
}

export const UserService = {
    getAllUsers: async function (): Promise<User[]> {
        const q = query(collection(Db, "user"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const users = snapshot.docs.map(doc => ({
            email: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
        })) as any;
        return users;
    },
    createUser: async (email: string) => {
        const userRef = doc(Db, "user", email);
        const data = {
            createdAt: new Date(),
            createdBy: Auth.currentUser?.email
        } as User;
        await setDoc(userRef, data);
    },
    getUserByUid: async (uid: string): Promise<User | null> => {
        const users = await getDocs(query(collection(Db, "user"), where("uid", "==", uid)));
        if (users.docs.length == 0) return null;
        return {
            email: users.docs[0].id,
            ...users.docs[0].data(),
            createdAt: users.docs[0].data().createdAt.toDate(),
        } as any;
    }
}

export default UserService;
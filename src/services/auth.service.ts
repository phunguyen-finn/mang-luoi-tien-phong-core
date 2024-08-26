import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail, User, setPersistence, browserLocalPersistence } from "firebase/auth";
import { Auth } from "@/services/firebase";

export const AuthService = {
    login: async function (email: string, password: string) {
        signOut(Auth);
        await setPersistence(Auth, browserLocalPersistence)
        return signInWithEmailAndPassword(Auth, email, password);
    },
    logout: async function () {
        return signOut(Auth);
    },
    passwordReset: function (email: string) {
        return sendPasswordResetEmail(Auth, email);
    },
    onAuthStateChanged: function (callback: (user: User | null) => void) {
        return Auth.onAuthStateChanged((user) => {
            callback(user);
        });
    },
}

export default AuthService;
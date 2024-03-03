import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "./config";

export const signUp = async(email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

export const signIn = async(email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}

export const googleSignIn = async() => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)

    return result
}

export const signOut = async() => {
    return auth.signOut()
}
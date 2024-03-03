import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../../firebase/config";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser)
        return unsubscribe
    }, [])

    const initializeUser = (user) => {
        if(user) {
            setUser({ ...user })
            setIsLoggedIn(true)
        } else {
            setUser(null)
            setIsLoggedIn(false)
        }
        setLoading(false)
    }
    
    return (
        <AuthContext.Provider value={useMemo(() => ({ user, isLoggedIn, loading }), [ user, isLoggedIn, loading ])}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthProvider
import React from 'react'
import { signOut } from '../firebase/auth'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const Header = () => {
    const { isLoggedIn } = useAuth()

    return (
        <>
            {!isLoggedIn && <Navigate to="/login" replace={true} />}
            <header className='font--right'>
                <button onClick={signOut} className='font--underline fs--18 font--family font--bold color--white'>
                    Sign Out
                </button>
            </header>
        </>
    )
}

export default Header
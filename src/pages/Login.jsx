import React, { useContext, useEffect, useState } from 'react'
import Login from '../component/Sign/Login'
import { useAuth } from '../context/AuthContext'
import { Navigate } from "react-router-dom";
import { googleSignIn, signIn, signUp } from '../firebase/auth';
import { emailRegex, passwordRegex } from '../helper/regexConts';
import { MyAppContext } from '../context/MyAppContext';

const LoginPage = () => {

    const { isLoggedIn } = useAuth()
    const { toggleGlobalLoader } = useContext(MyAppContext)

    const [formState, setFormState] = useState({
        loginMail: '',
        loginPassword: '',
        loginConfirmPassword: ''
    })
    const [errors, setErrors] = useState({
        loginMail: '',
        loginPassword: '',
        loginConfirmPassword: '',
        form: ""
    })
    const [isSignup, setIsSignup] = useState(true)
    const [logIn, setLogIn] = useState(false)

    useEffect(() => {
        setFormState({
            loginMail: '',
            loginPassword: '',
            loginConfirmPassword: ''
        })
        setErrors({
            loginMail: '',
            loginPassword: '',
            loginConfirmPassword: ''
        })
    }, [isSignup])

    const validate = () => {
        let input = formState;
        let err = {};
        let isValid = true;

        if (!input["loginMail"].trim()) {
            isValid = false;
            err["loginMail"] = "Please enter your email";
        }
        if (!emailRegex.test(input["loginMail"])) {
            isValid = false;
            err.loginMail = "Please enter correct email";
        }

        if (!input["loginPassword"].trim()) {
            isValid = false;
            err["loginPassword"] = "Please enter password";
        }
        if (!passwordRegex.test(input["loginPassword"])) {
            isValid = false;
            err.loginPassword = "Password: 8+ characters, include 1 letter & 1 number.";
        }

        if ((input["loginPassword"] !== input["loginConfirmPassword"]) && isSignup ) {
            isValid = false;
            err["loginConfirmPassword"] = "Your password does not match.";
        }

        setErrors(err);
        return isValid;

    }

    const onChange = (e) => {
        const { id, value } = e.target
        setFormState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        console.log(validate(), logIn)
        if (validate() && !logIn) {
            setLogIn(true)

            toggleGlobalLoader(true)
            if(isSignup) {
                await signUp(formState.loginMail, formState.loginPassword).catch(err => {
                    setLogIn(false)
                    setErrors(prevState => ({
                    ...prevState,
                    form: "Invalid credentials"
                })) })
            } else {
                await signIn(formState.loginMail, formState.loginPassword).catch(err => {
                    setLogIn(false)
                    setErrors(prevState => ({
                    ...prevState,
                    form: "Invalid credentials"
                }))})
            }
            toggleGlobalLoader(false)
        }
    }

    const onGoogle = (e) => {
        if (!logIn) {
            setLogIn(true)
            googleSignIn().catch(() => {
                setLogIn(false)
            })
        }
    }

    return (
        <>
            {isLoggedIn && <Navigate to="/home" replace={true} />}
            <Login formState={formState} errors={errors} onChange={onChange} onSubmit={onSubmit} onGoogle={onGoogle} isSignup={isSignup} setIsSignup={setIsSignup} />
        </>
    )
}

export default LoginPage
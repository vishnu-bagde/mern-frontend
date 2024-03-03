import React from 'react'
import './Login.scss'
import Icon from '../Icon'

const Login = ({ errors, formState, onChange, onSubmit, onGoogle, isSignup, setIsSignup }) => {
    return (
        <form autoComplete='off' className='container--fluid login--form height--one flex flex--justify-content-center flex--align-items-center'>
            <div className='bg--secondary pd--30 bg--radius-10 width--column-one login--container'>
                <h1 className="fs--45 font--family font--bold color--white mb--35 font--center">
                    Welcome
                </h1>

                <div className="pb--25 position--relative flex flex--direction-column flex--justify-content-end">
                    <label className='fs--16 font--family font--semibold block color--white mb--10' htmlFor="loginMail">Email</label>
                    <input value={formState.loginMail} onChange={(e) => onChange(e)} type="email" className='width--column-one' id="loginMail" />
                    {
                        errors?.loginMail &&
                        <span className="login--form-error position--absolute width--column-one fs--14 font--family color--error">{errors?.loginMail}</span>
                    }
                </div>

                <div className='pb--25 position--relative flex flex--direction-column flex--justify-content-end'>
                    <label className='fs--16 font--family font--semibold block color--white mb--10' htmlFor="loginPassword">Password</label>
                    <input value={formState.loginPassword} onChange={(e) => onChange(e)} type="password" className='width--column-one' id="loginPassword" />
                    {
                        errors?.loginPassword &&
                        <span className="login--form-error position--absolute width--column-one fs--14 font--family color--error">{errors?.loginPassword}</span>
                    }
                </div>

                {
                    isSignup ?
                        <div className="pb--30 position--relative flex flex--direction-column flex--justify-content-end">
                            <label className='fs--16 font--family font--semibold block color--white mb--10' htmlFor="loginConfirmPassword">Confirm Password</label>
                            <input value={formState.loginConfirmPassword} onChange={(e) => onChange(e)} type="password" className='width--column-one' id="loginConfirmPassword" />
                            {
                                errors?.loginConfirmPassword &&
                                <span className="login--form-error position--absolute width--column-one fs--14 font--family color--error">{errors?.loginConfirmPassword}</span>
                            }
                        </div>
                        : ''
                }

                <div className="position--relative pb--30">
                    <button type='submit' className="btn bg--third width--column-one" onClick={onSubmit}>Sign {!isSignup ? "In" : "Up"}</button>
                    {
                        errors?.form &&
                        <span className="login--form-error position--absolute width--column-one fs--14 font--family color--error">{errors?.form}</span>
                    }
                </div>

                <span className="block fs--14 font--family color--white font--normal font--center">
                    {isSignup ? "Already" : "Don't"} have an account? <button className='font--bold' type='button' onClick={() => setIsSignup(prevState => !prevState)}> Sign {isSignup ? "In" : "Up"}</button>
                </span>

                <span className="login--or flex flex--align-items-center fs--18 font--family color--white font--bold font--center mt--15 mb--15">OR</span>

                <div className="font--center">
                    <button className="btn bg--white" type='button' onClick={(e) => onGoogle(e)}>
                        <Icon icoName="google" paths={5} size="20" className="mr--20" />
                        <span className="color--black font--normal font--family">Continue with Google</span>
                    </button>
                </div>

            </div>
        </form>
    )
}

export default Login
import React, { useContext, useEffect, useRef } from 'react'
import { MyAppContext } from '../../context/MyAppContext';
import './Loader.scss'

const Loader = () => {
    const { loading } = useContext(MyAppContext);
    const bodyRef = useRef(noSsrWindow());

    useEffect(() => {
        const updatePageScroll = () => {
            if (typeof window !== 'undefined') {
                if (loading) {
                    bodyRef.current.style.overflow = "hidden";
                } else {
                    bodyRef.current.style.overflow = "";
                }
            }
        };
        updatePageScroll();
    }, [loading]);

    return (
        loading ?
            <>
                <div className='loader--overlay position--fixed width--column-one height--one'></div>
                <div className="loader position--fixed"></div>
            </>
            : ''
    )
}

export default Loader

const noSsrWindow = () => {
    if (typeof window !== "undefined") {
        return document.querySelector("body")
    } else {
        return null
    }
}
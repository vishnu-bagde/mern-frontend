'use client'

import React, { useEffect, useMemo, useState } from "react";

export const MyAppContext = React.createContext();
const MyAppProvider = props => {
    const [loading, setLoading] = useState(false)
    const [appState, setAppState] = useState({
        loaded: false,
        checkDevice: {
            isMobile: false,
            isIpad: false,
        },
    });

    const updateAppState = (key, value) => {
        setAppState((prev) => ({
            ...prev,
            [key]: value
        }))
    }
    const toggleGlobalLoader = (val, full) => {
        setLoading(val)
    }
    
    useEffect(() => {
        if (typeof window !== "undefined") {
            document.addEventListener('touchmove', function (event) {
                if (event.touches.length > 1) {
                    event.preventDefault();
                }
            }, { passive: false });
        }

        updateAppState("loaded", true)
        function handleResize() {
            if (window.innerWidth <= 640) {
                updateAppState("checkDevice", {
                    isMobile: true,
                    isIpad: false,
                })
            } else if (window.innerWidth >= 641 && window.innerWidth <= 1024) {
                updateAppState("checkDevice", {
                    isMobile: false,
                    isIpad: true,
                })
            } else {
                updateAppState("checkDevice", {
                    isMobile: false,
                    isIpad: false,
                })
            }
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    return (
        <MyAppContext.Provider value={useMemo(() =>
            ({ appState, setAppState, loading, toggleGlobalLoader }),
            [appState, setAppState, loading, toggleGlobalLoader])}>
            {props.children}
        </MyAppContext.Provider>
    )
};
export default MyAppProvider;

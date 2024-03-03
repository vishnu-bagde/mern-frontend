export function isEmpty(val) {
    return val === undefined || val == null || val == "NaN" || val == "undefined" || val.length === 0 || Object.keys(val).length === 0 || val == '' ? true : false;
}

export const noSsrWindow = () => {
    if (typeof window !== "undefined") {
        return document.querySelector("body")
    } else {
        return null
    }
}
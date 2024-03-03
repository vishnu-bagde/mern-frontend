export const apiFetch = (url, method, data) => {
    const makeUrl = `${process.env.REACT_APP_BASE_URL}${url}`
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", 'application/json');

    const options = {
        method,
        headers: myHeaders,
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = fetch(makeUrl, options).then((res) => {
        return res.json()
    }

    ).catch((error) => {
        console.error(`Error ${method}ing data:`, error);
    });
    return response
}

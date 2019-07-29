export const server = 'http://127.0.0.1:8000';

export const GETHeader = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    mode: 'cors',
    xhrFields: {
        withCredentials: true
    },
    credentials: 'include',
};
export const POSTHeader = (body) => {
    return {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(body),
        mode: 'cors',
        xhrFields: {
            withCredentials: true
        },
        credentials: 'include',
        crossDomain: true,
    }
}
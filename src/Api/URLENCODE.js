
    
export function post(endpoint, data) {
    let body = getFormBody(data);
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',


        },
        body: getFormBody(data)
    })
}

function getFormBody(obj) {
    return Object.keys(obj).map(key =>
        encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
    ).join('&');
}
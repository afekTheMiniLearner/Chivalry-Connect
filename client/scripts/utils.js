async function postData(url, data) {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((response) => {
        if (response.ok) return response;
        throw Error(response.statusText);
    });
}

async function getData(url) {
    const jwt = localStorage.getItem('jwt');

    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(jwt && { Authorization: 'Bearer ' + jwt }),
        },
    }).then((response) => {
        if (response.ok) return response;
        throw Error(response.statusText);
    });
}

function removeClass(waitBeforeAction = 2, elementId, className) {
    const element = document.getElementById(elementId);

    setTimeout(() => {
        element.classList.remove(className);
    }, waitBeforeAction * 1000);
}

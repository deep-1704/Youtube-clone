let API_BASEURL = 'http://localhost:5500'

async function userLogin(token){
    let url = API_BASEURL + '/user/login'
    let data = {"token": token}

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).catch((error) => {
        console.error('Error:', error);
    });

    let data1 = await response.json();
    console.log(data1)

    return {"status": response.status }
}

export { userLogin }
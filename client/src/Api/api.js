let API_BASEURL = process.env.REACT_APP_API_URL

async function userLogin(token) {  
    let url = API_BASEURL + '/user/login'
    let data = { "token": token }

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).catch((error) => {
        console.error('Error:', error);
    });

    let responseData = await response.json()

    return {
        "status": response.status,
        "data": (responseData ? responseData : null)
    }
}

async function createChannel(token, channelName, description, userId) {
    let url = API_BASEURL + '/channel';
    let data = {
        "name": channelName,
        "description": description,
        "userId": userId
    }
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    let response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })

    let responseData = await response.json()
    return {
        "status": response.status,
        "data": (responseData ? responseData : null)
    }
}

async function getChannel(token, channelId, userId) {
    let url = API_BASEURL + '/channel/' + channelId + '?userId=' + userId
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    let response = await fetch(url, {
        method: 'GET',
        headers: headers,
    })

    let responseData = await response.json()
    return {
        "status": response.status,
        "data": (responseData ? responseData : null)
    }
}

async function updateChannel(token, channelId, channelName, description, userId) {
    let url = API_BASEURL + '/channel/' + channelId
    let data = {
        "_id": channelId,
        "name": channelName,
        "description": description,
        "userId": userId,
    }
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    let response = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data),
    })

    return {
        "status": response.status
    }
}

async function getAllVideos() {
    let url = API_BASEURL + '/video'
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    let responseData = await response.json()
    return {
        "status": response.status,
        "data": (responseData ? responseData : null)
    }
}

async function getVideosByTag(token, tag, userId) {
    let url = API_BASEURL + '/video/tags/' + tag + '/' + userId;
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    let response = await fetch(url, {
        method: 'GET',
        headers: headers
    })

    let responseData = await response.json()
    return {
        "status": response.status,
        "data": (responseData ? responseData : null)
    }
}

async function getVideosByChannelName(channelName) {
    let url = API_BASEURL + '/video/channel/' + channelName
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    let responseData = await response.json()
    return {
        "status": response.status,
        "data": (responseData ? responseData : null)
    }
}

async function getVideosBySearch(title){
    let url = API_BASEURL + '/video/search/' + title
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    let responseData = await response.json()
    return {
        "status": response.status,
        "data": (responseData ? responseData : null)
    }
}

async function deleteUserHistory(token, userId) {
    let url = API_BASEURL + '/tag/hs/' + userId
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    let response = await fetch(url, {
        method: 'DELETE',
        headers: headers
    })

    return {
        "status": response.status,
    }
}

async function uploadVideo(token, formData) {
    let url = API_BASEURL + '/video'
    let headers = {
        'Authorization': 'Bearer ' + token
    }

    let response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: formData
    })
    return {
        "status": response.status
    }
}

async function getVideoInfoById(videoId) {
    let url = API_BASEURL + '/video/info/' + videoId
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    let responseData = await response.json()
    return {
        "status": response.status,
        "data": (responseData ? responseData : null)
    }
}

async function getCommentsByVideoId(videoId){
    let url = API_BASEURL + '/comment/' + videoId
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    let responseData = await response.json()
    return {
        "status": response.status,
        "data": (responseData ? responseData : null)
    }
}

async function postComment(token, userId, videoId, comment){
    let url = API_BASEURL + '/comment'
    let data = {
        "userId": userId,
        "videoId": videoId,
        "comment": comment
    }
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    let response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })

    return {
        "status": response.status
    }
}

async function postUserTag(token, userId, videoId, tag){
    let url = API_BASEURL + '/tag/'+videoId
    let data = {
        "userId": userId,
        "tag": tag
    }
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    let response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })

    return {
        "status": response.status
    }
}

async function getUserTags(token, userId, videoId){
    let url = API_BASEURL + '/tag/'+userId+'/'+videoId
    let headers ={
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    let response = await fetch(url, {
        method: 'GET',
        headers: headers
    })

    let responseData = await response.json()
    return {
        "status": response.status,
        "data": (responseData ? responseData : null)
    }
}

async function deleteUserTag(token, userId, videoId, tag){
    let url = API_BASEURL + '/tag/'+userId+'/'+videoId+'/'+tag
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    let response = await fetch(url, {
        method: 'DELETE',
        headers: headers
    })

    return {
        "status": response.status
    }
}

async function updateComment(token, commentId, comment){
    let url = API_BASEURL + '/comment/' + commentId
    let data = {
        "comment": comment
    }
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    let response = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
    })

    return{
        "status": response.status
    }
}

async function deleteComment(token, commentId, videoId){
    let url = API_BASEURL + '/comment/' + commentId + '/' + videoId
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    let response = await fetch(url, {
        method: 'DELETE',
        headers: headers
    })

    return {
        "status": response.status
    }
}

export {
    userLogin,
    createChannel,
    getChannel,
    updateChannel,
    getAllVideos, 
    getVideosByTag, 
    getVideosByChannelName, 
    getVideosBySearch,
    deleteUserHistory,
    uploadVideo,
    getVideoInfoById,
    getCommentsByVideoId,
    postComment,
    postUserTag,
    getUserTags,
    deleteUserTag,
    updateComment,
    deleteComment
}
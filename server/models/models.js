class video {
    constructor(
        _id,
        channelId,
        title,
        description,
        likeCount,
        viewCount,
        commentCount,
        dateOfUpload,
    ){
        this._id = _id;
        this.channelId = channelId;
        this.title = title;
        this.description = description;
        this.likeCount = likeCount;
        this.viewCount = viewCount;
        this.commentCount = commentCount;
        this.dateOfUpload = dateOfUpload;
    }
}

class user{
    constructor(
        _id,
        firstName,
        lastName,
        email,
        imgSrc,
    ){
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.imgSrc = imgSrc;
    }
}

class channel{
    constructor(
        _id,
        userId,
        name,
        description,
    ){
        this._id = _id;
        this.userId = userId;
        this.name = name;
        this.description = description;
    }
}

class userTag{
    constructor(
        _id,
        userId,
        videoId,
        tag,
    ){
        this._id = _id;
        this.userId = userId;
        this.videoId = videoId;
        this.tag = tag;
    }
}

class comment{
    constructor(
        _id,
        userId,
        videoId,
        comment,
    ){
        this._id = _id;
        this.userId = userId;
        this.videoId = videoId;
        this.comment = comment;
    }
}

export {video, user, channel, userTag, comment};
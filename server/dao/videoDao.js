import { database } from "./mongoClient.js";
import { video } from "../models/models.js";

let videoCollection = database.collection("videos");
let userTagCollection = database.collection("userTags");

let fetchAllVideos = async () => {
    let allVideos = await videoCollection.find().toArray();

    let videos = allVideos.map((theVideo) => {
        return new video(
            theVideo._id,
            theVideo.channelId,
            theVideo.title,
            theVideo.description,
            theVideo.likeCount,
            theVideo.viewCount,
            theVideo.commentCount,
            theVideo.dateOfUpload
        );
    })
    return videos;
}

let fetchVideosByIds = async (videoIds) => {
    let allVideos = await videoCollection.find({ _id: { $in: videoIds } }).toArray();

    let videos = allVideos.map((theVideo) => {
        return new video(
            theVideo._id,
            theVideo.channelId,
            theVideo.title,
            theVideo.description,
            theVideo.likeCount,
            theVideo.viewCount,
            theVideo.commentCount,
            theVideo.dateOfUpload
        );
    })
    return videos;
}

let fetchVideosByTag = async (userId, tag) => {
    let userTags = await userTagCollection.find({ userId: userId, tag: tag }).toArray();
    let videoIds = userTags.map((userTag) => {
        return userTag.videoId;
    })

    let videos = await fetchVideosByIds(videoIds);
    return videos;
}

let fetchVideosByChannelId = async (channelId) => {
    let allVideos = await videoCollection.find({ channelId: channelId }).toArray();

    let videos = allVideos.map((theVideo) => {
        return new video(
            theVideo._id,
            theVideo.channelId,
            theVideo.title,
            theVideo.description,
            theVideo.likeCount,
            theVideo.viewCount,
            theVideo.commentCount,
            theVideo.dateOfUpload
        );
    })
    return videos;
}

let insertVideo = async (videoObj) => {
    let newVideo = await videoCollection.insertOne(videoObj);
    return newVideo;
}

let increaseLikeCount = async(videoId) => {
    let video = await videoCollection.findOne({ _id: videoId });
    let updatedVideo = await videoCollection.updateOne({ _id: videoId }, { $set: { likeCount: video.likeCount + 1 } });
    return updatedVideo;
}

let increaseViewCount = async(videoId) => {
    let video = await videoCollection.findOne({ _id: videoId });
    let updatedVideo = await videoCollection.updateOne({ _id: videoId }, { $set: { viewCount: video.viewCount + 1 } });
    return updatedVideo;
}

let increaseCommentCount = async(videoId) => {
    let video = await videoCollection.findOne({ _id: videoId });
    let updatedVideo = await videoCollection.updateOne({ _id: videoId }, { $set: { commentCount: video.commentCount + 1 } });
    return updatedVideo;
}

export { fetchAllVideos, fetchVideosByTag, fetchVideosByChannelId, insertVideo, increaseLikeCount, increaseViewCount, increaseCommentCount};
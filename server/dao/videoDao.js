import { ObjectId } from "mongodb";

import { database } from "./mongoClient.js";
import { video } from "../models/models.js";

let videoCollection = database.collection("videos");
let userTagCollection = database.collection("userTags");

let fetchAllVideos = async () => {
    let allVideos = await videoCollection.find().toArray();

    let videos = allVideos.map((theVideo) => {
        return new video(
            theVideo?._id,
            theVideo?.channelName,
            theVideo?.title,
            theVideo?.description,
            theVideo?.likeCount,
            theVideo?.viewCount,
            theVideo?.commentCount,
            theVideo?.dateOfUpload,
            theVideo?.originalName
        );
    })
    return videos;
}

let fetchVideosByIds = async (videoIds) => {
    let allVideos = await videoCollection.find({ _id: { $in: (videoIds.map((videoId) => ObjectId.createFromHexString(videoId))) } }).toArray();

    let videos = allVideos.map((theVideo) => {
        return new video(
            theVideo?._id,
            theVideo?.channelName,
            theVideo?.title,
            theVideo?.description,
            theVideo?.likeCount,
            theVideo?.viewCount,
            theVideo?.commentCount,
            theVideo?.dateOfUpload,
            theVideo?.originalName
        );
    })
    return videos;
}

let fetchVideoById = async (videoId) => {
    let theVideo = await videoCollection.findOne({ _id: ObjectId.createFromHexString(videoId) });
    return new video(
        theVideo?._id,
        theVideo?.channelName,
        theVideo?.title,
        theVideo?.description,
        theVideo?.likeCount,
        theVideo?.viewCount,
        theVideo?.commentCount,
        theVideo?.dateOfUpload,
        theVideo?.originalName
    );
}

let fetchVideosByTag = async (userId, tag) => {
    let userTags = await userTagCollection.find({ userId: userId, tag: tag }).toArray();
    let videoIds = userTags.map((userTag) => {
        return userTag.videoId;
    })

    let videos = await fetchVideosByIds(videoIds);
    return videos;
}

let fetchVideosByChannelName = async (channelName) => {
    let allVideos = await videoCollection.find({ channelName: channelName }).toArray();

    let videos = allVideos.map((theVideo) => {
        return new video(
            theVideo?._id,
            theVideo?.channelName,
            theVideo?.title,
            theVideo?.description,
            theVideo?.likeCount,
            theVideo?.viewCount,
            theVideo?.commentCount,
            theVideo?.dateOfUpload,
            theVideo?.originalName
        );
    })
    return videos;
}

let fetchVIdeosByTitleMatch = async (title) => {
    let allVideos = await videoCollection.find({ title: { $regex: title, $options: 'i' } }).toArray();

    let videos = allVideos.map((theVideo) => {
        return new video(
            theVideo?._id,
            theVideo?.channelName,
            theVideo?.title,
            theVideo?.description,
            theVideo?.likeCount,
            theVideo?.viewCount,
            theVideo?.commentCount,
            theVideo?.dateOfUpload,
            theVideo?.originalName
        );
    })
    return videos;
}

let insertVideo = async (videoObj) => {
    let newVideo = await videoCollection.insertOne(videoObj);
    return newVideo;
}

let increaseLikeCount = async (videoId) => {
    let updatedVideo = await videoCollection.updateOne({ _id: ObjectId.createFromHexString(videoId) }, { $inc: { likeCount: 1 } });
    return updatedVideo;
}

let decreaseLikeCount = async (videoId) => {
    let updatedVideo = await videoCollection.updateOne({ _id: ObjectId.createFromHexString(videoId) }, { $inc: { likeCount: -1 } });
    return updatedVideo;
}

let increaseViewCount = async (videoId) => {
    let updatedVideo = await videoCollection.updateOne({ _id: ObjectId.createFromHexString(videoId) }, { $inc: { viewCount: 1 } });
    return updatedVideo;
}

let increaseCommentCount = async (videoId) => {
    let updatedVideo = await videoCollection.updateOne({ _id: ObjectId.createFromHexString(videoId) }, { $inc: { commentCount: 1 } });
    return updatedVideo;
}

let decreaseCommentCount = async (videoId) => {
    let updatedVideo = await videoCollection.updateOne({ _id: ObjectId.createFromHexString(videoId) }, { $inc: { commentCount: -1 } });
    return updatedVideo;
}

export {
    fetchAllVideos,
    fetchVideosByTag,
    fetchVideosByChannelName,
    insertVideo,
    increaseLikeCount,
    increaseViewCount,
    increaseCommentCount,
    fetchVideoById,
    decreaseLikeCount,
    fetchVIdeosByTitleMatch,
    decreaseCommentCount
};
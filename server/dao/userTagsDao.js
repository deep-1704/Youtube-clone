import { database } from "./mongoClient.js";

let userTagCollection = database.collection("userTags");

let insertUserTag = async (userTagObj) => {
    let newUserTag = await userTagCollection.insertOne(userTagObj);
    return newUserTag;
}

let deleteHistory = async (userId) => {
    let deleteResult = await userTagCollection.deleteMany({ userId: userId, tag: "hs" });
    return deleteResult;
}

let getUserTags = async (userId, videoId) => {
    let userTags = await userTagCollection.find({ userId: userId, videoId: videoId }).toArray();
    return userTags.map((userTag) => {
        return userTag.tag;
    });
}

let deleteUserTag = async (userId, videoId, tag) => {
    let deleteResult = await userTagCollection.deleteOne({ userId: userId, videoId: videoId, tag: tag });
    return deleteResult;
}

export { insertUserTag, deleteHistory, getUserTags, deleteUserTag };

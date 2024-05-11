import { ObjectId } from "mongodb";

import { database } from "./mongoClient.js";
import { comment } from "../models/models.js";
import { increaseCommentCount } from "./videoDao.js";

let commentCollection = database.collection("comments");

let fetchCommentsByVideoId = async (videoId) => {
    let allComments = await commentCollection.find({ videoId: videoId }).toArray();

    let comments = allComments.map((theComment) => {
        return new comment(
            theComment?._id,
            theComment?.userId,
            theComment?.firstName,
            theComment?.lastName,
            theComment?.videoId,
            theComment?.comment
        );
    })
    return comments;
}

let insertComment = async (newCommentObj) => {
    let result = await commentCollection.insertOne(newCommentObj);
    if (result.insertedId) {
        increaseCommentCount(newCommentObj.videoId);
    }
    return result.insertedId;
}

let updateComment = async (commentId, updatedComment) => {
    let result = await commentCollection.updateOne(
        { _id: ObjectId.createFromHexString(commentId) },
        {
            $set: {
                comment: updatedComment
            }
        }
    )
    return result.modifiedCount;
}

let deleteComment = async (commentId) => {
    let result = await commentCollection.deleteOne({ _id: ObjectId.createFromHexString(commentId) });
    return result.deletedCount;
}

export { fetchCommentsByVideoId, insertComment, updateComment, deleteComment }
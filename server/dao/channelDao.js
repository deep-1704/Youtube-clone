import { database } from "./mongoClient.js";
import { channel } from "../models/models.js";

import { ObjectId } from 'mongodb';

let channelCollection = database.collection("channels");

let fetchChannelById = async (channelId) => {
    let theChannel = await channelCollection.findOne({ _id: ObjectId.createFromHexString(channelId) });
    return new channel(
        theChannel?._id,
        theChannel?.userId,
        theChannel?.name,
        theChannel?.description,
    );
}

let fetchChannelByName = async (name) => {
    let theChannel = await channelCollection.findOne({ name: name });
    return new channel(
        theChannel?._id,
        theChannel?.userId,
        theChannel?.name,
        theChannel?.description,
    );
}

let fetchChannelByUserId = async (userId) => {
    let theChannel = await channelCollection.findOne({ userId: userId });
    return new channel(
        theChannel?._id,
        theChannel?.userId,
        theChannel?.name,
        theChannel?.description,
    );
}

let createChannel = async (channelObj) => {
    let newChannel = await channelCollection.insertOne(channelObj);
    return newChannel;
}

let updateChannel = async (channelId, channelObj) => {
    let updatedChannel = await channelCollection.updateOne({ _id: ObjectId.createFromHexString(channelId) }, { $set: {
        name: channelObj.name,
        description: channelObj.description
    } });
    return updatedChannel;
}

export { fetchChannelById, fetchChannelByName, fetchChannelByUserId, createChannel, updateChannel };
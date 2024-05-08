import { database } from "./mongoClient.js";

let userTagCollection = database.collection("userTags");

let insertUserTag = async (userTagObj) => {
    let newUserTag = await userTagCollection.insertOne(userTagObj);
    return newUserTag;
}

export { insertUserTag };

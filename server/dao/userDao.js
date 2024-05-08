import { database } from "./mongoClient.js";
import { user } from "../models/models.js";

let userCollection = database.collection("users");

let fetchUserById = async (userId) => {
    let _user = await userCollection.findOne({ _id: userId });

    return new user(
        _user._id,
        _user.firstName,
        _user.lastName,
        _user.email,
        _user.imgSrc
    );
}

let insertUser = async (userObj) => {
    let newUser = await userCollection.insertOne(userObj);
    return newUser;
}

let fetchUserByEmail = async (email) => {
    let _user = await userCollection.findOne({ email: email });

    return new user(
        _user._id,
        _user.firstName,
        _user.lastName,
        _user.email,
        _user.imgSrc
    );
}
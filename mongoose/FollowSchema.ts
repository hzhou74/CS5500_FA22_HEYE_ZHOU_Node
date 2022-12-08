/**
 * @file Creating mongoose follow schema
 */
import mongoose from "mongoose";

const FollowSchema = new mongoose.Schema(
    {
        followedOn: { type: Date, default: Date.now },
        userFollowed: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
        userFollowing: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel",
        },
    },
    { collection: "follows" }
);
export default FollowSchema;
/**
 * @file Creating mongoose model from follow
 */
import mongoose from "mongoose";
import FollowSchema from "./FollowSchema";

const FollowModel = mongoose.model("FollowModel", FollowSchema);

export default FollowModel;
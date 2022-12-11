/**
 * @file defining dislike schema for mongoose
 */
import mongoose, { Schema } from "mongoose";
import Dislike from "../models/Dislike";

/**
 * DislikeSchema
 * @constructor DislikeSchema
 */
const DislikeSchema = new mongoose.Schema<Dislike>({
        postedOn: {type: Date, default: Date.now},
        dislikedTuit: { type: Schema.Types.ObjectId, ref: "TuitModel" },
        dislikedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
    },
    { collection: "dislikes" }
);
export default DislikeSchema;


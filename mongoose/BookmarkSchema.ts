/**
 * @file Creating mongoose bookmark schema
 */
import mongoose from "mongoose";

/**
 * @typedef bookmarkSchema represents the tuit which was bookmarked by a user
 * @property {string} postedOn represents date on which user bookmarked the post
 * @property {string} bookmarkedBy represents the person who bookmarked
 * @property {string} bookmarkedTuit represents the tuit that got bookmarked
 */
const BookmarkSchema = new mongoose.Schema(
    {
        postedOn: {type: Date, default: Date.now},
        bookmarkedTuit: { type: mongoose.Schema.Types.ObjectId, ref: "TuitModel" },
        bookmarkedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel",
        },
    },
    { collection: "bookmarks" }
);
export default BookmarkSchema;
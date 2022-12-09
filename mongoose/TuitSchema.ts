import mongoose, {Schema} from "mongoose";
import Tuit from "../models/Tuit";
const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId,
        ref: "UserModel"},
    postedOn: {type: Date, default: Date.now},
    stats: {
        replies: {type: Number, default: 0},
        retuits: {type: Number, default: 0},
        likes: {type: Number, default: 0}
    }
}, {collection: "tuits"});
export default TuitSchema;
// /**
//  * @file Creating mongoose tuit schema
//  */
// import mongoose from "mongoose";
//
// const TuitSchema = new mongoose.Schema(
//     {
//         tuit: String,
//         postedOn: { type: Date, default: Date.now },
//         postedBy: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "UserModel",
//         },
//     },
//     { collection: "tuits" }
// );
// export default TuitSchema;
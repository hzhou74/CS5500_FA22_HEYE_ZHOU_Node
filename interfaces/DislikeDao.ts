/**
 * @file like dao interface for implementing CRUD operations
 */
import DisLike from "../models/Dislike";
import Tuit from "../models/Tuit";
import User from "../models/Like";

/**
 * @interface DislikeDao interface
 */

export default interface DislikeDao {
    /**
     * Like a tuit
     * @param tid tuit id which is disliked
     * @param uid user id which is dislikes the tuit
     */
    dislikeATuit(tid: string, uid: string): Promise<any>;
    /**
     * Tuit that is disliked
     * @param tid tuit id which is disliked
     * @param uid user id which is dislikes the tuit
     */
    likeATuit(tid: string, uid: string): Promise<any>;
    /**
     * Find tuits that likes a tuit
     * @param uid user who likes the tuit
     */
    findTuitsDislikedByAUser(uid: string): Promise<Tuit[]>;
    /**
     * Find users that liked a tuit
     * @param tid tuit that is liked
     */
    findUsersThatDislikedATuit(tid: string): Promise<User[]>;
}
//     /**
//      * Create a dislike for a tuit
//      * @param {string}uid user id
//      * @param {string}tid tuit id
//      * @returns like
//      */
//     userDislikesTuit(tid: string, uid: string): Promise<any>;
//
//     /**
//      * Delete dislikes for a tuit
//      * @param {string}uid user id
//      * @param {string}tid tuit id
//      * @returns delete status
//      */
//     userUnDislikesTuit(tid: string, uid: string): Promise<DisLike>;
//
//     /**
//      * Find a disliked tuit that matches tuit id and user id.
//      * @param {string} uid user id
//      * @param {string} tid tuit id
//      */
//     findUserDislikesTuit(uid: string, tid: string): Promise<DisLike>;
// }
    // /**
    //  * Find all tuits disliked by user id
    //  * @param {string} uid user id
    //  * @returns like
    //  */
    // findAllTuitsDislikedByUser(uid: string): Promise<DisLike[]>;

//     /**
//      * Count how many dislike there is for a tuit
//      * @param tid tuit id
//      */
//     countHowManyDislikedTuit(tid: string): Promise<number>;
//
//     /**
//      * Find all disliked tuit by user id
//      * @param {string} uid user id
//      * @returns dislike
//      */
//     findAllTuitsDislikedByUser(uid: string): Promise<DisLike[]>;
// }
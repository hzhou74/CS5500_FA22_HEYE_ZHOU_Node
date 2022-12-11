/**
 * @file Controller interface RESTful Web service API for like  resource
 */
import { Request, Response } from "express";

/**
 * @interface DislikeControllerI interface
 */
export default interface DislikeControllerI {
    /**
     * Like a tuit
     * @param req request object
     * @param res response object
     */
    dislikeATuit(req: Request, res: Response): void;

    /**
     * Get tuits liked by a user
     * @param req request object
     * @param res response object
     */
    findTuitsDislikedByAUser(req: Request, res: Response): void;

    /**
     * Dislike a tuit
     * @param req request object
     * @param res response object
     */
    likeATuit(req: Request, res: Response): void;

    /**
     * Get users who liked a tuit
     * @param req request object
     * @param res response object
     */
    findUsersThatDislikedATuit(req: Request, res: Response): void;
}
//     /**
//      * @param {Request} req Represents request from client, including the
//      * path parameters uid and tid representing the user that is disliking the tuit
//      * and the tuit being disliked
//      * @param {Response} res Represents response to client, including the
//      * body formatted as JSON containing the new dislike that was inserted in the
//      * database
//      */
//     userDislikesTuit(req: Request, res: Response): void;
//     /**
//      * @param {Request} req Represents request from client, including the
//      * path parameters uid and tid representing the user that is undisliking
//      * the tuit and the tuit being undisliked
//      * @param {Response} res Represents response to client, including status
//      * on whether deleting the dislike was successful or not
//      */
//     userUnDislikesTuit(req: Request, res: Response): void;
//
//     /**
//      *
//      * @param {Request} req Represents request from client, including the
//      * path parameters uid and tid representing the user that is to find a dislike tuit
//      * @param {Response} res Represents response to client, returning the disliked tuit.
//      */
//     findUserDislikesTuit(req: Request, res: Response): void;
//
//     /**
//      * @param {Request} req Represents request from client, include a parameter for tuit id
//      * @param {Response} res Represents response to client, returning the count of how many disliked tuit
//      */
//     countHowManyDislikedTuit(req: Request, res: Response): void;
//
//     /**
//      * @param {Request} req Represents request from client, include a parameter for tuit id and user id
//      * @param {Response} res Represents response to client, returning  a status for success or failed
//      */
//     // userTogglesTuitDislikes(req: Request, res: Response): void;
//     //
//     // findAllTuitsDislikedByUser(req: Request, res: Response): void;
// }
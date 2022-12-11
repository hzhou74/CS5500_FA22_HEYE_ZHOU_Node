/**
 * @file Controller RESTful Web service API for likes resource
 */
import {Request, Response, Express} from "express";
import LikeDao from "../daos/LikeDao";
import LikeControllerI from "../interfaces/LikeController";

/**
 * @class LikeController Implements RESTful Web service API for users resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /users/:uid/likes/:tid to create tuit</li>
 *     <li>DELETE /users/:uid/likes/:tid to delete tuit</li>
 *     <li>GET /users/:uid/likes get tuits who like a specific user</li>
 *     <li>GET /tuits/:tid/likes get users who like a specific tuit</li>
 * </ul>
 * @property {LikeDao} FollowDao Singleton DAO implementing user CRUD operations
 * @property {LikeController} userController Singleton controller implementing
 * RESTful Web service API
 */
export default class LikeController implements LikeControllerI {

    private static likeDao: LikeDao = LikeDao.getInstance();
    private static likeController: LikeController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns LikeController
     */
    public static getInstance = (app: Express): LikeController => {

        if(LikeController.likeController === null) {
            LikeController.likeController = new LikeController();
            app.post("/users/:uid/likes/:tid", LikeController.likeController.likeATuit);
            app.delete("/users/:uid/likes/:tid", LikeController.likeController.dislikeATuit);
            app.get("/users/:uid/likes", LikeController.likeController.findTuitsLikedByAUser);
            app.get("/tuits/:tid/likes", LikeController.likeController.findUsersThatLikedATuit);
        }
        return LikeController.likeController;
    }

    private constructor() {}


    likeATuit = (req: Request, res: Response) => LikeController.likeDao.likeATuit(req.params.tid,req.params.uid)
        .then(like => res.json(like));

    dislikeATuit = (req: Request, res: Response) => LikeController.likeDao.dislikeATuit(req.params.tid,req.params.uid)
        .then(status => res.json(status));

    findTuitsLikedByAUser = (req: Request, res: Response) => LikeController.likeDao.findTuitsLikedByAUser(req.params.uid)
        .then(likes => res.json(likes));

    findUsersThatLikedATuit = (req: Request, res: Response)=> LikeController.likeDao.findUsersThatLikedATuit(req.params.tid)
        .then(likes => res.json(likes));

}
// /**
//  * @file Controller RESTful Web service API for likes resource
//  */
// import {Request, Response, Express} from "express";
// import LikeDao from "../daos/LikeDao";
// import TuitDao from "../daos/TuitDao";
// import LikeControllerI from "../interfaces/LikeController";
//
//
// /**
//  * @class LikeController Implements RESTful Web service API for users resource.
//  * Defines the following HTTP endpoints:
//  * <ul>
//  *     <li>POST /users/:uid/likes/:tid to create tuit</li>
//  *     <li>DELETE /users/:uid/likes/:tid to delete tuit</li>
//  *     <li>GET /users/:uid/likes get tuits who like a specific user</li>
//  *     <li>GET /tuits/:tid/likes get users who like a specific tuit</li>
//  * </ul>
//  * @property {LikeDao} FollowDao Singleton DAO implementing user CRUD operations
//  * @property {LikeController} userController Singleton controller implementing
//  * RESTful Web service API
//  */
// export default class LikeController implements LikeControllerI {
//
//     private static likeDao: LikeDao = LikeDao.getInstance();
//     private static likeController: LikeController | null = null;
//
//     /**
//      * Creates singleton controller instance
//      * @param {Express} app Express instance to declare the RESTful Web service
//      * API
//      * @returns LikeController
//      */
//     public static getInstance = (app: Express): LikeController => {
//
//         if (LikeController.likeController === null) {
//             LikeController.likeController = new LikeController();
//             app.post("/users/:uid/likes/:tid", LikeController.likeController.likeATuit);
//             app.delete("/users/:uid/likes/:tid", LikeController.likeController.dislikeATuit);
//             app.get("/users/:uid/likes", LikeController.likeController.findTuitsLikedByAUser);
//             app.get("/tuits/:tid/likes", LikeController.likeController.findUsersThatLikedATuit);
//             // app.put("/api/users/:uid/likes/:tid", LikeController.likeController.userTogglesTuitLikes);
//             app.get("/api/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser);
//         }
//         return LikeController.likeController;
//     }
//
//     private constructor() {
//     }
//
//
//     likeATuit = (req: Request, res: Response) => LikeController.likeDao.likeATuit(req.params.tid, req.params.uid)
//         .then(like => res.json(like));
//
//
//     dislikeATuit = (req: Request, res: Response) => LikeController.likeDao.dislikeATuit(req.params.tid, req.params.uid)
//         .then(status => res.json(status));
//
//     findTuitsLikedByAUser = (req: Request, res: Response) => LikeController.likeDao.findTuitsLikedByAUser(req.params.uid)
//         .then(likes => res.json(likes));
//
//     findUsersThatLikedATuit = (req: Request, res: Response) => LikeController.likeDao.findUsersThatLikedATuit(req.params.tid)
//         .then(likes => res.json(likes));
// }
//
//     // userTogglesTuitLikes = async (req: any, res: any) => {
//     //     const tuitDao: TuitDao = TuitDao.getInstance();
//     //     const uid = req.params.uid;
//     //     const tid = req.params.tid;
//     //     const profile = req.session['profile'];
//     //     const userId = uid === "me" && profile ?
//     //         profile._id : uid;
//     //     try {
//     //         const userAlreadyLikedTuit = await LikeController.likeDao
//     //             .findUserLikesTuit(userId, tid);
//     //         const howManyLikedTuit = await LikeController.likeDao
//     //             .countHowManyLikedTuit(tid);
//     //         let tuit: any = await tuitDao.findTuitById(tid);
//     //         if (userAlreadyLikedTuit) {
//     //             await LikeController.likeDao.userUnlikesTuit(userId, tid);
//     //             tuit.stats.likes = howManyLikedTuit - 1;
//     //         } else {
//     //             await LikeController.likeDao.userLikesTuit(userId, tid);
//     //             tuit.stats.likes = howManyLikedTuit + 1;
//     //         }
//     //         ;
//     //         await tuitDao.updateTuit(tid, tuit.stats);
//     //         res.sendStatus(200);
//     //     } catch (e) {
//     //         res.sendStatus(404);
//     //     }
//     // }
//     // findAllTuitsLikedByUser = (req: any, res: any) => {
//     //     const uid = req.params.uid;
//     //     const profile = req.session['profile'];
//     //     const userId = uid === "me" && profile ?
//     //         profile._id : uid;
//     //
//     //     LikeController.likeDao.findAllTuitsLikedByUser(userId)
//     //         .then(likes => {
//     //             const likesNonNullTuits =
//     //                 likes.filter(like => like);
//     //             const tuitsFromLikes =
//     //                 likesNonNullTuits.map(like => like);
//     //             res.json(tuitsFromLikes);
//     //         });
//     // }

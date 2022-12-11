/**
 * @file Controller RESTful Web service API for likes resource
 */
import { Express, Request, Response } from "express";
import DislikeDao from "../daos/DislikeDao";
import DislikeControllerI from "../interfaces/DislikeController";

import TuitDao from "../daos/TuitDao";
import TuitDaoI from "../interfaces/TuitDao";
import Tuit from "../models/Tuit";
import LikeDao from "../daos/LikeDao";
import LikeDaoI from "../interfaces/LikeDao";

/**
 * @class DislikeController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/likes/:tid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user
 *     no longer likes a tuit</li>
 * </ul>
 * @property {DislikeDao} DislikeDao Singleton DAO implementing likes CRUD operations
 * @property {DislikeControllerI} DislikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class DislikeController implements DislikeControllerI {
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();
    private static dislikeController: DislikeController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return DislikeController
     */
    public static getInstance = (app: Express): DislikeController => {
        if(DislikeController.dislikeController === null) {
            DislikeController.dislikeController = new DislikeController();
            app.post("/users/:uid/dislikes/:tid", DislikeController.dislikeController.likeATuit);
            app.delete("/users/:uid/dislikes/:tid", DislikeController.dislikeController.dislikeATuit);
            app.get("/users/:uid/dislikes", DislikeController.dislikeController.findTuitsDislikedByAUser);
            app.get("/tuits/:tid/dislikes", DislikeController.dislikeController.findUsersThatDislikedATuit);
            // app.put("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController.userTogglesTuitDislikes);
            app.get("/api/users/:uid/dislikes", DislikeController.dislikeController.findAllTuitsDislikedByUser);
        }
        return DislikeController.dislikeController;
    }

    private constructor() {}


    dislikeATuit = (req: Request, res: Response) => DislikeController.dislikeDao.dislikeATuit(req.params.tid,req.params.uid)
        .then(dislike => res.json(dislike));


    likeATuit = (req: Request, res: Response) => DislikeController.dislikeDao.likeATuit(req.params.tid,req.params.uid)
        .then(status => res.json(status));

    findTuitsDislikedByAUser = (req: Request, res: Response) => DislikeController.dislikeDao.findTuitsDislikedByAUser(req.params.uid)
        .then(dislikes => res.json(dislikes));

    findUsersThatDislikedATuit = (req: Request, res: Response)=> DislikeController.dislikeDao.findUsersThatDislikedATuit(req.params.tid)
        .then(dislikes => res.json(dislikes));

    // userTogglesTuitDisikes = async (req:any, res:any) => {
    //     const tuitDao: TuitDao = TuitDao.getInstance();
    //     const uid = req.params.uid;
    //     const tid = req.params.tid;
    //     const profile = req.session['profile'];
    //     const userId = uid === "me" && profile ?
    //         profile._id : uid;
    //     try {
    //         const userAlreadyLikedTuit = await LikeController.likeDao
    //             .findUserLikesTuit(userId, tid);
    //         const howManyLikedTuit = await LikeController.likeDao
    //             .countHowManyLikedTuit(tid);
    //         let tuit: any = await tuitDao.findTuitById(tid);
    //         if (userAlreadyLikedTuit) {
    //             await LikeController.likeDao.userUnlikesTuit(userId, tid);
    //             tuit.stats.likes = howManyLikedTuit - 1;
    //         } else {
    //             await LikeController.likeDao.userLikesTuit(userId, tid);
    //             tuit.stats.likes = howManyLikedTuit + 1;
    //         };
    //         await tuitDao.updateTuit(tid, tuit.stats);
    //         res.sendStatus(200);
    //     } catch (e) {
    //         res.sendStatus(404);
    //     }
    // }
    findAllTuitsDislikedByUser = (req:any, res:any) => {
        const uid = req.params.uid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;

        DislikeController.dislikeDao.findAllTuitsDislikedByUser(userId)
            .then(dislikes => {
                const dislikesNonNullTuits =
                    dislikes.filter(dislike => dislike);
                const tuitsFromDislikes =
                    dislikesNonNullTuits.map(dislike => dislike);
                res.json(tuitsFromDislikes);
            });
    }

}
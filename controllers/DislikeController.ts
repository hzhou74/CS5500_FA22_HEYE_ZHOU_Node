/**
 * @file Controller RESTful Web service API for likes resource
 */
import {Request, Response, Express} from "express";
import DislikeDao from "../daos/DisLikeDao";
import DislikeControllerI from "../interfaces/DislikeController";

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
        if (DislikeController.dislikeController === null) {
            DislikeController.dislikeController = new DislikeController();

            app.post("/users/:uid/dislikes/:tid", DislikeController.dislikeController.likeATuit);
            app.delete("/users/:uid/dislikes/:tid", DislikeController.dislikeController.dislikeATuit);
            app.get("/users/:uid/dislikes", DislikeController.dislikeController.findTuitsDislikedByAUser);
            app.get("/tuits/:tid/dislikes", DislikeController.dislikeController.findUsersThatDislikedATuit);
        }
        return DislikeController.dislikeController;
    }

    private constructor() {
    }


    dislikeATuit = (req: Request, res: Response) => DislikeController.dislikeDao.dislikeATuit(req.params.tid,req.params.uid)
        .then(dislike => res.json(dislike));


    likeATuit = (req: Request, res: Response) => DislikeController.dislikeDao.likeATuit(req.params.tid,req.params.uid)
        .then(status => res.json(status));

    findTuitsDislikedByAUser = (req: Request, res: Response) => DislikeController.dislikeDao.findTuitsDislikedByAUser(req.params.uid)
        .then(dislikes => res.json(dislikes));

    findUsersThatDislikedATuit = (req: Request, res: Response)=> DislikeController.dislikeDao.findUsersThatDislikedATuit(req.params.tid)
        .then(dislikes => res.json(dislikes));

}
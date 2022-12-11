/**
 * @file Controller RESTful Web service API for tuits resource
 */
import { Request, Response, Express } from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";

export default class TuitController implements TuitControllerI {
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns TuitController
     */
    public static getInstance = (app: Express): TuitController => {
        if (TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();
            app.get("/tuits", TuitController.tuitController.findAllTuits);
            app.get(
                "/users/:uid/tuits",
                TuitController.tuitController.findTuitsByUser
            );
            app.get("/tuits/:tid", TuitController.tuitController.findTuitById);
            app.post("/users/:uid/tuits", TuitController.tuitController.createTuit);
            app.put("/tuits/:tid", TuitController.tuitController.updateTuit);
            app.delete("/tuits/:tid", TuitController.tuitController.deleteTuit);
        }
        return TuitController.tuitController;
    };

    private constructor() {}

    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits().then((tuits) => res.json(tuits));

    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao
            .findTuitById(req.params.tid)
            .then((tuit) => res.json(tuit));

    createTuit = (req: Request, res: Response) =>
        TuitController.tuitDao
            .createTuit(req.params.uid, req.body)
            .then((tuit) => res.json(tuit));

    deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao
            .deleteTuit(req.params.tid)
            .then((status) => res.json(status));

    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao
            .updateTuit(req.params.tid, req.body)
            .then((tuit) => res.json(tuit));

    findTuitsByUser = (req: Request, res: Response) =>
        TuitController.tuitDao
            .findTuitsByUser(req.params.uid)
            .then((tuits) => res.json(tuits));

    /**
     * Delete tuit by user id
     * @param {Request} req Represents request from client, including path
     * parameter userid identifying the primary key of the tuits to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    deleteTuitByUser = (req: Request, res: Response) =>
        TuitController.tuitDao
            .deleteTuit(req.params.uid)
            .then((status) => res.json(status));

    /**
     * Create Tuit by user id
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new tuit and a user id param
     * to be inserted in the database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new tuit that was inserted in the
     * database
     */
    createTuitByUser = (req: any, res: any) => {
        let userId =
            req.params.uid === "me" && req.session["profile"]
                ? req.session["profile"]._id
                : req.params.uid;
        TuitController.tuitDao
            .createTuitByUser(userId, req.body)
            .then((tuit) => res.json(tuit));
    };
}
import { Request, Response, Express } from "express";

import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";

export default class TuitController implements TuitControllerI {
    // app: Express;
    // tuitDao: TuitDao;
    //
    // constructor(app: Express, tuitDao:TuitDao) {
    //     this.app = app;
    //     this.tuitDao = tuitDao;
    //     this.app.get('/tuits', this.findAllTuits);
    //     this.app.get('/tuits/users/:uid/', this.findTuitsByUser);
    //     this.app.get('/tuits/:tid', this.findTuitById);
    //     this.app.post('/tuits', this.createTuit);
    //     this.app.delete('/tuits/:tid', this.deleteTuit);
    //     this.app.put('/tuits/:tid', this.updateTuit);
    // }
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;

    public static getInstance = (app: Express): TuitController => {
        if (TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();
            app.get("/tuits", TuitController.tuitController.findAllTuits);
            app.post("/tuits", TuitController.tuitController.createTuit);
            app.get(
                "/users/:uid/tuits",
                TuitController.tuitController.findTuitsByUser
            );
            app.get("/tuits/:tid", TuitController.tuitController.findTuitById);
            app.delete("/tuits/:tid", TuitController.tuitController.deleteTuit);
            app.put("/tuits/:tid", TuitController.tuitController.updateTuit);
        }

        return TuitController.tuitController;
    };

    private constructor() {}



    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));
    findTuitsByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitsByUser(req.params.userid)
            .then(tuits => res.json(tuits));
    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitById(req.params.tuitid)
            .then(tuit => res.json(tuit));
    createTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.createTuit(req.body)
            .then(tuit => res.json(tuit));
    deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuit(req.params.tuitid)
            .then(status => res.json(status));
    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.updateTuit(req.params.tuitid, req.body)
            .then(status => res.json(status));
}


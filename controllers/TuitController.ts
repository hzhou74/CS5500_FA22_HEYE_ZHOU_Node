import { Request, Response, Express } from "express";

import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";

export default class TuitController implements TuitControllerI {
    app: Express;
    tuitDao: TuitDao;

    constructor(app: Express, tuitDao:TuitDao) {
        this.app = app;
        this.tuitDao = tuitDao;
        this.app.get('/tuits', this.findAllTuits);
        this.app.get('/tuits/users/:uid/', this.findTuitsByUser);
        this.app.get('/tuits/:tid', this.findTuitById);
        this.app.post('/tuits', this.createTuit);
        this.app.delete('/tuits/:tid', this.deleteTuit);
        this.app.put('/tuits/:tid', this.updateTuit);
    }

    findAllTuits = (req: Request, res: Response) =>
        this.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));
    findTuitsByUser = (req: Request, res: Response) =>
        this.tuitDao.findTuitsByUser(req.params.userid)
            .then(tuits => res.json(tuits));
    findTuitById = (req: Request, res: Response) =>
        this.tuitDao.findTuitById(req.params.tuitid)
            .then(tuit => res.json(tuit));
    createTuit = (req: Request, res: Response) =>
        this.tuitDao.createTuit(req.body)
            .then(tuit => res.json(tuit));
    deleteTuit = (req: Request, res: Response) =>
        this.tuitDao.deleteTuit(req.params.tuitid)
            .then(status => res.json(status));
    updateTuit = (req: Request, res: Response) =>
        this.tuitDao.updateTuit(req.params.tuitid, req.body)
            .then(status => res.json(status));
}


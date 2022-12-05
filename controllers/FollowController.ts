import { Request, Response, Express } from "express";

import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowController";

export default class FollowController {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();

            app.post("/follow", FollowController.followController.followUser);

            app.delete(
                "/follow/:fid",
                FollowController.followController.unfollowUser
            );

            app.get(
                "/follow/user/:uid/following",
                FollowController.followController.findAllFollowing
            );

            app.get(
                "/follow/user/:uid/followed",
                FollowController.followController.findAllFollowed
            );

            app.delete(
                "/follow/user/:uid/removeFollowing",
                FollowController.followController.removeAllFollower
            );

            app.put(
                "/follow/:fid/update",
                FollowController.followController.updateFollowing
            );
        }

        return FollowController.followController;
    };

    private constructor() {}

    followUser = (req: Request, res: Response) =>
        FollowController.followDao
            .followUser(req.body)
            .then((follow) => res.json(follow));

    unfollowUser = (req: Request, res: Response) =>
        FollowController.followDao
            .unfollowUser(req.params.fid)
            .then((status) => res.json(status));

    updateFollowing = (req: Request, res: Response) =>
        FollowController.followDao
            .updateFollowing(req.params.fid, req.body)
            .then((follow) => res.json(follow));


    findAllFollowing = (req: Request, res: Response) =>
        FollowController.followDao
            .findAllFollowing(req.params.uid)
            .then((follows) => res.json(follows));

    findAllFollowed = (req: Request, res: Response) =>
        FollowController.followDao
            .findAllFollowed(req.params.uid)
            .then((follows) => res.json(follows));

    removeAllFollower = (req: Request, res: Response) =>
        FollowController.followDao
            .removeAllFollower(req.params.uid)
            .then((follows) => res.json(follows));



}
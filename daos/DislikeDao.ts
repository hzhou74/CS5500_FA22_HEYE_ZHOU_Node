/**
 * @file like dao for implementing CRUD operations
 */
import DislikeDaoI from "../interfaces/DislikeDao";
import Dislike from "../models/Dislike";
import DislikeModel from "../mongoose/DislikeModel";

/**
 * @class DislikeDoa implements DislikeDao interface
 * @property {DislikeDao} DislikeDao Singleton DAO implementing like CRUD operation
 *
 */
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;

    /**
     * Create singleton DislikeDao instance
     * @returns DislikeDao
     */
    public static getInstance = (): DislikeDao => {
        if (DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    };
    private constructor() {}

    async dislikeATuit(tid: string, uid: string): Promise<any> {
        if (!(await DislikeModel.exists({ dislikedTuit: tid, dislikedBy: uid }))) {
            return await DislikeModel.create({ dislikedTuit: tid, dislikedBy: uid });
        }
        return await DislikeModel.findOne({ dislikedTuit: tid, dislikedBy: uid });
    }

    async likeATuit(tid: string, uid: string): Promise<any> {
        return await DislikeModel.deleteOne({ dislikedTuit: tid, dislikedBy: uid });
    }

    async findTuitsDislikedByAUser(uid: string): Promise<any> {
        return await DislikeModel.find({ dislikedBy: uid }).populate("dislikedTuit").exec();
    }

    async findUsersThatDislikedATuit(tid: string): Promise<any> {
        return await DislikeModel.find({ dislikedTuit: tid }).populate("dislikedBy").exec();
    }

    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel.find({ dislikedBy: uid })
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy",
                },
            })
            .exec();

    findUserDislikesTuit =
        async (uid:string, tid:string) =>
            DislikeModel.findOne(
                {tuit: tid, dislikedBy: uid});

    countHowManyDislikedTuit =
        async (tid: string) =>
            DislikeModel.count({tuit: tid});

    userDislikesTuit =
        async (uid:string, tid:string) =>
            DislikeModel.create({tuit: tid, dislikedBy: uid});

    userUnDislikesTuit =
        async (uid:string, tid:string) =>
            DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});

}

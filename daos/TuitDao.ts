/**
 * @file tuit Dao for implementing CRUD operations
 */
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";

/**
 * @class TuitDao implements TuitDaoI
 * @property {TuitDao} TuitDao Singleton DAO implementing CRUD operation
 */
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    };

    private constructor() {}

    /**
     * Find all tuits
     * @returns array of tuit
     */
    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }

    /**
     * Find tuit by user id
     * @param {string}userid user id
     * @returns array of tuit
     */
    async findTuitsByUser(userid: string): Promise<any> {
        return await TuitModel.find({ postedBy: userid });
    }

    /**
     * Create new tuit
     * @param {tuit}tuit tuit
     * @returns tuit
     */
    async createTuit(tuit: Tuit): Promise<any> {
        return await TuitModel.create(tuit);
    }

    /**
     * Find one tuit by the tuit id
     * @param {string}tid t id
     * @returns tuit
     */
    async findTuitById(tid: string): Promise<any> {
        return await TuitModel.findById(tid);
    }
    /**
     * Update tuit
     * @param {string}tid tuit id
     * @param {tuit}tuit tuit to be updated
     * @returns update status
     */
    async updateTuit(tid: string, tuit: any): Promise<any> {
        return await TuitModel.updateOne({ _id: tid }, { $set: tuit });
    }

    /**
     * delete tuit
     * @param {string}tid tuit id
     * @returns delete status
     */
    async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({ _id: tid });
    }

    /**
     * delete tuit by user
     * @param {string}userid user id
     * @returns delete status
     */
    async deleteTuitByUser(userid: string): Promise<any> {
        return await TuitModel.deleteOne({ _id: userid });
    }
    /**
     * Create new tuit by user id
     * @param {tuit} tuit tuit
     * @param {userid} userid user id
     * @returns tuit
     */
    async createTuitByUser(userid: string, tuit: Tuit): Promise<any> {
        return await TuitModel.create({ ...tuit, postedBy: userid });
    }
}

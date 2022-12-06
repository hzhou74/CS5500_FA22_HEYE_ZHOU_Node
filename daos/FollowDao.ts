/**
 * @file follow dao for implementing CRUD operations
 */
import Follow from "../models/Follow";
import FollowModel from "../mongoose/FollowModel";
import FollowDaoI from "../interfaces/FollowDao";

/**
 * @class FollowDao implements FollowDaoI
 *
 */
export default class FollowDao implements FollowDaoI {
    private static FollowDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if (FollowDao.FollowDao === null) {
            FollowDao.FollowDao = new FollowDao();
        }
        return FollowDao.FollowDao;
    };

    private constructor() {}

    /**
     * Create follow document with the FollowModel
     * @param {Follow}follow json follow
     * @returns follow document
     */
    async followUser(follow: Follow): Promise<any> {
        return await FollowModel.create(follow);
    }

    /**
     * Find all the followed that match the user ID
     * @param  {string} uid user id
     * @returns  {follow[]} follow
     */
    async findAllFollowed(uid: string): Promise<any[]> {
        return await FollowModel.find({ userFollowed: uid });
    }

    /**
     * Find all the following that match the user ID
     * @param  {string} uid user id
     * @returns  {follow[]} follow
     */
    async findAllFollowing(uid: string): Promise<any[]> {
        return await FollowModel.find({ userFollowing: uid });
    }

    /**
     * Delete follow document with the FollowModel
     * @param {string} fid follow id
     * @returns delete status
     */
    async unfollowUser(fid: string): Promise<any> {
        return await FollowModel.deleteOne({ _id: fid });
    }


    /**
     * Delete all followed that match the user ID
     * @param {string} uid string
     * @returns {string} delete status
     */
    async removeAllFollower(uid: string): Promise<any> {
        return FollowModel.deleteMany({userFollowed: uid});
    }

    /**
     * update follow by fid with a new follow
     * @param {string}fid follow id
     * @param {follow} follow follow to be updated
     * @returns update status
     */
    async updateFollowing(fid: string, follow: any): Promise<any> {
        return FollowModel.updateOne({_id: fid}, {$set: follow});
    }
}
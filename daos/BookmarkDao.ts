/**
 * @file bookmark dao for implementing CRUD operations
 */
import Bookmark from "../models/Bookmark";
import BookmarkModel from "../mongoose/BookmarkModel";
import BookmarkDaoI from "../interfaces/BookmarkDao";

/**
 * @class BookmarkDao implements BookmarkDaoI
 *
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static BookmarkDao: BookmarkDao | null = null;

    /**
     * Create singleton BookmarkDao instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.BookmarkDao === null) {
            BookmarkDao.BookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.BookmarkDao;
    };

    private constructor() {}



    /**
     * Find all the bookmark tuit by the user ID
     * @param  {string} uid user id
     * @returns  {bookmark[]} bookmark
     */
    async unbookmarkAllByUserId(uid: string): Promise<any> {
        return await BookmarkModel.deleteMany({ bookmarkedBy: uid });
    }

    async bookmarkATuit(tid: string, uid: string): Promise<Bookmark> {
        return await BookmarkModel.create({
            bookmarkedTuit: tid,
            bookmarkedBy: uid,
        });
    }

    async unBookmarkATuit(tid: string, uid: string): Promise<any> {
        return await BookmarkModel.deleteOne({
            bookmarkedTuit: tid,
            bookmarkedBy: uid,
        });
    }


    /**
     * Delete all bookmark with user ID
     * @param {string} uid string
     * @returns {string} delete status
     */
    async findBookmarkTuitByUserId(uid: string): Promise<any[]> {
        return await BookmarkModel.find({ bookmarkedBy: uid })
            .populate("bookmarkedTuit")
            .exec();
    }

    /**
     * update bookmark by bid with new bookmark
     * @param {string}bid bookmark id
     * @param {bookmark} bookmark bookmark to be updated
     * @returns update status
     */
    async updateBookmark(bid: string, bookmark: any): Promise<any> {
        return await BookmarkModel.updateOne({ _id: bid }, { $set: bookmark });
    }
}
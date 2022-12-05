import Bookmark from "../models/Bookmark";
import BookmarkModel from "../mongoose/BookmarkModel";
import BookmarkDaoI from "../interfaces/BookmarkDao";

export default class BookmarkDao implements BookmarkDaoI {
    private static BookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.BookmarkDao === null) {
            BookmarkDao.BookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.BookmarkDao;
    };

    private constructor() {}

    async createBookmark(bookmark: Bookmark): Promise<any> {
        return await BookmarkModel.create(bookmark);
    }

    async unbookmark(bid: string): Promise<any> {
        return await BookmarkModel.deleteOne({ _id: bid });
    }

    async unbookmarkAllByUserId(uid: string): Promise<any> {
        return await BookmarkModel.deleteMany({ bookmarkedBy: uid });
    }

    async findBookmarkTuitByUserId(uid: string): Promise<any[]> {
        return await BookmarkModel.find({ bookmarkedBy: uid })
            .populate("bookmarkedTuit")
            .exec();
    }

    async updateBookmark(bid: string, bookmark: any): Promise<any> {
        return await BookmarkModel.updateOne({ _id: bid }, { $set: bookmark });
    }
}
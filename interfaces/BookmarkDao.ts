/**
 * @file interface for bookmarkdao
 */
import Bookmark from "../models/Bookmark";
import Tuit from "../models/Tuit";

/**
 * @file This file is an interface for using Bookmark collections
 */
export default interface BookmarkDao {
    /**
     * Bookmarks the tuit
     * @param tid tuit id to be bookmarked
     * @param uid user id of the user who would bookmark
     */
    bookmarkATuit(tid: string, uid: string): Promise<Bookmark>;
    /**
     * Unbookmarks the tuit
     * @param tid tuit id to be bookmarked
     * @param uid user id of the user who would bookmark
     */
    unBookmarkATuit(tid: string, uid: string): Promise<any>;

    /**
     * find tuits bookmarked by the user
     * @param uid user id of the user who would bookmark
     */
    findBookmarkTuitByUserId(uid: string): Promise<Tuit[]>;

    /**
     * Remove all tuits bookmarked by a user
     * @param tid tuit id to be bookmarked
     */
    unbookmarkAllByUserId(uid: string): Promise<any>;


    updateBookmark(uid: string, bookmark: Bookmark): Promise<any>;
}
/**
 * @file Interface for bookmarkController
 */
import { Request, Response } from "express";

/**
 * @file This file is an interface for Bookmark api
 */
export default interface FollowController {
    /**
     * Bookmarks the tuit
     * @param req request object
     * @param res response object
     */
    bookmarkATuit(req: Request, res: Response): void;
    /**
     * Unbookmarks the tuit
     * @param req request object
     * @param res response object
     */
    unBookmarkATuit(req: Request, res: Response): void;
    findBookmarkTuitByUserId(req: Request, res: Response): void;
    unbookmarkAllByUserId(req: Request, res: Response): void;
    updateBookmark(req: Request, res: Response): void;
}

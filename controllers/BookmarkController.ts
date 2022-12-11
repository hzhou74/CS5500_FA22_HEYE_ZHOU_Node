/**
 * @file Controller RESTful service API for bookmark
 */
import { Request, Response, Express } from "express";

import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkController";

/**
 * @class BookmarkController Implements RESTful API for bookmark .
 *  Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /bookmark to create a new bookmark for a given user</li>
 *     <li>GET /bookmark/user/:uid to retrieve bookmarks for a given user </li>
 *     <li>PUT /bookmark/:bid to modify an individual bookmark instance </li>
 *     <li>DELETE /bookmarks/:bid to remove a particular bookmark instance</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmark CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web Service
     * API
     * @return BookmarkController
     */
    public static getInstance = (app: Express): BookmarkController => {
        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();

            app.post(
                "/users/:uid/bookmarks/:tid",
                BookmarkController.bookmarkController.bookmarkATuit
            );
            app.delete(
                "/users/:uid/bookmarks/:tid",
                BookmarkController.bookmarkController.unBookmarkATuit
            );

            app.get(
                "/bookmark/user/:uid",
                BookmarkController.bookmarkController.findBookmarkTuitByUserId
            );

            app.delete(
                "/bookmark/user/:uid/unbookmarkall",
                BookmarkController.bookmarkController.unbookmarkAllByUserId
            );

            app.put(
                "/bookmark/:bid",
                BookmarkController.bookmarkController.updateBookmark
            );
        }

        return BookmarkController.bookmarkController;
    };

    /**
     * Create a bookmark
     * containing the JSON object for the new bookmark to be inserted in the database
     * body formatted as JSON containing the new bookmark that was inserted in the database
     */
    private constructor() {}

    /**
     * Create a bookmark
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new bookmark to be inserted in the database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmark that was inserted in the database
     */
    bookmarkATuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao
            .bookmarkATuit(req.params.tid, req.params.uid)
            .then((bookmark) => res.json(bookmark));

    /**
     * Delete a bookmark with a bid.
     * @param {Request} req Represents request from client, including path
     * parameter bid identifying the primary key of the bookmark to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a bookmark was successful or not
     */
    unBookmarkATuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao
            .unBookmarkATuit(req.params.tid, req.params.uid)
            .then((status) => res.json(status));

    /**
     * Update bookmark with bid
     * @param {Request} req Represents request from client, including path
     * parameter bid identifying the primary key of the bookmark to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a bookmark was successful or not
     */
    updateBookmark = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao
            .updateBookmark(req.params.bid, req.body)
            .then((bookmark) => res.json(bookmark));

    /**
     * Retrieves all bookmark from the database for a particular user and returns an array of bookmark and bookmarks.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmark and bookmark objects
     */
    findBookmarkTuitByUserId = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao
            .findBookmarkTuitByUserId(req.params.uid)
            .then((bookmarks) => res.json(bookmarks));

    /**
     * Delete all bookmark with the user id.
     * @param {Request} req Represents request from client, including path
     * parameter bid identifying the primary key of the bookmark to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a bookmark was successful or not
     */

    unbookmarkAllByUserId = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao
            .unbookmarkAllByUserId(req.params.uid)
            .then((status) => res.json(status));


}
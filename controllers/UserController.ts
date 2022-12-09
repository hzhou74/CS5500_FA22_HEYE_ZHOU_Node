/**
 * @file RESTFUL\ Web service API for users resource
 */
import {Request, Response, Express} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserController";

/**
 * @class UserController Implements RESTFUL Web service API for user resource.
 *   Defines the user HTTP endpoints:
 * <ul>
 *     <li>POST /users to create a new user instance for
 *     a given user</li>
 *     <li>GET /users/:uid to retrieve users for a given uid </li>
 *     <li>GET /users retrieve all</li>
 *     <li>PUT /users/:uid to modify an individual user instance </li>
 *     <li>DELETE /users/:uid to remove a particular user instance</li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing user CRUD operations
 * @property {UserController} userController Singleton controller implementing
 * RESTFUL Web service API
 */
export default class UserController implements UserControllerI {
    // app: Express;
    // userDao: UserDao;
    // constructor(app: Express, userDao: UserDao) {
    //     this.app = app;
    //     this.userDao = userDao;
    //     this.app.get('/users', this.findAllUsers);
    //     this.app.get('/users/:userid', this.findUserById);
    //     this.app.post('/users', this.createUser);
    //     this.app.delete('/users/:userid', this.deleteUser);
    //     this.app.put('/users/:userid', this.updateUser);

    private static userDao: UserDao = UserDao.getInstance();
    private static userController: UserController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTFUL Web service
     * API
     * @return UserController
     */
    public static getInstance = (app: Express): UserController => {
        if (UserController.userController == null) {
            UserController.userController = new UserController();

            app.get("/users", UserController.userController.findAllUsers);
            app.get("/users/:userid", UserController.userController.findUserById);
            app.post("/users", UserController.userController.createUser);
            app.delete("/users/:userid", UserController.userController.deleteUser);
            app.delete("/users", UserController.userController.deleteAllUsers);
            app.delete("/users/username/:username/delete", UserController.userController.deleteUsersByUsername);
            app.put("/users/:userid", UserController.userController.updateUser);
            app.get("/users/username/:username", UserController.userController.findUserByUsername
            );
        }
        return UserController.userController;
    };

    /**
     * Delete a user with uid.
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    deleteUser = (req: Request, res: Response) =>
        UserController.userDao
            .deleteUser(req.params.userid)
            .then((status) => res.json(status));

    private constructor() {
    }

    deleteUserByUsername(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        throw new Error("Method not implemented.");
    }
    /**
     * Retrieves all user
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user object
     */
    findAllUsers = (req: Request, res: Response) =>
        UserController.userDao.findAllUsers().then((users) => res.json(users));

    /**
     * Update user with uid
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a user was successful or not
     */
    updateUser = (req: Request, res: Response) =>
        UserController.userDao
            .updateUser(req.params.userid, req.body)
            .then((status) => res.json(status));

    // deleteUserByUsername(req: Request, res: Response) =>
    //     UserController.userDao
    //         .deleteUserByUsername(req.params.userid)
    //         .then((status) => res.json(status));
    // = (req: Request, res: Response) =>
    //     UserController.userDao
    // .deleteUserByUsername(req.params.userid)
    // .then((status) => res.json(status));

    deleteUsersByUsername = (req: Request, res: Response) => {
        UserController.userDao
            .deleteUsersByUsername(req.params.username)
            .then((status) => res.json(status));
    };


    deleteAllUsers = (req: Request, res: Response) => {
        UserController.userDao.deleteAllUsers().then((status) => res.json(status));
    };


    /**
     * Retrieves a user by user id
     * @param {Request} req Represents request from client, including the params userid
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the user object
     */
    findUserById = (req: Request, res: Response) =>
        UserController.userDao
            .findUserById(req.params.userid)
            .then((user) => res.json(user));
    /**
     * Create a user
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new user to be inserted in the database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new user that was inserted in the database
     */
    createUser = (req: Request, res: Response) =>
        UserController.userDao.createUser(req.body).then((user) => res.json(user));

    /**
     *Find user by username
     * @param {Request} req Represents request from client, including path
     * parameter username identifying the primary key of the user to be find
     * @param {Response} res Represents response to client, including the return of the found user
     */
    findUserByUsername = (req: Request, res: Response) =>
        UserController.userDao
            .findUserByUsername(req.params.username)
            .then((user) => res.json(user));

}
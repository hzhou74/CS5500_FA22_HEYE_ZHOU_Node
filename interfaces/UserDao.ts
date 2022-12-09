/**
 * @file user Dao interface for implementing CRUD operations
 */
import User from "../models/User";
import {Request, Response} from "express";

export default interface UserDao {
    findAllUsers(): Promise<User[]>;
    findUserById(uid: string): Promise<any>;
    createUser(user: User): Promise<User>;
    updateUser(uid: string, user: User): Promise<any>;
    deleteUser(uid: string): Promise<any>;
    deleteUsersByUsername(username: string): Promise<any>;
    deleteAllUsers(): Promise<any>;
    findUserByUsername(username: string): Promise<any>;
}


/**
 * @file Tuit Dao for implementing CRUD operations
 */
import Tuit from "../models/Tuit";

export default interface TuitDao {
    findAllTuits(): Promise<Tuit[]>;
    findTuitsByUser(userid: string): Promise<Tuit[]>;
    findTuitById(tid: string): Promise<Tuit>;
    createTuit(tuit: Tuit): Promise<Tuit>;
    updateTuit(tid: string, tuit: Tuit): Promise<any>;
    deleteTuit(tid: string): Promise<any>;
    deleteTuitByUser(userid: string): Promise<any>;
    createTuitByUser(userid: string, tuit: Tuit): Promise<any>;

}


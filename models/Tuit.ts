/**
 * @file tuit model for declaring relationship between user and tuit
 */
import User from "./User";
import Topic from "./Topic";
import Tag from "./Tag";

/**
 * @class tuit class model
 * @property {string} tuit the tuit messages
 * @property {Date} postedOn the date tuit created
 * @property {User} postedBy the user that created the tuit
 */
export default class Tuit {
    private tuit: string = "";
    private postedOn: Date = new Date();
    private postedBy: User | null = null;
    private tag: Tag | null = null;
    private topic: Topic | null = null;
    public stats: {
        replies: number;
        retuits: number;
        likes: number;
        dislikes: number;
    } | null = null;

}


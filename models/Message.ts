/**
 * @file declaring message class definition with relationship between a from user and to user
 */
import User from "./User";

export default class Bookmark {
    private message: String = "";
    private to: User;
    private from: User;
    private sentOn: Date = new Date();
}
/**
 * @file message Dao for implementing CRUD operations
 */
import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";
import MessageDaoI from "../interfaces/MessageDao";

/**
 * @class MessageDao implements MessageDaoI
 * @property {MessageDao} MessageDao Singleton DAO implementing message CRUD operation
 */
export default class MessageDao implements MessageDaoI {
    private static MessageDao: MessageDao | null = null;
    /**
     * Create singleton MessageDao instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.MessageDao === null) {
            MessageDao.MessageDao = new MessageDao();
        }
        return MessageDao.MessageDao;
    };

    private constructor() {}

    /**
     * Create new message with a message json
     * @param  {message}  message json message
     * @returns  message
     */
    async createMessage(message: Message): Promise<any> {
        return await MessageModel.create(message);
    }



    /**
     * Find message sent by user id
     * @param {string} uid user id
     * @returns meesage array
     */
    async findSentMessageByUserId(uid: string): Promise<any[]> {
        return await MessageModel.find({ from: uid })
            .populate("to")
            .populate("from")
            .exec();
    }


    async updateMessage(mid: string, message: any): Promise<any> {
        return await MessageModel.updateOne({ _id: mid }, { $set: message });
    }

    /**
     * Delete message with message id
     * @param {string}  mid message id
     * @returns delete status
     */
    async deleteMessage(mid: string): Promise<any> {
        return await MessageModel.deleteOne({ _id: mid });
    }
    async findMessageOfTwoUsers(uid1: string, uid2: string): Promise<any> {
        const partone = await MessageModel.find({
            $or: [
                { to: uid1, from: uid2 },
                { to: uid2, from: uid1 },
            ],
        })
            .populate("to")
            .populate("from")
            .exec()

        return partone.concat(partone);
    }
    /**
     * Find message received by user id
     * @param {string} uid user id
     * @returns {message} message
     */
    async findRecievedMessageByUserId(uid: string): Promise<any[]> {
        return await MessageModel.find({ to: uid })
            .populate("to")
            .populate("from")
            .exec();
    }

}
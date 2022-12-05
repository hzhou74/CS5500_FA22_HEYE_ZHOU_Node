import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";
import MessageDaoI from "../interfaces/MessageDao";

export default class MessageDao implements MessageDaoI {
    private static MessageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if (MessageDao.MessageDao === null) {
            MessageDao.MessageDao = new MessageDao();
        }
        return MessageDao.MessageDao;
    };

    private constructor() {}

    async createMessage(message: Message): Promise<any> {
        return await MessageModel.create(message);
    }

    async deleteMessage(mid: string): Promise<any> {
        return await MessageModel.deleteOne({ _id: mid });
    }

    async findSentMessageByUserId(uid: string): Promise<any[]> {
        return await MessageModel.find({ from: uid })
            .populate("to")
            .populate("from")
            .exec();
    }

    async findRecievedMessageByUserId(uid: string): Promise<any[]> {
        return await MessageModel.find({ to: uid })
            .populate("to")
            .populate("from")
            .exec();
    }

    async updateMessage(mid: string, message: any): Promise<any> {
        return await MessageModel.updateOne({ _id: mid }, { $set: message });
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
}
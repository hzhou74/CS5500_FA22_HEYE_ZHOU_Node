import { Request, Response, Express } from "express";

import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageController";

export default class MessageController {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();

            app.post("/message", MessageController.messageController.createMessage);

            app.delete(
                "/message/:mid",
                MessageController.messageController.deleteMessage
            );

            app.put(
              "/message/:bid",
              MessageController.messageController.updateMessage
            );
        }

        return MessageController.messageController;
    };

    private constructor() {}

    createMessage = (req: Request, res: Response) =>
        MessageController.messageDao
            .createMessage(req.body)
            .then((message) => res.json(message));

    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao
            .deleteMessage(req.params.mid)
            .then((status) => res.json(status));

    updateMessage = (req: Request, res: Response) =>
      MessageController.messageDao
        .updateMessage(req.params.bid, req.body)
        .then((message) => res.json(message));
}

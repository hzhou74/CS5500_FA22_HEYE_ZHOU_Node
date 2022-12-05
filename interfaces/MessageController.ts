import { Request, Response } from "express";

export default interface MessageController {
    findAllTuits(req: Request, res: Response): void;
    createMessage(req: Request, res: Response): void;
    findSentMessageByUserId(req: Request, res: Response): void;
    findRecievedMessageByUserId(req: Request, res: Response): void;
    deleteMessage(req: Request, res: Response): void;
    findMessageOfTwoUsers(req: Request, res: Response): void;
    updateMessage(req: Request, res: Response): void;

}
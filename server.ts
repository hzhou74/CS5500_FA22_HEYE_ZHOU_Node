/**
 * @file Implements an Express Node HTTP server.
 */

import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";
import LikeController from "./controllers/LikeController";
import AuthenticationController from "./controllers/auth-controller";


const cors = require("cors");

const session = require("express-session");
// const app = express();
const app = express();
// app.use(cors());

app.use(
    cors({
        credentials: true,
        origin: true,
        // origin: "http://localhost:4000",
        optionsSuccessStatus: 200,
    })
);




let sess = {
    // secret: process.env.SECRET,
    secret:"HeyeZ",
    cookie: {
        secure: false
    }
}

app.use(session(sess));

app.use(express.json());



const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}

// 'mongodb+srv://cs5500fa22:HqisGljV7ra4jAy2@cluster0.bkwci2f.mongodb.net/test'
//mongodb+srv://cs5500fa22:HqisGljV7ra4jAy2@cluster0.bkwci2f.mongodb.net/CS5520Fa22_Heye
//mongodb+srv://cs5500fa22:HqisGljV7ra4jAy2@cluster0.bkwci2f.mongodb.net/?retryWrites=true&w=majority
// mongoose.connect('mongodb+srv://ujjval:ujjval@cluster0.zwdxz.mongodb.net/whiteboard?retryWrites=true&w=majority&ssl=true');
// mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://cs5500fa22:HqisGljV7ra4jAy2@cluster0.bkwci2f.mongodb.net/CS5520Fa22_Heye');
// mongoose.connect('mongodb+srv://cs5500fa22:HqisGljV7ra4jAy2@cluster0.bkwci2f.mongodb.net/CS5520Fa22_Heye?retryWrites=true&w=majority&ssl=true');
mongoose.connect(process.env.MONGODB_URI ||'mongodb+srv://cs5500fa22:HqisGljV7ra4jAy2@whiteboard.4xo1zxp.mongodb.net/whiteboard?retryWrites=true&w=majority',options);


const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);
const likesController = LikeController.getInstance(app);
const authorController = AuthenticationController(app);


app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!!!!'));
//
app.get('/hello', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!'));

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
// const port = process.env.PORT || PORT

if (process.env.ENV === 'PRODUCTION') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.listen(process.env.PORT || PORT);

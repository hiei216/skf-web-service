"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)("another-todo:database");
const error = (0, debug_1.default)("another-todo:database:error");
// First I define my DB URI or
// make my script take it from the env variables
const DB_URI = process.env.DB_URI ||
    "mongodb+srv://jiridvorak:u6HxWCOVRCsAy358@cluster0.xms1v8x.mongodb.net/skf-web-database?retryWrites=true&w=majority";
// Define some basic methods to
// connect/disconnect to the DB
exports.db = {
    connect() {
        return mongoose_1.default.connect(DB_URI);
    },
    disconnect() {
        return mongoose_1.default.connection.close(() => {
            process.exit(0);
        });
    },
};
// This let mongoose use the node's default promises
mongoose_1.default.Promise = global.Promise;
// Logs for our app
mongoose_1.default.connection.on("connected", () => {
    log("Mongoose connection open to " + DB_URI);
});
// More logs...
mongoose_1.default.connection.on("disconnected", () => {
    log("Mongoose disconnected");
});
// Logs that I hope to not see
mongoose_1.default.connection.on("error", (err) => {
    error(err);
});
// Handle process terminations
// this ensures that there is any connection
// open with DB when I stop the app
process.on("SIGINT", exports.db.disconnect).on("SIGTERM", exports.db.disconnect);
// finally I only expose the methods to being used by my app script
//# sourceMappingURL=db.js.map
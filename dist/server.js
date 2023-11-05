"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bible_1 = __importDefault(require("./routes/bible"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8081;
app.use(express_1.default.json()); // Add this line to enable JSON parsing in the request body
app.use("/bible", bible_1.default);
app.get("/", (req, res) => {
    res.send("Hello, TypeScript Express!");
});
// Add this error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong");
});
mongoose_1.default
    // .connect(process.env.MONGO_LOGIN)
    .connect('mongodb+srv://jiridvorak:u6HxWCOVRCsAy358@cluster0.xms1v8x.mongodb.net/skf-web-database?retryWrites=true&w=majority')
    .then(() => {
    app.listen(port, () => {
        console.log(`server running : http://localhost:8081`);
    });
})
    .catch((err) => {
    console.log(err);
});
// // start the server
// app.listen(port, () => {
//   console.log(`server running : http://localhost:8081`);
// });
//# sourceMappingURL=server.js.map
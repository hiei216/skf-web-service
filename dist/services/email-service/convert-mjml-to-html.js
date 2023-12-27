"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eta_1 = require("eta");
const mjml_1 = __importDefault(require("mjml"));
const path_1 = __importDefault(require("path"));
const eta = new eta_1.Eta({ views: path_1.default.join(__dirname, "templates") });
const convertMjmlToHtml = (filePath, data) => {
    let mjmlFull;
    try {
        mjmlFull = eta.render(filePath, data);
    }
    catch (e) {
        console.error("Error while parsing Eta template :", filePath, e);
        process.exit(1);
    }
    const html = (0, mjml_1.default)(mjmlFull, {
        fonts: {},
        actualPath: filePath,
    });
    if (html.errors.length) {
        html.errors.forEach((error) => {
            console.error(error.formattedMessage + "\n");
        });
        process.exit(1);
    }
    return html.html;
};
//# sourceMappingURL=convert-mjml-to-html.js.map
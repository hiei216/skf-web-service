"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mustache_1 = __importDefault(require("mustache"));
const mjml_1 = __importDefault(require("mjml"));
const ENVIRONMENT = process.env.ENVIRONMENT || "localhost";
const sendEmail = (mjmlTemplate, templateData) => {
    const renderedMJML = mustache_1.default.render(mjmlTemplate, templateData);
    const html = (0, mjml_1.default)(renderedMJML).html;
    const transporter = ENVIRONMENT === "production"
        ? nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "hiei216@gmail.com",
                pass: process.env.GMAIL_NODEMAILER_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        })
        : nodemailer_1.default.createTransport({
            host: "localhost",
            port: 1025,
        });
    const mailOptions = ENVIRONMENT === "production"
        ? {
            from: "hiei216@gmail.com",
            to: "jiri.dvorak@gmx.de",
            subject: "Sending Email using Node.js",
            text: "That was easy!",
        }
        : {
            from: "mailhog@mailhog.com",
            to: "jiri.dvorak@gmx.com",
            subject: "Sending Email using Node.js",
            html,
        };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Email sent: " + info.response);
        }
    });
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=email-service.js.map
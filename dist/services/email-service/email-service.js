"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mustache_1 = __importDefault(require("mustache"));
const mjml_1 = __importDefault(require("mjml"));
const ENVIRONMENT = process.env.NODE_ENV || "localhost";
const sendEmail = (template, templateData) => {
    const mjmlFilePath = path_1.default.join(`${__dirname}\\templates\\`, template);
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
    fs_1.default.readFile(mjmlFilePath, "utf8", (err, mjmlTemplate) => {
        if (err) {
            console.error("Error reading MJML file:", err);
            return;
        }
        // Render the MJML template with Mustache
        const renderedMjml = mustache_1.default.render(mjmlTemplate, templateData);
        // Convert MJML to HTML
        const { html, errors } = (0, mjml_1.default)(renderedMjml);
        // Handle MJML conversion errors
        if (errors.length > 0) {
            console.error("MJML conversion errors:", errors);
            return;
        }
        const mailOptions = ENVIRONMENT === "production"
            ? {
                from: "hiei216@gmail.com",
                to: "jiri.dvorak@gmx.de",
                subject: "Sending Email using Node.js",
                text: "That was easy!",
                html,
            }
            : {
                from: "mailhog@mailhog.com",
                to: "jiri.dvorak@gmx.com",
                subject: "Sending Email using Node.js",
                text: "That was easy!",
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
    });
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=email-service.js.map
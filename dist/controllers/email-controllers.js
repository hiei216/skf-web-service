"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTemplateEmail = void 0;
const email_service_1 = require("../services/email-service/email-service");
const sendTemplateEmail = (req, res) => {
    const { recipient, template } = req.body.email;
    try {
        (0, email_service_1.sendEmail)(template, recipient);
        res.status(201).json({
            status: "Email was send succesfully!",
        });
    }
    catch (err) {
        console.log("err", err);
        res.status(201).json({
            status: "Error - email was not sent!",
        });
    }
};
exports.sendTemplateEmail = sendTemplateEmail;
//# sourceMappingURL=email-controllers.js.map
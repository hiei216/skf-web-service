"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTemplateEmail = void 0;
const email_service_1 = require("../services/email-service/email-service");
const test_1 = require("../services/email-service/templates/test");
const sendTemplateEmail = (req, res, next) => {
    const { data } = req.body.email;
    try {
        (0, email_service_1.sendEmail)(test_1.testTemplate, data);
    }
    catch (err) {
        console.log("err", err);
    }
    res.status(201).json({
        status: "Email was send succesfully!",
    });
};
exports.sendTemplateEmail = sendTemplateEmail;
//# sourceMappingURL=email-controllers.js.map
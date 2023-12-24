"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTemplateEmail = void 0;
const email_service_1 = require("../services/email-service/email-service");
const sendTemplateEmail = async (req, res, next) => {
    //   const participants = req.body.participants;
    //   const readyParticipants: any = [];
    try {
        (0, email_service_1.sendEmail)();
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
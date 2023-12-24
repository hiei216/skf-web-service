"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const email_controllers_1 = require("../controllers/email-controllers");
const router = (0, express_1.Router)();
router.post("/send-email", email_controllers_1.sendTemplateEmail);
exports.default = router;
//# sourceMappingURL=email.js.map
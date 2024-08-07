"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controllers_1 = require("../controllers/login-controllers");
const router = (0, express_1.Router)();
router.get('/login', login_controllers_1.login);
exports.default = router;
//# sourceMappingURL=login.js.map
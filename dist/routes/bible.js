"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bible_controllers_1 = require("../controllers/bible-controllers");
const router = (0, express_1.Router)();
router.post("/create-verses", bible_controllers_1.createVerses);
router.get("/get-todays-verses", bible_controllers_1.getTodaysVerses);
exports.default = router;
//# sourceMappingURL=bible.js.map
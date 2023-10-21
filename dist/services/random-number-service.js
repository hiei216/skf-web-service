"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomNumber = void 0;
const getRandomNumber = (maxValue) => {
    const min = 0;
    const max = Math.floor(maxValue - 1);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.getRandomNumber = getRandomNumber;
//# sourceMappingURL=random-number-service.js.map
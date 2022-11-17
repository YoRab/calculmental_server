"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCode = void 0;
const createCode = (existingCodes) => {
    do {
        let code = `${Math.floor(Math.random() * 8 + 1)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}`;
        if (!existingCodes.includes(code)) {
            return code;
        }
    } while (1);
};
exports.createCode = createCode;

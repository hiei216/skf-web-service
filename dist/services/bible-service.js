"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBibleVerse = void 0;
const url = "https://api.scripture.api.bible/v1/bibles/c61908161b077c4c-01/verses/";
const options = {
    method: "GET",
    headers: {
        "api-key": "84acb414d4c69514fd7fc7002f5d4db6",
    },
};
const getBibleVerse = async (bibleVerse) => {
    try {
        const response = await fetch(`${url}${bibleVerse}`, options);
        const data = await response.json();
        return data ?? {};
    }
    catch (error) {
        console.error("Error:", error);
        return {};
    }
};
exports.getBibleVerse = getBibleVerse;
//# sourceMappingURL=bible-service.js.map
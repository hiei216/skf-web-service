"use strict";
// const getEnglishBibleVerseAbbreviationForBibleApi = {
//   'Hebr': 'HEB',
//   'Rim': 'ROM',
// };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBibleVerseFromBibleSk = void 0;
const getBibleVerseAbbreviation = {
    Gn: 'gn',
    Ex: 'ex',
    Lv: 'lv',
    Num: 'nm',
    Dt: 'dt',
    Jz: 'joz',
    Sdc: 'sdc',
    Rut: 'rut',
    ['1 Sam']: '1sam',
    ['2 Sam']: '2sam',
    ['1 Krl']: '1krl',
    ['2 Krl']: '2krl',
    ['1 Krn']: '1krn',
    ['2 Krn']: '2krn',
    Ezd: 'ezd',
    Neh: 'neh', // not sure
    Hebr: 'heb',
    Rim: 'rim',
    Sk: 'sk',
    Zj: 'zj',
};
// const options: IAPIOptions = {
//   method: "GET",
//   headers: {
//     "api-key": process.env.BIBLE_API_KEY,
//   },
// };
const options = {
    method: 'GET',
};
// export const getBibleVerseFromBibleApi = async (bibleVerse: string) => {
//   try {
//     const response = await fetch(`${url}${bibleVerse}`, options);
//     const data = await response.json();
//     return data ?? {};
//   } catch (error) {
//     console.error("Error:", error);
//     return {};
//   }
// };
const getBibleBookAndChapter = (bibleVerse) => {
    const indexOfWhitespace = bibleVerse.indexOf(' ');
    const indexOfComma = bibleVerse.indexOf(',');
    const book = bibleVerse.slice(0, indexOfWhitespace);
    const chapter = bibleVerse.slice(indexOfWhitespace + 1, indexOfComma);
    const verses = bibleVerse.slice(indexOfComma + 1);
    const indexOfHyphen = verses.indexOf('-');
    const startVerse = indexOfHyphen === -1 ? verses.slice(0) : verses.slice(0, indexOfHyphen);
    const endVerse = indexOfHyphen === -1 ? verses.slice(0) : verses.slice(indexOfHyphen + 1);
    return {
        book: getBibleVerseAbbreviation[book],
        chapter,
        verses: {
            start: startVerse,
            end: endVerse,
        },
    };
};
const getBibleVerseFromBibleSk = async (bibleVerse) => {
    const verseData = getBibleBookAndChapter(bibleVerse);
    try {
        const response = await fetch(`https://biblia.sk/api/chapter?translation=ssv&book=${verseData.book}&chapter=${verseData.chapter}`, options);
        const data = await response.json();
        const verseList = data.data;
        const concreteVerses = [];
        if (verseList.length === 0) {
            return {};
        }
        for (let i = +verseData.verses.start + 1; i < +verseData.verses.end + 2; i++) {
            concreteVerses.push(verseList[i].content);
        }
        return {
            bookName: verseList[0].book_object.name,
            chapter: verseData.chapter,
            verseNumber: verseData.verses.start === verseData.verses.end
                ? verseData.verses.start
                : `${verseData.verses.start}-${verseData.verses.end}`,
            verses: concreteVerses,
        };
    }
    catch (error) {
        console.error('Error:', error);
        return {};
    }
};
exports.getBibleVerseFromBibleSk = getBibleVerseFromBibleSk;
//# sourceMappingURL=bible-service.js.map
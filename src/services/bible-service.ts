// const getEnglishBibleVerseAbbreviationForBibleApi = {
//   'Hebr': 'HEB',
//   'Rim': 'ROM',
// };

const getBibleVerseAbbreviation: Record<string, string> = {
  Gn: 'gn',
  Ex: 'ex',
  Lv: 'lv',
  Num: 'nm',
  Dt: 'dt',
  Joz: 'joz',
  Sdc: 'sdc',
  Rút: 'rut',
  ['1Sam']: '1sam',
  ['2Sam']: '2sam',
  ['1Kr']: '1krl',
  ['2Kr']: '2krl',
  ['1Krn']: '1krn',
  ['2Krn']: '2krn',
  Ezd: 'ezd',
  Neh: 'neh', // not sure
  Tob: 'tob', // not sure
  Jdt: 'jdt',
  Est: 'est',
  Jób: 'job',
  Ž: 'z',
  Prísl: 'pris',
  Kaz: 'koh',
  Pies: 'vlp',
  Mudr: 'mud',
  Sir: 'sir',
  Iz: 'iz',
  Jer: 'jer',
  Nár: 'nar',
  Bar: 'bar',
  Ez: 'ez',
  Dan: 'dan',
  Oz: 'oz',
  Joel: 'joel',
  Am: 'am',
  Abd: 'abd',
  Jon: 'jon',
  Mich: 'mich',
  Nah: 'nah',
  Hab: 'hab',
  Sof: 'sof',
  Ag: 'ag',
  Zach: 'zach',
  Mal: 'mal',
  ['1Mach']: '1mak',
  ['2Mach']: '2mak',
  Mt: 'mt',
  Mk: 'mk',
  Lk: 'lk',
  Jn: 'jn',
  Sk: 'sk',
  Rim: 'rim',
  ['1Kor']: '1kor',
  ['2Kor']: '2kor',
  Gal: 'ga',
  Ef: 'ef',
  Flp: 'flp',
  Kol: 'kol',
  ['1Sol']: '1tes',
  ['2Sol']: '2tes',
  ['1Tim']: '1tim',
  ['2Tim']: '2tim',
  Tít: 'tit',
  Flm: 'flm',
  Hebr: 'heb',
  Jak: 'jk',
  ['1Pt']: '1pt',
  ['2Pt']: '2pt',
  ['1Jn']: '1jn',
  ['2Jn']: '2jn',
  ['3Jn']: '3jn',
  Júd: 'jud',
  Zj: 'zj',
};

// const url: string =
//   "https://api.scripture.api.bible/v1/bibles/c61908161b077c4c-01/verses/";
// interface IAPIOptions {
//   method: string;
//   headers: {
//     "api-key": string;
//   };
// }

interface Options {
  method: string;
}
// const options: IAPIOptions = {
//   method: "GET",
//   headers: {
//     "api-key": process.env.BIBLE_API_KEY,
//   },
// };

const options: Options = {
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

const getBibleBookAndChapter = (bibleVerse: string) => {
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

type VerseResponse = {
  bookName: string;
  chapter: string;
  verseNumber: string;
  verses: string[];
};

export const getBibleVerseFromBibleSk = async (bibleVerse: string): Promise<VerseResponse | {}> => {
  const verseData = getBibleBookAndChapter(bibleVerse);
  try {
    const response = await fetch(
      `https://biblia.sk/api/chapter?translation=ssv&book=${verseData.book}&chapter=${verseData.chapter}`,
      options,
    );

    const data = await response.json();
    const verseList = data.data;
    const concreteVerses = [];

    if (verseList.length === 0) {
      return {};
    }

    for (let i = +verseData.verses.start - 1; i < +verseData.verses.end; i++) {
      concreteVerses.push(verseList[i].content);
    }

    return {
      bookName: verseList[0].book_object.name,
      chapter: verseData.chapter,
      verseNumber:
        verseData.verses.start === verseData.verses.end
          ? verseData.verses.start
          : `${verseData.verses.start}-${verseData.verses.end}`,
      verses: concreteVerses,
    };
  } catch (error) {
    console.error('Error:', error);
    return {};
  }
};

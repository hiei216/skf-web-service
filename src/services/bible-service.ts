const url: string =
  "https://api.scripture.api.bible/v1/bibles/c61908161b077c4c-01/verses/";
interface IAPIOptions {
  method: string;
  headers: {
    "api-key": string;
  };
}
const options: IAPIOptions = {
  method: "GET",
  headers: {
    "api-key": "84acb414d4c69514fd7fc7002f5d4db6",
  },
};

export const getBibleVerse = async (bibleVerse: string) => {
  try {
    const response = await fetch(`${url}${bibleVerse}`, options);

    const data = await response.json();
    return data ?? {};
  } catch (error) {
    console.error("Error:", error);
    return {};
  }
};

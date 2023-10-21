export const getRandomNumber = (maxValue: number) => {
  const min = 0;
  const max = Math.floor(maxValue - 1);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

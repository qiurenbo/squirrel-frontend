const random = (range) => {
  return Math.floor(Math.random() * range);
};

const randomYMD = () => {
  const month = random(12) + 1;
  const day = random(28) + 1;
  const year = "2020";

  return (
    year + (month < 10 ? "0" + month : month) + (day < 10 ? "0" + day : day)
  );
};

module.exports = {
  random,
  randomYMD,
};

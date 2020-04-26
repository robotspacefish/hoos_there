const sortAlpha = (array, sortType) => {
  return [...array].sort(function (a, b) {
    const typeA = a[sortType].toUpperCase();
    const typeB = b[sortType].toUpperCase();
    if (typeA < typeB) {
      return -1;
    }
    if (typeA > typeB) {
      return 1;
    }

    // must be equal
    return 0;
  });
};

const sortNumeric = (array, sortType) => {
  return [...array].sort((a, b) => a[sortType] - b[sortType]);
};

const capitalize = str => (
  str.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")
);


export { sortAlpha, sortNumeric, capitalize };

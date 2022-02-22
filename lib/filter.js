import Filter from "bad-words";
const filter = new Filter();

const filterBadWords = str => {
  if (
    !str
      .split("")
      .filter(char => char.match(/^[1-9a-zA-Z]+$/))
      .join("")
  ) {
    return str;
  } else if (
    filter.clean(
      str
        .split("")
        .filter(char => char.match(/^[1-9a-zA-Z]+$/))
        .join("")
    ) !== str
  ) {
    return filter.clean(str);
  } else {
    return str;
  }
};

export default filterBadWords;

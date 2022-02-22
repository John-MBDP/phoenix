import Filter from "bad-words";
const filter = new Filter();

const filterBadWords = (str) => {
  if (str.match(/^[1-9a-zA-Z]+$/)) {
    return filter.clean(str);
  }
  else return str;
}

export default filterBadWords;
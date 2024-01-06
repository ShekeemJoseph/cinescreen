export function reduceLongTitle(str) {
  let longStr;
  if (str.length > 30) {
    longStr = str.slice(0, 30) + "...";
    return longStr;
  } else {
    return str;
  }
}
export function getCurrentYear() {
  const year = new Date().getFullYear();
  return year;
}

export function reduceLongTitle(str) {
  let longStr;
  if (str.length > 30) {
    longStr = str.slice(0, 31) + "...";
    return longStr;
  } else {
    return str;
  }
}

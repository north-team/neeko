export function changeUnderLineToPoint(obj) {
  for (var item in obj) {
    if (item.indexOf("_") !== -1) {
      var newParam = item.replaceAll("__", "-").replaceAll("_", ".");
      obj[newParam] = obj[item];
      delete obj[item];
    }
  }
  return obj;
}

export function changePointToUnderLine(obj) {
  for (var item in obj) {
    if (item.indexOf("-") !== -1 || item.indexOf(".") !== -1) {
      var newParam = item.replaceAll("-", "__").replaceAll(".", "_");
      obj[newParam] = obj[item];
      delete obj[item];
    }
  }
  return obj;
}

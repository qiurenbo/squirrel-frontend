export const assembleRequestUrl = (filter, baseUrl, rel = '') => {
  if (!filter && !rel) {
    return baseUrl;
  } else if (rel) {
    baseUrl += '?' + rel;
  }

  // https://stackoverflow.com/questions/1876485/how-to-iterate-through-property-names-of-javascript-object
  for (var key in filter) {
    if (filter[key]) {
      if (baseUrl.indexOf('?') === -1) {
        baseUrl = baseUrl + '?' + key + '=' + filter[key];
      } else {
        baseUrl = baseUrl + '&' + key + '=' + filter[key];
      }
    }
  }

  return baseUrl;
};

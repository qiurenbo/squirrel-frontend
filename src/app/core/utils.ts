export const assembleRequestUrl = (filter, baseUrl) => {
  if (!filter) {
    return baseUrl;
  }

  // https://stackoverflow.com/questions/1876485/how-to-iterate-through-property-names-of-javascript-object
  let query = '';
  for (var key in filter) {
    if (filter[key]) {
      if (!query) {
        query = '?' + key + '=' + filter[key];
      } else {
        query += '&' + key + '=' + filter[key];
      }
    }
  }

  baseUrl += query;

  return baseUrl;
};

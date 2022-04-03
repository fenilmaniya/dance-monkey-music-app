
const objectEntries = (obj) => Object.entries(obj);

export default objectEntries;


export const encodeParamsForUrl = (params) =>
  objectEntries(params)
    /* Filter out entries with `undefined` values, with type-level recognition.
       (Flow's core definitions treat `.filter(Boolean)` as a special case. See
       https://github.com/facebook/flow/issues/1414 for more information.) */
    .map(([key, value]) => (value === undefined ? null : [key, value]))
    .filter(Boolean)
    /* Encode. */
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`)
    .join('&');
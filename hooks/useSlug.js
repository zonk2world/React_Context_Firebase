import {useCallback} from "react";
import slugify from "slugify";

const useSlugify = () => {
  return useCallback((string) => {
    return slugify(string.replace(/\./g, " "), {
      replacement: '-',  // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true,      // convert to lower case, defaults to `false`
      strict: false,     // strip special characters except replacement, defaults to `false`
      locale: 'de'       // language code of the locale to use
    });
  }, []);
};

export { useSlugify };
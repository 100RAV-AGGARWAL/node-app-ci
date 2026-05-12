import { parseObject, type Schema } from 'jet-validators/utils';

import { ValidationError } from '../../common/utils/route-errors.js';

/******************************************************************************
                              Functions
******************************************************************************/

/**
 * Throw a "ParseObjError" when "parseObject" fails. Also extract a nested
 * "ParseObjError" and add it to the nestedErrors array.
 */
function parseReq<U extends Schema>(schema: U) {
  return parseObject(schema, (errors) => {
    throw new ValidationError(errors);
  });
}

export default parseReq;

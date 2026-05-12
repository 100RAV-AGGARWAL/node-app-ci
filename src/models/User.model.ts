import { isNonEmptyString, isString, isUnsignedInteger } from 'jet-validators';
import { parseObject, type Schema, testObject } from 'jet-validators/utils';

import { transformIsDate } from '../common/utils/validators.js';
import type { Entity } from './common/types.js';

/******************************************************************************
                                 Constants
******************************************************************************/

const GetDefaults = (): IUser => ({
  id: 0,
  name: '',
  email: '',
  created: new Date(),
});

const schema: Schema<IUser> = {
  id: isUnsignedInteger,
  name: isString,
  email: isString,
  created: transformIsDate,
};

/******************************************************************************
                                  Types
******************************************************************************/

/**
 * @entity users
 */
export interface IUser extends Entity {
  name: string;
  email: string;
}

/******************************************************************************
                                  Setup
******************************************************************************/

// Set the "parseUser" function
const parseUser = parseObject<IUser>(schema);

// For the APIs make sure the right fields are complete
const isCompleteUser = testObject<IUser>({
  ...schema,
  name: isNonEmptyString,
  email: isNonEmptyString,
});

/******************************************************************************
                                 Functions
******************************************************************************/

/**
 * New user object.
 */
function new_(user?: Partial<IUser>): IUser {
  return parseUser({ ...GetDefaults(), ...user }, (errors) => {
    throw new Error('Setup new user failed ' + JSON.stringify(errors, null, 2));
  });
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  new: new_,
  isComplete: isCompleteUser,
} as const;

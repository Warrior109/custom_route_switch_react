import pathValidator from './pathValidator';
import deepValidator from './deepValidator';
import findValidChildren from './findValidChildren';

let validators = [pathValidator, deepValidator];

const createValidator = validator => {
  validators.unshift(validator);
};

export { findValidChildren, validators, createValidator };

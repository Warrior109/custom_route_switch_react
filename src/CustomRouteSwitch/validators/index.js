import pathValidator from './pathValidator';

const validators = [pathValidator];

const createValidator = (validator) => {
  validators.unshift(validator);
};

export { validators, createValidator };

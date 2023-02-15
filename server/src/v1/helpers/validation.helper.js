import Joi from 'joi';

const username = body => {
  const schema = Joi.object({
    username: Joi.string().min(4).lowercase().required(),
  });

  return schema.validate(body);
};

const account = body => {
  const schema = Joi.object({
    username: Joi.string().min(4).lowercase().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(body);
};

const changePassword = body => {
  const schema = Joi.object({
    username: Joi.string().min(4).lowercase().required(),
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required(),
  });

  return schema.validate(body);
};

const refreshToken = body => {
  const schema = Joi.object({
    refreshToken: Joi.string().required(),
  });

  return schema.validate(body);
};

const message  = body => {
  const schema = Joi.object({
    content: Joi.string().required(),
  });

  return schema.validate(body);
};

export default {
  username,
  account,
  changePassword,
  refreshToken,
  message
};
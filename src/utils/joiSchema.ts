import Joi from "joi";

export const emailBodySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().min(6).email().required(),
  subject: Joi.string().max(80).required(),
  message: Joi.string().required(),
});

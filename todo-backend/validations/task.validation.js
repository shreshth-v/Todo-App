import Joi from "joi";

export const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  dueDate: Joi.date().required(),
  status: Joi.string().valid("pending", "in progress", "completed").required(),
}).options({ stripUnknown: true });

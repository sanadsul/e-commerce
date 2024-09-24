// validate.js
import Joi from 'joi';


 /* schemaProduct */
const schemaProduct = Joi.object({
    name: Joi.string().min(5).required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    stock: Joi.number().required()
});
const validateProduct = (data) => {
  const { error, value } = schemaProduct.validate(data, { abortEarly: false }); 

  if (error) {
    return { success: false, message: error.details.map(detail => detail.message) }; 
  }

  return { success: true, data: value }; 
};

/* schemaUser register */
const schemaUser = Joi.object({
    username: Joi.string().min(5).required(),
    email: Joi.string().required().empty().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().required().min(6),
    confirmPassword: Joi.string().min(6).required()
});

const validateUser = (data) => {
  const { error, value } = schemaUser.validate(data, { abortEarly: false }); 

  if (error) {
    return { success: false, message: error.details.map(detail => detail.message) }; 
  }

  return { success: true, data: value }; 
};

/* schemaUser login */
const schemauserLogin = Joi.object({
  email: Joi.string().required().empty().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().required().min(6),
});

const validateUserlogin = (data) => {
  const { error, value } = schemauserLogin.validate(data, { abortEarly: false }); 

  if (error) {
    return { success: false, message: error.details.map(detail => detail.message) }; 
  }

  return { success: true, data: value }; 
};

export { validateProduct, validateUser,validateUserlogin };

import joi from 'joi'
import { joiPasswordExtendCore } from 'joi-password'

const joiPassword = joi.extend(joiPasswordExtendCore)

async function SignUpValidation (data) {
  const schema = joi.object({
    firstName: joi
    .string()
    .min(3)
    .required()
    .label('firstName')
    .messages({
      'string.length': 'First name must be atleast 3 characters long',
      'any.required': 'First name is required'
    }),
    lastName: joi
    .string()
    .min(3)
    .required()
    .label('lastName')
    .messages({
      'string.length': 'Last name must be atleast 3 characters long',
      'any.required': 'Last name is required'
    }),
    email: joi
    .string()
    .email()
    .label('email')
    .messages({
      'string.pattern.base': 'Email must be a valid email address',
      'any.required': 'Email is required'
    }),
    phoneNumber: joi
    .string()
    .length(12)
    .pattern(/^\d+$/)
    .required()
    .label('phoneNumber')
    .messages({
      'string.length': 'Phone number must be exactly 12 digits long',
      'string.pattern.base': 'Phone number must only contain numeric digits',
      'any.required': 'Phone number is required'
    }),
    role: joi.string().label('role'),
    organization: joi.string().label('organization'),
    password: joiPassword
      .string()
      .length(5)
      .pattern(/^\d+$/)
      .required()
      .label('password')
      .messages({
        'string.length': 'Password must be exactly 5 digits long',
        'string.pattern.base': 'Password must only contain numeric digits',
        'any.required': 'Password is required'
      })
  })

  return await schema.validate(data, {
    abortEarly: false
  })
}

export default SignUpValidation

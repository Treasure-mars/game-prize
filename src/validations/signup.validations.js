import joi from 'joi'
import { joiPasswordExtendCore } from 'joi-password'

const joiPassword = joi.extend(joiPasswordExtendCore)

async function SignUpValidation (data) {
  const schema = joi.object({
    firstName: joi.string().min(3).required().label('firstName'),
    lastName: joi.string().min(3).required().label('lastName'),
    email: joi.string().email().label('email'),
    phoneNumber: joi.number().required().label('phoneNumber'),
    role: joi.string().label('role'),
    // organization: joi.string().label('organization'),
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

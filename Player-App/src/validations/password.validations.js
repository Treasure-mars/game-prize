import joi from 'joi'

async function PasswordValidation (data) {
  const schema = joi.object({
    newPassword: joi
      .string()
      .length(5)
      .pattern(/^\d+$/)
      .required()
      .label('newPassword')
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

export default PasswordValidation

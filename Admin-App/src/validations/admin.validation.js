import joi from 'joi'

async function AdminValidation (data) {
  const schema = joi.object({
    firstName: joi.string().min(3).required().label('firstName'),
    lastName: joi.string().min(3).required().label('lastName'),
    email: joi.string().email().label('email'),
    phoneNumber: joi.number().required().label('phoneNumber'),
    role: joi.string().label('role'),
    organization: joi.string().label('organization')
  })

  return await schema.validate(data, {
    abortEarly: false
  })
}

export default AdminValidation

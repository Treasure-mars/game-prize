import AdminValidation from '../validations/admin.validation'

export default async function adminValidate (req, res, next) {
  const { body } = req
  const { error } = await AdminValidation(body)

  if (error) {
    const errorMessage = error.details.map(err => err.message).join(' ')
    return res.status(400).json({ status: 'fail', message: errorMessage })
  }
  next()
}

import SignUpValidation from '../validations/signup.validations'

export default async function signupValidate (req, res, next) {
  try{
    const { body } = req
    const { error } = await SignUpValidation(body)
  
    if (error) {
      const errorMessage = error.details.map(err => err.message).join(' ')
      return res
        .status(400)
        .json({ status: 'fail', message: errorMessage })
    }
    next()
  }catch(error){
    return res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
}

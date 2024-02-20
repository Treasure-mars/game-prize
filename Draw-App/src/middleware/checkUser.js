import { users } from '../database/models'

export const checkUserExist = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body
    const user = await users.findOne({
      where: { phoneNumber }
    })
    if (user)
      return res
        .status(400)
        .json({ status: 'fail', message: 'Phone number already exists' })
    next()
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
}

export const checkUser = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body
    const user = await users.findOne({
      where: { phoneNumber }
    })
    if (!user)
      return res
        .status(400)
        .json({ status: 'fail', message: 'Phone number not registered' })
    next()
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
}

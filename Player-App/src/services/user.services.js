import bcrypt from 'bcrypt'
import { users, BannedUsers } from '../database/models'
import dotenv from 'dotenv';
import { Op } from 'sequelize'
import { Jwt } from '../helpers/jwt'

dotenv.config();

const saltRounds = Number(process.env.SALTROUNDS)
class User {
  static reformatPhoneNumber(phoneNumber) {
    const numericDigits = phoneNumber.replace(/\D/g, '');

    if (numericDigits.length < 9) {
      return "Invalid Phone Number";
    }
    const last9Digits = numericDigits.slice(-9);
    const formattedPhoneNumber = `250${last9Digits}`;
    return formattedPhoneNumber;
  }

  static async register(data) {
    data.password = await bcrypt.hash(data.password, saltRounds)
    const { firstName, lastName, email, password, phoneNumber } = data
    const phoneN = User.reformatPhoneNumber(phoneNumber)

    if (email) {
      const emailUser = await users.findOne({
        where: {
          email
        }
      })
      if (emailUser) {
        return { message: 'Email already exists' }
      }
    }


    const existingUser = await BannedUsers.findOne({
      where: {
        phoneNumber: phoneN
      }
    })
    if (existingUser) {
      const user = await users.create({
        userId: existingUser.userId,
        firstName,
        lastName,
        email,
        password,
        phoneNumber: phoneN
      })
      return { data: user }
    } else {
      const user = await users.create({
        firstName,
        lastName,
        email,
        password,
        phoneNumber: phoneN
      })
      return { data: {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber
      }}
    }
  }
  
  static async otProcess(phoneNumber) {
    const user = await users.findOne({ where: { phoneNumber } })
    user.otp = Math.floor(Math.random() * 9000) + 1000
    const timeout = (process.env.MFA_MINS || 3) * 60 * 1000
    user.otpExpiration = new Date(Date.now() + timeout)
    await user.save()
    return { otpCode: user.otp, userId: user.userId }
  }
  
  static async login(data) {
    const { identifier, password } = data

    if (identifier) {
      const identifierUser = await users.findOne({
        where: {
<<<<<<< HEAD:Player-App/src/services/user.services.js
          [Op.or]: [{email: identifier},
            {phoneNumber: identifier}]
=======
            phoneNumber
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/services/admin.services.js
        }
      })
      if (!identifierUser) {
        return { message: 'Wrong username or password' }
      }
      
      const passwordMatch = await bcrypt.compare(password, identifierUser.password);

      if(!identifierUser.isVerified){
        return { message: 'Account not verified' }
      }

      if(!identifierUser.isActive){
        return { message: 'Account is disactivated' }
      }

      if(!passwordMatch){
        return { message: 'Wrong username or password' }
      }

      const bannedUser = await BannedUsers.findOne({
        where: {
          [Op.or]: [{email: identifier},
            {phoneNumber: identifier}]
        }
      })
<<<<<<< HEAD:Player-App/src/services/user.services.js
      if (bannedUser) {
        return { message: 'Your account has been banned, contact system admin' }
      }

      data.userRole = identifierUser.roleId
      data.userId = identifierUser.userId
      identifierUser.isLoggedIn = true
      identifierUser.save()
=======
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/services/admin.services.js
    }

    return { data: {
<<<<<<< HEAD:Player-App/src/services/user.services.js
      identifier: identifier,
      token: token
    }}
  }

  static async verifyOtp(data){
    const { phoneNumber, otp } = data
    if(phoneNumber){
      const identifierUser = await users.findOne({
        where: {
          phoneNumber: phoneNumber
        }
      })
      if (!identifierUser) {
        return { message: 'Wrong phoneNumber' }
      }
      if(identifierUser.isVerified){
        return { message: 'Account is already verified' }
      }
      if(identifierUser.otp!==otp){
        return { message: 'Wrong otp' }
      }else if(identifierUser.otpExpiration < new Date()){
        return { message: 'Otp expired' }
      }
      identifierUser.isVerified = true;
      await identifierUser.save();
      return { data: {
        phoneNumber: phoneNumber
      }}
    }
  }
  
  static async changePassword(data, user){
    // data.oldPassword = await bcrypt.hash(data.oldPassword, saltRounds)
    const { oldPassword, newPassword } = data
    const { identifier } = user
    const identifierUser = await users.findOne({
      where: {
        [Op.or]:[{email: identifier},
        {phoneNumber: identifier}]
      }
    })

    if (!identifierUser) {
      return { message: 'User not found' }
    }
    const passwordMatch = await bcrypt.compare(oldPassword, identifierUser.password);

    if(!passwordMatch){
      return { message: 'Wrong password' }
    }

    identifierUser.password = await bcrypt.hash(newPassword, saltRounds)
    identifierUser.save()

    return { data: {} }
  }

  static async resetPassword(otpCode, newPassword){
    const identifierUser = await users.findOne({
      where: {
        otp: otpCode
      }
    })
    if (!identifierUser) {
      return { message: 'Wrong Otp' }
    }

    identifierUser.password = await bcrypt.hash(newPassword, saltRounds)
    identifierUser.save()

    return { data: {
      phoneNumber: identifierUser.phoneNumber
    } }
  }

  static async getProfile(identifier){
    const identifierUser = await users.findOne({
      where:{
        [Op.or]: [{email: identifier},
          {phoneNumber: identifier}],
        isLoggedIn: true
      }
    })
    if(!identifierUser){
      return { message: "Profile not found" }
    }
    return {data: {
      firstName: identifierUser.firstName,
      lastName: identifierUser.lastName,
      email: identifierUser.email,
      phoneNumber: identifierUser.phoneNumber
    }}
  }

  static async updateProfile(data){
    const { firstName, lastName, email } = data.body
    const { identifier } = data.user
    const identifierUser = await users.findOne({
      where:{
        phoneNumber: identifier,
        isLoggedIn: true
      }
    })
    if(!identifierUser){
      return { message: "Profile not found" }
    }
    if(firstName){
      identifierUser.firstName = firstName
    }
    if(lastName){
      identifierUser.lastName = lastName
    }
    if(email){
      identifierUser.email = email
    }
    await identifierUser.save()
    return {data: {
      firstName: identifierUser.firstName,
      lastName: identifierUser.lastName,
      email: identifierUser.email,
      phoneNumber: identifierUser.phoneNumber
    }}
  }

  static async logout(data) {
    const { identifier } = data

    if (identifier) {
      const identifierUser = await users.findOne({
        where: {
          [Op.or]:[{phoneNumber: identifier}, {email: identifier}],
          isLoggedIn: true
        }
      })
      if (!identifierUser) {
        return { message: 'No one is logged in' }
      }

      identifierUser.isLoggedIn = false
      identifierUser.save()
    }

    return { data: {}}
=======
      identifier: phoneNumber,
      message: 'Account have been banned successfully'
    }}
  }

  static async banUserDel(data){
    const { userId } = data

    if (userId) {
      const user = await BannedUsers.destroy({
        where: {
          userId
        }
      })
      if(user !== 1){
        return { message: 'User not found' }
      }
    }
    return { data: {
      userId: userId,
      message: 'Account have been unbanned successfully'
    }}
  }
  
  static async getBannedUser(page, pageSize){
    const offset = (page - 1) * pageSize

    const allUsersBanned = await BannedUsers.findAll({
      limit: pageSize,
      offset: offset
    });

    if (allUsersBanned.length === 0) {
      return { message: 'No banned users' }
    }
    return { data: { allUsersBanned, msg: 'success' } }
  }

  static async getAllUsers(page, pageSize){
    const offset = (page - 1) * pageSize
    const allUsers = await users.findAll({
      limit: pageSize,
      offset: offset
    });
    if (allUsers.length === 0) {
      return { message: 'No users found' }
    }
    return { data: { Users: allUsers, msg: 'success' } }
  }

  static async deleteUser(data){
    const { userId } = data

    if (userId) {
      const user = await users.destroy({
        where: {
          userId
        }
      })
      if(user !== 1){
        return { message: 'User not found' }
      }
    }
    return { data: {
      userId: userId,
      message: 'User deleted successfully'
    }}
  }

  static async updateUser(params, body){
    const { userId } = params
    const { firstName, lastName, email } = body

    if (userId) {
      const identifierUser = await users.findOne({
        where: {
          userId
        }
      })
      if(!identifierUser){
        return { message: "Profile not found" }
      }
      if(firstName){
        identifierUser.firstName = firstName
      }
      if(lastName){
        identifierUser.lastName = lastName
      }
      if(email){
        identifierUser.email = email
      }
      identifierUser.save()
    }
    return { data: {
      userId: userId,
      message: 'User updated successfully'
    }}
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/services/admin.services.js
  }

  static async getUser(data){
    const { userId } = data
    const user = await users.findOne({
      where: {
        userId
      }
    })
    if (!user) {
      return { message: 'User not found' }
    }
    return { data: { user: user, msg: 'success' } }
  }
}
export default User

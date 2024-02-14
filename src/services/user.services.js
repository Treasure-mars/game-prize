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
      return { data: user }
    }
  }
  
  static async otProcess(phoneNumber) {
    const user = await users.findOne({ where: { phoneNumber } })
    user.otp = Math.floor(Math.random() * 9000) + 1000
    const timeout = (process.env.MFA_MINS || 3) * 60 * 1000
    user.otpExpiration = new Date(Date.now() + timeout)
    await user.save()
    return user.otp
  }
  
  static async login(data) {
    const { identifier, password } = data

    if (identifier) {
      const identifierUser = await users.findOne({
        where: {
          [Op.or]: [{email: identifier},
            {phoneNumber: identifier}]
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
      if (bannedUser) {
        return { message: 'Your account has been banned, contact system admin' }
      }

      data.userRole = identifierUser.roleId
      data.userId = identifierUser.userId
      identifierUser.isLoggedIn = true
      identifierUser.save()
    }
    const token = Jwt.generateToken(data)

    return { data: {
      identifier: identifier,
      token: token,
      message: 'Successfully logged in'
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
      if(identifierUser.otp!==otp){
        return { message: 'Wrong otp' }
      }else if(identifierUser.otpExpiration < new Date()){
        return { message: 'Otp expired' }
      }
      identifierUser.isVerified = true;
      await identifierUser.save();
      return { data: {
        phoneNumber: phoneNumber,
        message: 'Account verified'
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

    return { data: {msg: 'Password updated successfully'} }
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

    return { data: {msg: 'Password updated successfully'} }
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
    return {data:identifierUser}
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
    identifierUser.save()
    return {data: identifierUser}
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

    return { data: {
      message: 'Successfully logged out'
    }}
  }
}
export default User

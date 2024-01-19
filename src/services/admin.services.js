import bcrypt from 'bcrypt'
import { users, BannedUsers } from '../database/models'
import dotenv from 'dotenv';
import { Op } from 'sequelize'
import { Jwt } from '../helpers/jwt'
import { generateRandomPassword } from '../helpers/generatePassword'

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
    const passwordNotEncrypted = generateRandomPassword(5)
    const password = await bcrypt.hash(passwordNotEncrypted, saltRounds)
    const { firstName, lastName, email, organization, phoneNumber, role } = data
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
        organization,
        password,
        role,
        mustChangePassword: true,
        isVerified: true,
        phoneNumber: phoneN
      })
      return { data: user }
    } else {
      const user = await users.create({
        firstName,
        lastName,
        email,
        organization,
        password,
        role,
        mustChangePassword: true,
        isVerified: true,
        phoneNumber: phoneN
      })
      user.passwordNotEncrypted = passwordNotEncrypted
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
  
  static async banUser(data) {
    // data.password = await bcrypt.hash(data.password, saltRounds)
    const { phoneNumber } = data

    if (phoneNumber) {
      const identifierUser = await users.findOne({
        where: {
            phoneNumber: phoneNumber
        }
      })
      if (!identifierUser) {
        return { message: 'User not found' }
      }
      
      const user = await BannedUsers.create({
        userId: identifierUser.userId,
        password: identifierUser.password,
        email: identifierUser.email,
        role: identifierUser.role,
        phoneNumber: identifierUser.phoneNumber
      })
      return { data: user }
    }
    const token = Jwt.generateToken(data)

    return { data: {
      identifier: identifier,
      token: token,
      message: 'Successfully logged in'
    }}
  }

  static async delBanUser(data){
    const { userId } = data

    if (userId) {
      const identifierUser = await users.findOne({
        where: {
            userId: userId
        }
      })
      if (!identifierUser) {
        return { message: 'User not found' }
      }
      
      const user = await BannedUsers.destroy({
        userId: identifierUser.userId,
        password: identifierUser.password,
        email: identifierUser.email,
        role: identifierUser.role,
        phoneNumber: identifierUser.phoneNumber
      })
      return { data: user }
    }
    const token = Jwt.generateToken(data)

    return { data: {
      identifier: identifier,
      token: token,
      message: 'Successfully logged in'
    }}
  }
  
  static async changePassword(data){
    data.oldPassword = await bcrypt.hash(data.oldPassword, saltRounds)
    const { oldPassword, newPassword } = data
    const identifierUser = await users.findOne({
      where: {
        isLoggedIn:true
      }
    })
    if (!identifierUser) {
      return { message: 'No one is logged in' }
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
        otpCode: otpCode
      }
    })
    if (!identifierUser) {
      return { message: 'Wrong Otp' }
    }

    identifierUser.password = await bcrypt.hash(newPassword, saltRounds)
    identifierUser.save()

    return { data: {msg: 'Password updated successfully'} }
  }

  static async profile(identifier){
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

  static async profiles(data){
    const { firstName, lastName, email, identifier } = data
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
          phoneNumber: identifier,
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

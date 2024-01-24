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
    }

    return { data: {
      identifier: phoneNumber,
      message: 'Account have been banned successfully'
    }}
  }

  static async banUserDel(data){
    const { id } = data

    if (id) {
      const user = await BannedUsers.destroy({
        where: {
          userId: id
        }
      })
      if(user !== 1){
        return { message: 'User not found' }
      }
    }
    return { data: {
      userId: id,
      message: 'Account have been unbanned successfully'
    }}
  }
  
  static async getBannedUser(page, pageSize){
    const allUsersBanned = await BannedUsers.findAll({
      limit: pageSize,
    });
    if (allUsersBanned.length === 0) {
      return { message: 'No banned users' }
    }
    return { data: { allUsersBanned, msg: 'success' } }
  }

  static async getAllUsers(page, pageSize){
    const allUsers = await users.findAll({
      limit: pageSize
    });
    if (allUsers.length === 0) {
      return { message: 'No users found' }
    }
    return { data: { Users: allUsers, msg: 'success' } }
  }

  static async deleteUser(data){
    const { id } = data

    if (id) {
      const user = await users.destroy({
        where: {
          userId: id
        }
      })
      if(user !== 1){
        return { message: 'User not found' }
      }
    }
    return { data: {
      userId: id,
      message: 'User deleted successfully'
    }}
  }

  static async updateUser(params, body){
    const { id } = params
    const { firstName, lastName, email } = body

    if (id) {
      const identifierUser = await users.findOne({
        where: {
          userId: id
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
      userId: id,
      message: 'User updated successfully'
    }}
  }

  static async getUser(data){
    const { id } = data
    const user = await users.findOne({
      where: {
        userId: id
      }
    })
    if (!user) {
      return { message: 'User not found' }
    }
    return { data: { user: user, msg: 'success' } }
  }
}
export default User

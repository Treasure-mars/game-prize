import bcrypt from 'bcrypt'
import { users, BannedUsers } from '../database/models'
import dotenv from 'dotenv';
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
      return { data: {
        phoneNumber: user.phoneNumber,
        passwordNotEncrypted
        }
      }
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
            phoneNumber
        }
      })
      if (!identifierUser) {
        return { message: 'User not found' }
      }
      
      await BannedUsers.create({
        userId: identifierUser.userId,
        password: identifierUser.password,
        email: identifierUser.email,
        role: identifierUser.role,
        phoneNumber: identifierUser.phoneNumber
      })
    }

    return { data: {
      phoneNumber
    }}
  }

  static async unbanUser(data){
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
    const identifierUser = await users.findOne({
      where: {
        userId
      },
      attributes: ['firstName', 'lastName', 'email', 'phoneNumber']
    })
    return { data: {
      identifierUser
    }}
  }
  
  static async getAllBannedUsers(page, pageSize){
    if (!page) {
      page = 1; // Default to page 1 if not provided
    }
    if (!pageSize) {
      pageSize = 10; // Default page size if not provided
    }
    const offset = (page - 1) * pageSize

    const allUsersBanned = await BannedUsers.findAll({
      limit: pageSize,
      offset: offset,
      attributes: ['firstName', 'lastName', 'phoneNumber', 'email']
    });

    if (allUsersBanned.length === 0) {
      return { message: 'No banned users' }
    }
    return { data: { allUsersBanned } }
  }

  static async getAllUsers(page, pageSize){
    if (!page) {
      page = 1; // Default to page 1 if not provided
    }
    if (!pageSize) {
      pageSize = 10; // Default page size if not provided
    }
    const offset = (page - 1) * pageSize
    const allUsers = await users.findAll({
      limit: pageSize,
      offset: offset,
      attributes: ['firstName', 'lastName', 'phoneNumber', 'email']
    });
    if (allUsers.length === 0) {
      return { message: 'No users found' }
    }
    return { data: { Users: allUsers } }
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
    return { data: {}}
  }

  static async updateUser(params, body){
    const { userId } = params
    const { firstName, lastName, email } = body

    if (!userId) {
      return { message: "Please provide userId" }
    }
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
    await identifierUser.save()
    return { data: {
      firstName: identifierUser.firstName,
      lastName: identifierUser.lastName,
      email: identifierUser.email,
      phoneNumber: identifierUser.phoneNumber
    }}
  }

  static async getUserById(data){
    const { userId } = data
    const user = await users.findOne({
      where: {
        userId
      },
      attributes: ['firstName', 'lastName', 'phoneNumber', 'email']
    })
    if (!user) {
      return { message: 'User not found' }
    }
    return { data: { user } }
  }
}
export default User

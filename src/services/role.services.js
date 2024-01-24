import { Role } from '../database/models'
import dotenv from 'dotenv';
import { Op } from 'sequelize'
import { Jwt } from '../helpers/jwt'
import { generateRandomPassword } from '../helpers/generatePassword'

dotenv.config();

const saltRounds = Number(process.env.SALTROUNDS)
class Roles {
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
    const { name, description } = data

    if (name) {
      const roleUser = await Role.findOne({
        where: {
            name
        }
      })
      if (roleUser) {
        return { message: 'Role name already exists' }
      }
    }

    const roleCreated = await Role.create({
        name,
        description
      })
      return { data: roleCreated }
  }
 
  static async getAllRoles(){
    const allRoles = await Role.findAll()
    if (allRoles.length === 0) {
      return { message: 'No users found' }
    }
    return { data: { roles: allRoles, msg: 'success' } }
  }

  static async deleteRole(data){
    const { id } = data

    if (id) {
      const role = await Role.destroy({
        where: {
          roleId: id
        }
      })
      if(role !== 1){
        return { message: 'Role not found' }
      }
    }
    return { data: {
      roleId: id,
      message: 'Role deleted successfully'
    }}
  }

  static async deleteAllRoles(){
    const { id } = data

    if (id) {
      const role = await Role.destroy({where: {}})
      if(role !== 1){
        return { message: 'Role not found' }
      }
    }
    return { data: {
      roleId: id,
      message: 'Role deleted successfully'
    }}
  }

  static async updateRole(params, body){
    const { id } = params
    const { name, description } = body

    if (id) {
      const roleUser = await Role.findOne({
        where: {
          roleId: id
        }
      })
      if (!roleUser) {
        return { message: 'Role name not found' }
      }
      if(name){
        roleUser.name = name
      }
      if(description){
        roleUser.description = description
      }
      roleUser.save()
    }
    return { data: {
      roleId: id,
      message: 'Role updated successfully'
    }}
  }

  static async getRole(data){
    const { id } = data
    const role = await Role.findOne({
      where: {
        roleId: id
      }
    })
    if (!role) {
      return { message: 'Role not found' }
    }
    return { data: { role: role, msg: 'success' } }
  }
}
export default Roles

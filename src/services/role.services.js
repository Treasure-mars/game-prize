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
 
  static async getAllRoles(page, pageSize){
    const offset = (page - 1) * pageSize
    const allRoles = await Role.findAll({
      limit: pageSize,
      offset: offset
    })
    if (allRoles.length === 0) {
      return { message: 'No users found' }
    }
    return { data: { roles: allRoles, msg: 'success' } }
  }

  static async deleteRole(data){
    const { roleId } = data

    if (roleId) {
      const role = await Role.destroy({
        where: {
          roleId
        }
      })
      if(role !== 1){
        return { message: 'Role not found' }
      }
    }
    return { data: {
      roleId: roleId,
      message: 'Role deleted successfully'
    }}
  }

  static async deleteAllRoles(){
    await Role.destroy({where: {}})
    return { data: {
      message: 'All roles deleted successfully'
    }}
  }

  static async updateRole(params, body){
    const { roleId } = params
    const { name, description } = body

    if (roleId) {
      const roleUser = await Role.findOne({
        where: {
          roleId
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
      roleId: roleId,
      message: 'Role updated successfully'
    }}
  }

  static async getRole(data){
    const { roleId } = data
    const role = await Role.findOne({
      where: {
        roleId
      }
    })
    if (!role) {
      return { message: 'Role not found' }
    }
    return { data: { role: role, msg: 'success' } }
  }
}
export default Roles

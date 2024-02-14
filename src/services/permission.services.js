import { Permission } from '../database/models'
import dotenv from 'dotenv';
import { Op } from 'sequelize'
import { Jwt } from '../helpers/jwt'
import { generateRandomPassword } from '../helpers/generatePassword'

dotenv.config();

const saltRounds = Number(process.env.SALTROUNDS)
class permissions {
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
      const permissionRole = await Permission.findOne({
        where: {
            name
        }
      })
      if (permissionRole) {
        return { message: 'Permission name already exists' }
      }
    }

    const permissionCreated = await Permission.create({
        name,
        description
      })
      return { data: permissionCreated }
  }
 
  static async getAllPermissions(page, pageSize){
    const offset = (page - 1) * pageSize
    const allPermissions = await Permission.findAll({
      limit: pageSize,
      offset: offset
    })
    if (allPermissions.length === 0) {
      return { message: 'No permissions found' }
    }
    return { data: { allPermissions, msg: 'success' } }
  }

  static async deletePermission(data){
    const { permissionId } = data

    if (permissionId) {
      const permission = await Permission.destroy({
        where: {
          permissionId
        }
      })
      if(permission !== 1){
        return { message: 'Permission not found' }
      }
    }
    return { data: {
        permissionId: permissionId,
      message: 'Permission deleted successfully'
    }}
  }

  static async deleteAllPermissions(){
    await Permission.destroy({where: {}})
    return { data: {
      message: 'All permissions deleted successfully'
    }}
  }

  static async updatePermission(params, body){
    const { permissionId } = params
    const { name, description } = body

    if (permissionId) {
      const permissionRole = await Permission.findOne({
        where: {
          permissionId
        }
      })
      if (!permissionRole) {
        return { message: 'Permission name not found' }
      }
      if(name){
        permissionRole.name = name
      }
      if(description){
        permissionRole.description = description
      }
      permissionRole.save()
    }
    return { data: {
      permissionId: permissionId,
      message: 'Permission updated successfully'
    }}
  }

  static async getPermission(data){
    const { permissionId } = data
    const permission = await Permission.findOne({
      where: {
        permissionId
      }
    })
    if (!permission) {
      return { message: 'Permission not found' }
    }
    return { data: { permission, msg: 'success' } }
  }
}
export default permissions

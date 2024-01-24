import { Permission } from '../database/models'
import dotenv from 'dotenv';
import { Op } from 'sequelize'
import { Jwt } from '../helpers/jwt'
import { generateRandomPassword } from '../helpers/generatePassword'

dotenv.config();

const saltRounds = Number(process.env.SALTROUNDS)
class Permissions {
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
 
  static async getAllPermissions(){
    const allPermissions = await Permission.findAll()
    if (allPermissions.length === 0) {
      return { message: 'No permissions found' }
    }
    return { data: { allPermissions, msg: 'success' } }
  }

  static async deletePermission(data){
    const { id } = data

    if (id) {
      const permission = await Permission.destroy({
        where: {
          permissionId: id
        }
      })
      if(permission !== 1){
        return { message: 'Permission not found' }
      }
    }
    return { data: {
        permissionId: id,
      message: 'Permission deleted successfully'
    }}
  }

  static async updatePermission(params, body){
    const { id } = params
    const { name, description } = body

    if (id) {
      const permissionRole = await Permission.findOne({
        where: {
          permissionId: id
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
      permissionId: id,
      message: 'Permission updated successfully'
    }}
  }

  static async getPermission(data){
    const { id } = data
    const permission = await Permission.findOne({
      where: {
        permissionId: id
      }
    })
    if (!permission) {
      return { message: 'Permission not found' }
    }
    return { data: { permission, msg: 'success' } }
  }
}
export default Permissions

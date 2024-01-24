import { RolePermissions } from '../database/models'
import dotenv from 'dotenv';
import { Op } from 'sequelize'
import { Jwt } from '../helpers/jwt'
import { generateRandomPassword } from '../helpers/generatePassword'

dotenv.config();

const saltRounds = Number(process.env.SALTROUNDS)
class rolePermissions {
  static async addRolePermission(role, data) {
    const { permissionId } = data
    const { roleId } = role
    if (permissionId && roleId) {
      const rolePermissionFound = await RolePermissions.findOne({
        where: {
          roleId: roleId,
          permissionId: permissionId
        }
      })
      if (rolePermissionFound) {
        await RolePermissions.destroy({
          where: {
            roleId,
            permissionId
          }
        })
        return { message: "Role permission deleted successfully" }
      }
      const rolePermissionCreated = await RolePermissions.create({
        roleId,
        permissionId
      })
      return { data: rolePermissionCreated }
    }
  }
 
  static async getAllRolePermissions(){
    const allRolePermissions = await RolePermissions.findAll()
    if (allRolePermissions.length === 0) {
      return { message: 'No permissions found' }
    }
    return { data: { allRolePermissions, msg: 'success' } }
  }

  static async deleteRolePermissions(data){
    const { id } = data

    if (id) {
      const permission = await RolePermissions.destroy({
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

  static async deleteAllRolePermissions(){
    await RolePermissions.destroy({where: {}})
    return { data: {
      message: 'All permissions deleted successfully'
    }}
  }

  static async updateRolePermissions(params, body){
    const { id } = params
    const { name, description } = body

    if (id) {
      const permissionRole = await RolePermissions.findOne({
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

  static async getRolePermissions(data){
    const { id } = data
    const permission = await RolePermissions.findOne({
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
export default rolePermissions

import { RolePermission, Role, Permission, sequelize } from '../database/models'
import dotenv from 'dotenv';
import { Op } from 'sequelize'
import { Jwt } from '../helpers/jwt'
import { generateRandomPassword } from '../helpers/generatePassword'

dotenv.config();

const saltRounds = Number(process.env.SALTROUNDS)
class rolePermissions {
  static async addRolePermission(params, body) {
    try{  
      const { roleId } = params
      const { permissionId } = body
      let role = await Role.findByPk(roleId);
      let permission = await Permission.findByPk(permissionId);
      if(!role) {
        return { message: 'Role not found' };
      }
      if (!permission) {
        return { message: "Permission not found!" }
      }
      //populate GroupUser join table
      const rolePermissionCreated = await RolePermission.create({
        role,
        permission
      })
      
      return { data: { rolePermissionCreated, msg: 'success' } };
    } catch (error) {
      console.log('Error on adding role permissions: ', error);
      return { status: 'error', error: error.message };
    }
  }
 
  static async getAllRolePermissions(params) {
    try {
      const { roleId } = params;
  
      // Find the role by roleId
      const role = await Role.findByPk(roleId, {
        include: [
          {
            model: Permissions,
            as: 'rolePermissions', // This should match the alias used in Role model
            through: { attributes: [] }, // To exclude RolePermissions from the result
          },
        ],
      });
  
      if (!role) {
        return { message: 'Role not found' };
      }
  
      const permissions = role.rolePermissions;
  
      if (permissions.length === 0) {
        return { message: 'No permissions found for the role' };
      }
  
      return { data: { permissions, msg: 'success' } };
    } catch (error) {
      console.log('Error on getting all roles permissions: ', error);
      return { status: 'error', error: error.message };
    }
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

  static async getRolePermissions(params){
    try {
      const { roleId, permissionId } = params;
  
      // Find the role by roleId
      const role = await Role.findByPk(roleId, {
        include: [
          {
            model: Permissions,
            as: 'rolePermissions',
            through: { attributes: [] },
            where: {
              permissionId
            }
          },
        ],
      });
  
      if (!role) {
        return { message: 'Role not found' };
      }
  
      const permissions = role.rolePermissions;
  
      if (permissions.length === 0) {
        return { message: 'No permissions found for the role' };
      }
  
      return { data: { permissions, msg: 'success' } };
    } catch (error) {
      console.log('Error on getting role permissions: ', error);
      return { status: 'error', error: error.message };
    }
  }
}
export default rolePermissions

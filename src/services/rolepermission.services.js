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
        roleId: role.roleId,
        permissionId: permission.permissionId,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }, {
        returning: ['roleId', 'permissionId', 'createdAt', 'updatedAt']
      })
      return { data: { rolePermissionCreated, msg: 'success' } };
    } catch (error) {
      console.log('Error on adding role permissions: ', error);
      return { status: 'error', message: error.message };
    }
  }

  static async getAllRolePermissions(params) {
    try {
      const { roleId } = params;
  
      // Find the role by roleId
      const role = await Role.findByPk(roleId, {
        include: [
          {
            model: Permission,
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

  static async deleteRolePermissions(params, body){
    const { roleId } = params
    const { permissionIds } = body

    if(!roleId){
      return { message: 'Please provide roleId' }
    }

    const rolePermissionPromises = permissionIds.map(async (permission_id) => {
      try {
        const rolePermissionFound = await RolePermission.findOne({
          where: {
            roleId: roleId,
            permissionId: permission_id
          },
          attributes: ['roleId', 'permissionId']
        })

        if (!rolePermissionFound) {
          return { message: `Role with id ${roleId} doesn't have this permission with id ${permission_id}` };
        }
    
        const rolePermissionDeleted = await RolePermission.destroy({
          where: {
            roleId: roleId,
            permissionId: permission_id
          }
        });

        if(rolePermissionDeleted == 1){
          return {
            message: `Permission with id ${permission_id} removed for role ${roleId}`
          }
        }
    
        return rolePermissionDeleted;
      } catch (error) {
        console.error(`Error deleting role permission for permission_id ${permission_id}:`, error);
        return { error: error.message };
      }
    });
    
    const deletedRolePermissions = await Promise.all(rolePermissionPromises);
    return { data: {
      deletedRolePermissions
    }}
  }

  static async deleteAllRolePermissions(params){
    await RolePermission.destroy({where: {
      roleId: params.roleId
    }})
    return { data: {
      msg: `All permissions deleted successfully for role with id ${params.roleId}`
    }}
  }

  static async updateRolePermissions(params, body){
    const { roleId } = params
    const { permission_ids } = body

    if(!roleId){
      return { message: 'Please provide roleId' }
    }

    let role = await Role.findByPk(roleId);
    if(!role) {
      return { message: 'Role not found' };
    }

    const rolePermissionPromises = permission_ids.map(async (permission_id) => {
      try {
        const permission = await Permission.findByPk(permission_id);
        if (!permission) {
          return { message: `Permission not found with id ${permission_id}` };
        }
    
        const rolePermissionCreated = await RolePermission.create({
          roleId: roleId,
          permissionId: permission.permissionId,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }, {
          returning: ['roleId', 'permissionId', 'createdAt', 'updatedAt'],
        });
    
        return rolePermissionCreated;
      } catch (error) {
        console.error(`Error creating role permission for permission_id ${permission_id}:`, error);
        return { error: error.message };
      }
    });
    
    const createdRolePermissions = await Promise.all(rolePermissionPromises);
    return { data: {
      createdRolePermissions
    }}
  }

  static async getRolePermissions(params){
    try {
      const { roleId, permissionId } = params;
  
      // Find the role by roleId
      const role = await Role.findByPk(roleId, {
        include: [
          {
            model: Permission,
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

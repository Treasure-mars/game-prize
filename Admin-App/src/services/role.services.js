import { Role } from '../database/models'

class Roles {
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
      return { data: {
        name: roleCreated.name,
        description: roleCreated.description,
      }}
  }
 
  static async getAllRoles(page, pageSize){
    if (!page) {
      page = 1; // Default to page 1 if not provided
    }
    if (!pageSize) {
      pageSize = 10; // Default page size if not provided
    }
    const offset = (page - 1) * pageSize
    const allRoles = await Role.findAll({
      limit: pageSize,
      offset: offset,
      attributes: ['name', 'description']
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
    return { data: {}}
  }

  static async deleteAllRoles(){
    await Role.destroy({where: {}})
    return { data: {}}
  }

  static async updateRole(params, body){
    const { roleId } = params
    const { name, description } = body

    if (!roleId) {
      return { message: "Please provide roleId" }
    }
    const roleUser = await Role.findOne({
      where: {
        roleId
      }
    })
    if (!roleUser) {
      return { message: 'Role not found' }
    }
    if(name){
      roleUser.name = name
    }
    if(description){
      roleUser.description = description
    }
    await roleUser.save()
    return { data: {
      name: roleUser.name,
      description: roleUser.description,
    }}
  }

  static async getRole(data){
    const { roleId } = data
    const role = await Role.findOne({
      where: {
        roleId
      },
      attributes: ['name', 'description']
    })
    if (!role) {
      return { message: 'Role not found' }
    }
    return { data: { role: role, msg: 'success' } }
  }
}
export default Roles

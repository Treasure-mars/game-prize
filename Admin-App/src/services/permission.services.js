import { Permission } from '../database/models'

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
      return { data: {
        name: permissionCreated.name,
        description: permissionCreated.description 
      }}
  }
 
  static async getAllPermissions(page, pageSize){
    if (!page) {
      page = 1; // Default to page 1 if not provided
    }
    if (!pageSize) {
      pageSize = 10; // Default page size if not provided
    }
    const offset = (page - 1) * pageSize
    const allPermissions = await Permission.findAll({
      limit: pageSize,
      offset: offset,
      attributes: ['name', 'description']
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
    return { data: {}}
  }

  static async deleteAllPermissions(){
    await Permission.destroy({where: {}})
    return { data: {}}
  }

  static async updatePermission(params, body){
    const { permissionId } = params
    const { name, description } = body

    if (!permissionId) {
      return { message: 'Please provide permissionId' }
    }
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
    await permissionRole.save()
    return { data: {
      name: permissionRole.name,
      description: permissionRole.description 
    }}
  }

  static async getPermission(data){
    const { permissionId } = data
    const permission = await Permission.findOne({
      where: {
        permissionId
      },
      attributes: ['name', 'description']
    })
    if (!permission) {
      return { message: 'Permission not found' }
    }
    return { data: { permission, msg: 'success' } }
  }
}
export default permissions

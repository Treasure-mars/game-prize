import { Role, Permission, sequelize } from '../database/models'
export default function checkRole (permissionName) {
  return async (req, res, next) => {
    try {
      const userRoleId = req.user.role;
      const permission = await Permission.findOne({
        where: {
          name: permissionName
        }
      })
      if(!permission){
        return res
          .status(404)
          .json({ status: 'fail', message: 'Permission not found' })
      }
      const permissionId = permission.permissionId
      const rolePermission = await Role.findByPk(userRoleId, {
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
  
      if (!rolePermission) {
        return res
          .status(403)
          .json({ status: 'fail', message: 'Access Denied' })
      }
      next()
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message
      })
    }
  }
}

export function checkPlayer () {
  return async (req, res, next) => {
    try {
      const userRole = req.user.role
      if (userRole === 'player') {
        return res
          .status(403)
          .json({ status: 'fail', message: 'Access Denied' })
      }
      next()
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message
      })
    }
  }
}

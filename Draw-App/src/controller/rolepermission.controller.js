import rolePermissions from "../services/rolepermission.services";

const { SMS_TOPIC } = process.env;
class RolePermission {
  static async addRolePermission(req, res) {
    try {
      const { data, message } = await rolePermissions.addRolePermission(req.params, req.body);
      if (message) {
        return res.status(400).json({
          status: "fail",
          message,
        });
      }
      const { permissionId, roleId } = data;
      if (permissionId) {
        return res.status(200).json({
          status: "success",
          data
        });
      }else{
        return res.status(200).json({
          status: "success",
          data
        });
      }
    } catch (error) {
      console.log(`Error on registering adding permission for role with id : ${req.params.roleId}`, error);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async deleteAllRolePermissions(req,res){
    try {
      const { data, message } = await rolePermissions.deleteAllRolePermissions(req.params)
      if(message){
        return res.status(404).json({
          status: 'fail',
          message
        })
      }
      const { msg } = data
      if(msg){
        return res.status(200).json({
          status: 'success',
          data
        });
      }
    } catch (error) {
      console.log(`Error on deleting all role's permissions for role with id : ${req.params.roleId}`, error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }

  static async getAllRolePermissions(req,res){
    try {
      const { page, pageSize } = req.query;
      const { data, message } = await rolePermissions.getAllRolePermissions(req.params, page, pageSize)
      if(message){
        return res.status(404).json({
          status: 'fail',
          message
        })
      }
      const { msg } = data
      if(msg){
        return res.status(200).json({
          status: 'success',
          data
        });
      }
    } catch (error) {
      console.log(`Error on getting all role's permissions for role with id : ${req.params.roleId}`, error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }
  static async getRolePermission(req,res){
    try{
      const {data, message} = await rolePermissions.getRolePermission(req.params)
      if(message){
        return res.status(404).json({
          status: 'fail',
          message
        });
      }
      const {permissions} = data
      if(permissions){
        return res.status(200).json({
        status: 'success',
        data
      });
      }
    } catch (error) {
      console.log(`Error on getting permission ${req.params.permissionId} for role with id : ${req.params.roleId}`, error);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async updateRolePermissions(req,res){
    try{
      const {data, message} = await rolePermissions.updateRolePermissions(req.params, req.body)
      if(message){
        return res.status(404).json({
          status: 'fail',
          message
        });
      }
      const {createdRolePermissions} = data
      if(createdRolePermissions){
        return res.status(200).json({
        status: 'success',
        data
      });
      }
    } catch (error) {
      console.log("Error on updating user role: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async deleteRolePermissions(req,res){
    try{
      const {data, message} = await rolePermissions.deleteRolePermissions(req.params, req.body)
      if(message){
        return res.status(404).json({
          status: 'fail',
          message
        });
      }
      const {deletedRolePermissions} = data
      if(deletedRolePermissions){
        return res.status(200).json({
        status: 'success',
        data
      });
      }
    } catch (error) {
      console.log("Error on deleting user role: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}
export default RolePermission;

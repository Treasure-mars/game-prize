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
          message: `New permission with id ${permissionId} created for role ${roleId}`,
        });
      }
    } catch (error) {
      console.log("Error on registering altering permission: ", error);
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }

  static async deleteAllRolePermissions(req,res){
    try {
      const { data, message } = await rolePermissions.deleteAllRolePermissions()
      if(message){
        return res.status(404).json({message})
      }
      const { msg } = data
      if(msg){
        return res.status(200).json(data)
      }
    } catch (error) {
      console.log("Error on deleting all role's permissions in: ", error);
      return res.status(500).json({
        status: "error",
        error: error.message
      });
    }
  }

  static async getAllRolePermissions(req,res){
    try {
      const { data, message } = await rolePermissions.getAllRolePermissions(req.params)
      if(message){
        return res.status(404).json({message})
      }
      const { msg } = data
      if(msg){
        return res.status(200).json(data)
      }
    } catch (error) {
      console.log("Error on getting all user's permissions in: ", error);
      return res.status(500).json({
        status: "error",
        error: error.message
      });
    }
  }
  static async getRolePermissions(req,res){
    try{
      const {data, message} = await rolePermissions.getRolePermissions(req.params)
      if(message){
        return res.status(404).json({
          message
        });
      }
      const {permissions} = data
      if(permissions){
        return res.status(200).json(data);
      }
    } catch (error) {
      console.log("Error on getting role permission: ", error);
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }

  static async updateRolePermissions(req,res){
    try{
      const {data, message} = await rolePermissions.updateRolePermissions(req.params, req.body)
      if(message){
        return res.status(404).json({
          message
        });
      }
      const {permissionId} = data
      if(permissionId){
        return res.status(200).json(data);
      }
    } catch (error) {
      console.log("Error on updating user role: ", error);
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }

  static async deleteRolePermissions(req,res){
    try{
      const {data, message} = await rolePermissions.deleteRolePermissions(req.params)
      if(message){
        return res.status(404).json({
          message
        });
      }
      const {permissionId} = data
      if(permissionId){
        return res.status(200).json(data);
      }
    } catch (error) {
      console.log("Error on deleting role permission: ", error);
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }
}
export default RolePermission;

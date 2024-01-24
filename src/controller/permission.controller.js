import Permissions from "../services/permission.services";

const { SMS_TOPIC } = process.env;
class Permission {
  static async register(req, res) {
    try {
      const { data, message } = await Permissions.register(req.body);
      if (message) {
        return res.status(400).json({
          status: "fail",
          message,
        });
      }
      const { permissionId, name } = data;
      if (permissionId) {
        return res.status(200).json({
          status: "success",
          message: `New role ${name} created with identification ${permissionId}`,
        });
      }
    } catch (error) {
      console.log("Error on registering permission: ", error);
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }

  static async getAllPermissions(req,res){
    try {
      const { data, message } = await Permissions.getAllPermissions()
      if(message){
        return res.status(404).json({message})
      }
      const { msg } = data
      console.log(data);
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
  static async getPermission(req,res){
    try{
      const {data, message} = await Permissions.getPermission(req.params)
      if(message){
        return res.status(404).json({
          message
        });
      }
      const {permission} = data
      if(permission){
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

  static async updatePermission(req,res){
    try{
      const {data, message} = await Permissions.updatePermission(req.params, req.body)
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

  static async deletePermission(req,res){
    try{
      const {data, message} = await Permissions.deletePermission(req.params)
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
export default Permission;

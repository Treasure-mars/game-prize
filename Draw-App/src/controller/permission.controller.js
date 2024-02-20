import permissions from "../services/permission.services";

const { SMS_TOPIC } = process.env;
class Permission {
  static async register(req, res) {
    try {
      const { data, message } = await permissions.register(req.body);
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
          data
        });
      }
    } catch (error) {
      console.log("Error on registering permission: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async deleteAllPermissions(req,res){
    try {
      const { data, message } = await permissions.deleteAllPermissions()
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
      console.log("Error on deleting all role's permissions in: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }

  static async getAllPermissions(req,res){
    try {
      const { page, pageSize } = req.query;
      const { data, message } = await permissions.getAllPermissions(page, pageSize)
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
      console.log("Error on getting all user's permissions in: ", error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/permission.controller.js
        message: error.message
=======
        error: error.message
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/permission.controller.js
      });
    }
  }
  static async getPermission(req,res){
    try{
      const {data, message} = await permissions.getPermission(req.params)
      if(message){
        return res.status(404).json({
<<<<<<< HEAD:Draw-App/src/controller/permission.controller.js
          status: 'fail',
=======
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/permission.controller.js
          message
        });
      }
      const {permission} = data
      if(permission){
<<<<<<< HEAD:Draw-App/src/controller/permission.controller.js
        return res.status(200).json({
          status: 'success',
          data
        });
=======
        return res.status(200).json(data);
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/permission.controller.js
      }
    } catch (error) {
      console.log(`Error on getting role permission with id : ${req.params.permissionId}`, error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/permission.controller.js
        message: error.message,
=======
        error: error.message,
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/permission.controller.js
      });
    }
  }

  static async updatePermission(req,res){
    try{
      const {data, message} = await permissions.updatePermission(req.params, req.body)
      if(message){
        return res.status(404).json({
<<<<<<< HEAD:Draw-App/src/controller/permission.controller.js
          status: 'fail',
=======
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/permission.controller.js
          message
        });
      }
      const {permissionId} = data
      if(permissionId){
<<<<<<< HEAD:Draw-App/src/controller/permission.controller.js
        return res.status(200).json({
          status: 'success',
          data
        });
=======
        return res.status(200).json(data);
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/permission.controller.js
      }
    } catch (error) {
      console.log(`Error on updating role permission with id : ${req.params.permissionId}`, error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/permission.controller.js
        message: error.message,
=======
        error: error.message,
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/permission.controller.js
      });
    }
  }

  static async deletePermission(req,res){
    try{
      const {data, message} = await permissions.deletePermission(req.params)
      if(message){
        return res.status(404).json({
<<<<<<< HEAD:Draw-App/src/controller/permission.controller.js
          status: 'fail',
=======
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/permission.controller.js
          message
        });
      }
      const {permissionId} = data
      if(permissionId){
<<<<<<< HEAD:Draw-App/src/controller/permission.controller.js
        return res.status(200).json({
          status: 'success',
          data
        });
=======
        return res.status(200).json(data);
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/permission.controller.js
      }
    } catch (error) {
      console.log(`Error on deleting role permission with id : ${req.params.permissionId}`, error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/permission.controller.js
        message: error.message,
=======
        error: error.message,
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/permission.controller.js
      });
    }
  }
}
export default Permission;

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
<<<<<<< HEAD:Draw-App/src/controller/rolepermission.controller.js
          data
=======
          message: `New permission with id ${permissionId} created for role ${roleId}`,
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/rolepermission.controller.js
        });
      }else{
        return res.status(200).json({
          status: "success",
<<<<<<< HEAD:Draw-App/src/controller/rolepermission.controller.js
          data
=======
          message: `New permission with id ${req.body.permissionId} created for role ${req.params.roleId}`,
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/rolepermission.controller.js
        });
      }
    } catch (error) {
      console.log(`Error on registering adding permission for role with id : ${req.params.roleId}`, error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/rolepermission.controller.js
        message: error.message,
=======
        error: error.message,
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/rolepermission.controller.js
      });
    }
  }

  static async deleteAllRolePermissions(req,res){
    try {
      const { data, message } = await rolePermissions.deleteAllRolePermissions(req.params)
      if(message){
<<<<<<< HEAD:Draw-App/src/controller/rolepermission.controller.js
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
=======
        return res.status(404).json({message})
      }
      const { msg } = data
      if(msg){
        return res.status(200).json(data)
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/rolepermission.controller.js
      }
    } catch (error) {
      console.log(`Error on deleting all role's permissions for role with id : ${req.params.roleId}`, error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/rolepermission.controller.js
        message: error.message
=======
        error: error.message
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/rolepermission.controller.js
      });
    }
  }

  static async getAllRolePermissions(req,res){
    try {
      const { page, pageSize } = req.query;
      const { data, message } = await rolePermissions.getAllRolePermissions(req.params, page, pageSize)
      if(message){
<<<<<<< HEAD:Draw-App/src/controller/rolepermission.controller.js
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
=======
        return res.status(404).json({message})
      }
      const { msg } = data
      if(msg){
        return res.status(200).json(data)
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/rolepermission.controller.js
      }
    } catch (error) {
      console.log(`Error on getting all role's permissions for role with id : ${req.params.roleId}`, error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/rolepermission.controller.js
        message: error.message
=======
        error: error.message
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/rolepermission.controller.js
      });
    }
  }
  static async getRolePermission(req,res){
    try{
      const {data, message} = await rolePermissions.getRolePermission(req.params)
      if(message){
        return res.status(404).json({
<<<<<<< HEAD:Draw-App/src/controller/rolepermission.controller.js
          status: 'fail',
=======
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/rolepermission.controller.js
          message
        });
      }
      const {permissions} = data
      if(permissions){
<<<<<<< HEAD:Draw-App/src/controller/rolepermission.controller.js
        return res.status(200).json({
        status: 'success',
        data
      });
=======
        return res.status(200).json(data);
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/rolepermission.controller.js
      }
    } catch (error) {
      console.log(`Error on getting permission ${req.params.permissionId} for role with id : ${req.params.roleId}`, error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/rolepermission.controller.js
        message: error.message,
=======
        error: error.message,
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/rolepermission.controller.js
      });
    }
  }

  static async updateRolePermissions(req,res){
    try{
      const {data, message} = await rolePermissions.updateRolePermissions(req.params, req.body)
      if(message){
        return res.status(404).json({
<<<<<<< HEAD:Draw-App/src/controller/rolepermission.controller.js
          status: 'fail',
=======
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/rolepermission.controller.js
          message
        });
      }
      const {createdRolePermissions} = data
      if(createdRolePermissions){
<<<<<<< HEAD:Draw-App/src/controller/rolepermission.controller.js
        return res.status(200).json({
        status: 'success',
        data
      });
=======
        return res.status(200).json(data);
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/rolepermission.controller.js
      }
    } catch (error) {
      console.log("Error on updating user role: ", error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/rolepermission.controller.js
        message: error.message,
=======
        error: error.message,
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/rolepermission.controller.js
      });
    }
  }

  static async deleteRolePermissions(req,res){
    try{
      const {data, message} = await rolePermissions.deleteRolePermissions(req.params, req.body)
      if(message){
        return res.status(404).json({
<<<<<<< HEAD:Draw-App/src/controller/rolepermission.controller.js
          status: 'fail',
=======
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/rolepermission.controller.js
          message
        });
      }
      const {deletedRolePermissions} = data
      if(deletedRolePermissions){
<<<<<<< HEAD:Draw-App/src/controller/rolepermission.controller.js
        return res.status(200).json({
        status: 'success',
        data
      });
=======
        return res.status(200).json(data);
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/rolepermission.controller.js
      }
    } catch (error) {
      console.log("Error on deleting user role: ", error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/rolepermission.controller.js
        message: error.message,
=======
        error: error.message,
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/rolepermission.controller.js
      });
    }
  }
}
export default RolePermission;

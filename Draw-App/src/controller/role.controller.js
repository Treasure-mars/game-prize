import Roles from "../services/role.services";

const { SMS_TOPIC } = process.env;
class Role {
  static async register(req, res) {
    try {
      const { data, message } = await Roles.register(req.body);
      if (message) {
        return res.status(400).json({
          status: "fail",
          message,
        });
      }
      const { roleId, name } = data;
      if (roleId) {
        return res.status(200).json({
          status: "success",
<<<<<<< HEAD:Draw-App/src/controller/role.controller.js
          data
=======
          message: `New role ${name} created with identification ${roleId}`,
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/role.controller.js
        });
      }
    } catch (error) {
      console.log("Error on registering role: ", error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/role.controller.js
        message: error.message,
=======
        error: error.message,
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/role.controller.js
      });
    }
  }

  static async getAllRoles(req,res){
    try {
      const { page, pageSize } = req.query;
      const { data, message } = await Roles.getAllRoles(page, pageSize)
      if(message){
<<<<<<< HEAD:Draw-App/src/controller/role.controller.js
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
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/role.controller.js
      }
    } catch (error) {
      console.log("Error on getting all user's roles in: ", error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/role.controller.js
        message: error.message
=======
        error: error.message
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/role.controller.js
      });
    }
  }

  static async deleteAllRoles(req,res){
    try {
      const { data, message } = await Roles.deleteAllRoles()
      if(message){
<<<<<<< HEAD:Draw-App/src/controller/role.controller.js
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
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/role.controller.js
      }
    } catch (error) {
      console.log("Error on deleting all user's roles in: ", error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/role.controller.js
        message: error.message
=======
        error: error.message
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/role.controller.js
      });
    }
  }

  static async getRole(req,res){
    try{
      const {data, message} = await Roles.getRole(req.params)
      if(message){
        return res.status(404).json({
<<<<<<< HEAD:Draw-App/src/controller/role.controller.js
          status: 'fail',
=======
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/role.controller.js
          message
        });
      }
      const {role} = data
      if(role){
<<<<<<< HEAD:Draw-App/src/controller/role.controller.js
        return res.status(200).json({
          status: 'success',
          data
        });
=======
        return res.status(200).json(data);
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/role.controller.js
      }
    } catch (error) {
      console.log(`Error on getting role with id : ${req.params.roleId}`, error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/role.controller.js
        message: error.message,
=======
        error: error.message,
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/role.controller.js
      });
    }
  }

  static async updateRole(req,res){
    try{
      const {data, message} = await Roles.updateRole(req.params, req.body)
      if(message){
        return res.status(404).json({
<<<<<<< HEAD:Draw-App/src/controller/role.controller.js
          status: 'fail',
=======
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/role.controller.js
          message
        });
      }
      const {roleId} = data
      if(roleId){
<<<<<<< HEAD:Draw-App/src/controller/role.controller.js
        return res.status(200).json({
          status: 'success',
          data
        });
=======
        return res.status(200).json(data);
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/role.controller.js
      }
    } catch (error) {
      console.log(`Error on updating role with id : ${req.params.roleId}`, error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/role.controller.js
        message: error.message,
=======
        error: error.message,
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/role.controller.js
      });
    }
  }

  static async deleteRole(req,res){
    try{
      const {data, message} = await Roles.deleteRole(req.params)
      if(message){
        return res.status(404).json({
<<<<<<< HEAD:Draw-App/src/controller/role.controller.js
          status: 'fail',
=======
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/role.controller.js
          message
        });
      }
      const {roleId} = data
      if(roleId){
<<<<<<< HEAD:Draw-App/src/controller/role.controller.js
        return res.status(200).json({
          status: 'success',
          data
        });
=======
        return res.status(200).json(data);
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/role.controller.js
      }
    } catch (error) {
      console.log(`Error on deleting role with id : ${req.params.roleId}`, error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/role.controller.js
        message: error.message,
=======
        error: error.message,
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/role.controller.js
      });
    }
  }
}
export default Role;

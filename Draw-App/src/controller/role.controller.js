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
          data
        });
      }
    } catch (error) {
      console.log("Error on registering role: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async getAllRoles(req,res){
    try {
      const { page, pageSize } = req.query;
      const { data, message } = await Roles.getAllRoles(page, pageSize)
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
      console.log("Error on getting all user's roles in: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }

  static async deleteAllRoles(req,res){
    try {
      const { data, message } = await Roles.deleteAllRoles()
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
      console.log("Error on deleting all user's roles in: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }

  static async getRole(req,res){
    try{
      const {data, message} = await Roles.getRole(req.params)
      if(message){
        return res.status(404).json({
          status: 'fail',
          message
        });
      }
      const {role} = data
      if(role){
        return res.status(200).json({
          status: 'success',
          data
        });
      }
    } catch (error) {
      console.log(`Error on getting role with id : ${req.params.roleId}`, error);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async updateRole(req,res){
    try{
      const {data, message} = await Roles.updateRole(req.params, req.body)
      if(message){
        return res.status(404).json({
          status: 'fail',
          message
        });
      }
      const {roleId} = data
      if(roleId){
        return res.status(200).json({
          status: 'success',
          data
        });
      }
    } catch (error) {
      console.log(`Error on updating role with id : ${req.params.roleId}`, error);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async deleteRole(req,res){
    try{
      const {data, message} = await Roles.deleteRole(req.params)
      if(message){
        return res.status(404).json({
          status: 'fail',
          message
        });
      }
      const {roleId} = data
      if(roleId){
        return res.status(200).json({
          status: 'success',
          data
        });
      }
    } catch (error) {
      console.log(`Error on deleting role with id : ${req.params.roleId}`, error);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}
export default Role;

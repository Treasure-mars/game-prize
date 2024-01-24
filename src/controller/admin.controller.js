import User from "../services/admin.services";

const { SMS_TOPIC } = process.env;
class Users {
  static async register(req, res) {
    try {
      const { data, message } = await User.register(req.body);
      if (message) {
        return res.status(400).json({
          status: "fail",
          message,
        });
      }
      const { firstName, lastName, phoneNumber, passwordNotEncrypted } = data;
      if (phoneNumber) {
        return res.status(200).json({
          status: "success",
          message: `Account created for user ${firstName} ${lastName} with password ${passwordNotEncrypted}`,
        });
      }
    } catch (error) {
      console.log("Error on registering user: ", error);
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }

  static async banUser(req, res) {
    try {
      const { data, message } = await User.banUser(req.body);
      if (message) {
        return res.status(404).json({
          message
        });
      }
      return res.status(200).json(data);
    } catch (error) {
      console.log(`Error on banning user ${req.body.phoneNumber}: `, error);
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }

  static async banUserDel(req,res){
    try{
      const {data, message} = await User.banUserDel(req.params)
      if(message){
        return res.status(404).json({
          message
        });
      }
      const {userId} = data
      if(userId){
        return res.status(200).json(data);
      }
    } catch (error) {
      console.log(`Error on unbanning user ${req.params.id}: `, error);
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }

  static async allBannedUser(req,res){
    try {
      const { page, pageSize } = req.query;
      const { data, message } = await User.getBannedUser(page, pageSize)
      if(message){
        return res.status(404).json({message})
      }
      const { msg } = data
      if(msg){
        return res.status(200).json(data)
      }
    } catch (error) {
      console.log("Error on getting all banned users: ", error);
      return res.status(500).json({
        status: "error",
        error: error.message
      });
    }
  }

  static async allUsers(req,res){
    try {
      const { page, pageSize } = req.query;
      const { data, message } = await User.getAllUsers(page, pageSize)
      if(message){
        return res.status(404).json({message})
      }
      const { msg } = data
      if(msg){
        return res.status(200).json(data)
      }
    } catch (error) {
      console.log("Error on getting all users: ", error);
      return res.status(500).json({
        status: "error",
        error: error.message
      });
    }
  }
  static async identifiedUser(req,res){
    try{
      const {data, message} = await User.getUser(req.params)
      if(message){
        return res.status(404).json({
          message
        });
      }
      const {user} = data
      if(user){
        return res.status(200).json(data);
      }
    } catch (error) {
      console.log(`Error on getting user with id ${req.params.id} : `, error);
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }

  static async updateUser(req,res){
    try{
      const {data, message} = await User.updateUser(req.params, req.body)
      if(message){
        return res.status(404).json({
          message
        });
      }
      const {userId} = data
      if(userId){
        return res.status(200).json(data);
      }
    } catch (error) {
      console.log(`Error on updating user with id : ${req.params.id}`, error);
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }

  static async deleteUser(req,res){
    try{
      const {data, message} = await User.deleteUser(req.params)
      if(message){
        return res.status(404).json({
          message
        });
      }
      const {userId} = data
      if(userId){
        return res.status(200).json(data);
      }
    } catch (error) {
      console.log(`Error on updating user with id : ${req.params.id}`, error);
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }
}
export default Users;

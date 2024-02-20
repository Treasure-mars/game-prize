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
      const { phoneNumber, passwordNotEncrypted } = data;
      if (phoneNumber) {
        return res.status(200).json({
          status: "success",
          data: {
            phoneNumber,
            password: passwordNotEncrypted
          },
        });
      }
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
          status: 'error',
          message: 'Identifier must be unique',
        });
      } else {
        console.log("Error on registering user: ", error);
        return res.status(500).json({
          status: 'error',
          message: error.message,
        });
      }
    }
  }

  static async banUser(req, res) {
    try {
      const { data, message } = await User.banUser(req.body);
      if (message) {
        return res.status(404).json({
          status: 'fail',
          message
        });
      }
      return res.status(200).json({
        status: 'success',
        data
      });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
          status: 'error',
          message: 'This user is already in the banned list',
        });
      } else {
        console.log(`Error on banning user ${req.body.phoneNumber}: `, error);
        return res.status(500).json({
          status: 'error',
          message: error.message,
        });
      }
    }
  }

  static async unbanUser(req,res){
    try{
      const {data, message} = await User.unbanUser(req.params)
      if(message){
        return res.status(404).json({
          status: 'fail',
          message
        });
      }
      const {userId} = data
      if(userId){
        return res.status(200).json({
          status: 'success',
          data
        });
      }
    } catch (error) {
      console.log(`Error on unbanning user ${req.params.userId}: `, error);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async getAllBannedUsers(req,res){
    try {
      const { page, pageSize } = req.query;
      const { data, message } = await User.getAllBannedUsers(page, pageSize)
      if(message){
        return res.status(404).json({
          status: 'fail',
          message
        });
      }
      if(data){
        return res.status(200).json({
          status: 'success',
          data
        });
      }
    } catch (error) {
      console.log("Error on getting all banned users: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }

  static async getAllUsers(req,res){
    try {
      const { page, pageSize } = req.query;
      const { data, message } = await User.getAllUsers(page, pageSize)
      if(message){
        return res.status(404).json({
          status: 'fail',
          message
        });
      }
      if(data){
        return res.status(200).json({
          status: 'success',
          data
        });
      }
    } catch (error) {
      console.log("Error on getting all users: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }
  static async getUserById(req,res){
    try{
      const {data, message} = await User.getUserById(req.params)
      if(message){
        return res.status(404).json({
          status: 'fail',
          message
        });
      }
      if(data){
        return res.status(200).json({
          status: 'success',
          data
        });
      }
    } catch (error) {
      console.log(`Error on getting user with id ${req.params.userId} : `, error);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async updateUser(req,res){
    try{
      const {data, message} = await User.updateUser(req.params, req.body)
      if(message){
        return res.status(404).json({
          status: 'fail',
          message
        });
      }
      if(data){
        return res.status(200).json({
          status: 'success',
          data
        });
      }
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
          status: 'error',
          message: 'Identifier exists on different user',
        });
      } else {
        console.log(`Error on updating user with id : ${req.params.userId}`, error);
        return res.status(500).json({
          status: 'error',
          message: error.message,
        });
      }
    }
  }

  static async deleteUser(req,res){
    try{
      const {data, message} = await User.deleteUser(req.params)
      if(message){
        return res.status(404).json({
          status: 'fail',
          message
        });
      }
      if(data){
        return res.status(200).json({
          status: 'success',
          data
        });
      }
    } catch (error) {
      console.log(`Error on deleting user with id : ${req.params.userId}`, error);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}
export default Users;

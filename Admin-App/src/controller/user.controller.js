import User from "../services/user.services";

const { SMS_TOPIC } = process.env;
class Users {
  static async login(req, res) {
    try {
      const { data, message } = await User.login(req.body);
      if (message) {
        return res.status(404).json({
          status: 'fail',
          message
        });
      }
      const { token } = data;
      if (token) {
        return res.status(200).json({
        status: 'success',
        data
      });
      }
    } catch (error) {
      console.log("Error on logging in: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async getProfile(req,res){
    try {
      // Access user information from the decoded token
      const identifier = req.user.identifier;

      const {data, message} = await User.getProfile(identifier)
      if(message){
        return res.status(404).json({
          status: 'fail',
          message
        })
      }
      if(data){
        return res.status(200).json({
        status: 'success',
        data
      });
      }
    } catch (error) {
      console.log("Error on getting user profile in: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }
  static async updateProfile(req,res){
    try {
      const {data, message} = await User.updateProfile(req)
      if(message){
        return res.status(404).json({
          status: 'fail',
          message
        })
      }
      if(data){
        return res.status(200).json({
        status: 'success',
        data
      });
      }
    } catch (error) {
      console.log("Error on updating profile in: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }
  static async logout(req,res){
    try {
      const {data, message} = await User.logout(req.user)
      if(message){
        return res.status(404).json({
          status: 'fail',
          message
        })
      }
      if(data){
        return res.status(200).json({
          status: 'success',
          data
        });
      }
    } catch (error) {
      console.log("Error on logging out: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }
}
export default Users;

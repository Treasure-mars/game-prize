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
      console.log("Error on logging in: ", error);
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }

  static async verifyOtp(req,res){
    try{
      const {data, message} = await User.delBanUser(req.params)
      if(message){
        return res.status(404).json({
          message
        });
      }
      const {phoneNumber} = data
      if(phoneNumber){
        return res.status(200).json(data);
      }
    } catch (error) {
      console.log("Error on logging in: ", error);
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }

  static async changePassword(req,res){
    try {
      const { data, message } = await User.changePassword(req.body)
      if(message){
        return res.status(404).json({message})
      }
      const { msg } = data
      if(msg){
        return res.status(200).json(data)
      }
    } catch (error) {
      console.log("Error on logging in: ", error);
      return res.status(500).json({
        status: "error",
        error: error.message
      });
    }
  }
  static async forgotPassword(req,res){
    try {
      const { phoneNumber } = req.body;
      if (phoneNumber) {
        const otpCode = await User.otProcess(phoneNumber);
        
        return res.status(200).json({
          status: "success",
          message: `Your OTP for comfirmation: ${otpCode}`,
        });
      }
    } catch (error) {
      console.log("Error on recovering account: ", error);
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }
  static async resendOtp(req,res){
    try {
      const { phoneNumber } = req.body;
      if (phoneNumber) {
        const otpCode = await User.otProcess(phoneNumber);
        
        return res.status(200).json({
          status: "success",
          message: `Your OTP for comfirmation: ${otpCode}`,
        });
      }
    } catch (error) {
      console.log("Error on recovering account: ", error);
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }
  static async resetPassword(req,res){
    try {
      const { data, message } = await User.resetPassword(req.params.otpCode, req.body.newPassword)
      if(message){
        return res.status(404).json({message})
      }
      const { msg } = data
      if(msg){
        return res.status(200).json(data)
      }
    } catch (error) {
      console.log("Error on logging in: ", error);
      return res.status(500).json({
        status: "error",
        error: error.message
      });
    }
  }
  static async profile(req,res){
    try {
      // Access user information from the decoded token
      const identifier = req.body.identifier;

      const {data, message} = await User.profile(identifier)
      if(message){
        return res.status(404).json({message})
      }
      if(data){
        return res.status(200).json({data})
      }
    } catch (error) {
      console.log("Error on logging in: ", error);
      return res.status(500).json({
        status: "error",
        error: error.message
      });
    }
  }
  static async profiles(req,res){
    try {
      const {data, message} = await User.profiles(req.body)
      if(message){
        return res.status(404).json({message})
      }
      if(data){
        return res.status(200).json({data})
      }
    } catch (error) {
      console.log("Error on logging in: ", error);
      return res.status(500).json({
        status: "error",
        error: error.message
      });
    }
  }
  static async logout(req,res){
    try {
      const {data, message} = await User.logout(req.body)
      if(message){
        return res.status(404).json({message})
      }
      if(data){
        return res.status(200).json({data})
      }
    } catch (error) {
      console.log("Error on logging in: ", error);
      return res.status(500).json({
        status: "error",
        error: error.message
      });
    }
  }
}
export default Users;

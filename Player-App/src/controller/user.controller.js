import User from "../services/user.services";

class Users {
  static async register(req, res, next) {
    try {
      const { data, message } = await User.register(req.body);
      if (message) {
        return res.status(400).json({
          status: "fail",
          message,
        });
      }
      if (data) {
        const { otpCode, userId } = await User.otProcess(data.phoneNumber);
        
        req.body = {
          userId,
          info: {
            phoneNumber: data.phoneNumber,
            otpCode
          },
          message: `Your otp confirmation code is ${otpCode}`
        }
        next()
      }
    } catch (error) {
      console.log("Error on registering user: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

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

  static async verifyOtp(req,res){
    try{
      const {data, message} = await User.verifyOtp(req.body)
      if(message){
        return res.status(404).json({
          status: 'fail',
          message
        });
      }
      const {phoneNumber} = data
      if(phoneNumber){
        return res.status(200).json({
        status: 'success',
        data
      });
      }
    } catch (error) {
      console.log("Error on verifying otp in: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async changePassword(req,res){
    try {
      const { data, message } = await User.changePassword(req.body, req.user)
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
      console.log("Error on changing password in: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }
  static async forgotPassword(req,res,next){
    try {
      const { phoneNumber } = req.body;
      if (phoneNumber) {
        const { otpCode, userId } = await User.otProcess(phoneNumber);
        
        req.body = {
          userId,
          info: {
            phoneNumber,
            otpCode
          },
          message: `Your otp confirmation code is ${otpCode}`
        }
        next()
      }
    } catch (error) {
      console.log("Error on recovering account: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
  static async resendOtp(req,res,next){
    try {
      const { phoneNumber } = req.body;
      if (phoneNumber) {
        const { otpCode, userId } = await User.otProcess(phoneNumber);
        
        req.body = {
          userId,
          info: {
            phoneNumber,
            otpCode
          },
          message: `Your otp confirmation code is ${otpCode}`
        }
        next()
      }
    } catch (error) {
      console.log("Error on resending otp : ", error);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
  static async resetPassword(req,res){
    try {
      const { data, message } = await User.resetPassword(req.params.otpCode, req.body.newPassword)
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
      console.log("Error on resetting password in: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message
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

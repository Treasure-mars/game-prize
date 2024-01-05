import User from "../services/user.services";

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
      const { phoneNumber, userId } = data;
      if (phoneNumber) {
        const otpCode = await User.otProcess(phoneNumber);
        
        return res.status(200).json({
          status: "success",
          message: `Your OTP for comfirmation: ${otpCode}`,
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
}
export default Users;

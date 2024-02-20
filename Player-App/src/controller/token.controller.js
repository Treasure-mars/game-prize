import Tokens from "../services/token.services";

const { SMS_TOPIC } = process.env;
class Token {
  static async register(req, res, next) {
    try {
      const { data, message } = await Tokens.register(req.body);
      if (message) {
        return res.status(400).json({
          status: "fail",
          message,
        });
      }
      const { tokenId } = data;
      if (tokenId) {
        req.body = {
          userId: data.userId,
          info: {
            tokenId
          },
          message: `Your token has been created successful ${tokenId}`
        }
        next()
      }
    } catch (error) {
      console.log("Error on registering token: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}
export default Token;

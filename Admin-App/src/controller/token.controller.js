import Tokens from "../services/token.services";

const { SMS_TOPIC } = process.env;
class Token {
  static async updateToken(req,res){
    try {
      const {data, message} = await Tokens.updateToken(req.params, req.body)
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
      console.log(`Error on updating token with id : ${req.params.tokenId}`, error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }
  static async getToken(req,res){
    try {
      const {data, message} = await Tokens.getToken(req.params)
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
      console.log(`Error on getting token with id : ${req.params.tokenId}`, error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }
  static async deleteToken(req,res){
    try {
      const {data, message} = await Tokens.deleteToken(req.params)
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
      console.log(`Error on deleting token with id : ${req.params.tokenId}`, error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }
  static async getAllTokens(req,res){
    try {
      const {data, message} = await Tokens.getAllTokens()
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
      console.log("Error on getting all tokens in: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }
}
export default Token;

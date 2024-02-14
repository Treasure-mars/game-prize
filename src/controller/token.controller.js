import Tokens from "../services/token.services";

const { SMS_TOPIC } = process.env;
class Token {
  static async register(req, res) {
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
        return res.status(200).json({
          status: "success",
          message: `Token created with id ${tokenId}`,
        });
      }
    } catch (error) {
      console.log("Error on registering token: ", error);
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }
  static async updateToken(req,res){
    try {
      const {data, message} = await Tokens.updateToken(req.params, req.body)
      if(message){
        return res.status(404).json({message})
      }
      if(data){
        return res.status(200).json({data})
      }
    } catch (error) {
      console.log(`Error on updating token with id : ${req.params.tokenId}`, error);
      return res.status(500).json({
        status: "error",
        error: error.message
      });
    }
  }
  static async getToken(req,res){
    try {
      const {data, message} = await Tokens.getToken(req.params)
      if(message){
        return res.status(404).json({message})
      }
      if(data){
        return res.status(200).json({data})
      }
    } catch (error) {
      console.log(`Error on getting token with id : ${req.params.tokenId}`, error);
      return res.status(500).json({
        status: "error",
        error: error.message
      });
    }
  }
  static async deleteToken(req,res){
    try {
      const {data, message} = await Tokens.deleteToken(req.params)
      if(message){
        return res.status(404).json({message})
      }
      if(data){
        return res.status(200).json({data})
      }
    } catch (error) {
      console.log(`Error on deleting token with id : ${req.params.tokenId}`, error);
      return res.status(500).json({
        status: "error",
        error: error.message
      });
    }
  }
  static async getAllTokens(req,res){
    try {
      const {data, message} = await Tokens.getAllTokens()
      if(message){
        return res.status(404).json({message})
      }
      if(data){
        return res.status(200).json({data})
      }
    } catch (error) {
      console.log("Error on getting all tokens in: ", error);
      return res.status(500).json({
        status: "error",
        error: error.message
      });
    }
  }
}
export default Token;

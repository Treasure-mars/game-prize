import Players from "../services/player.services";
import Tokens from "../services/token.services";

const { SMS_TOPIC } = process.env;
class Player {
  static async pickWinner(req, res) {
    try {
      const {data, message} = await Players.pickWinner(req.params)
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
      console.log(`Error on picking a winner for draw with id : ${req.params.drawId}`, error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }

  static async viewWinner(req,res){
    try {
      const {data, message} = await Players.viewWinner(req.params)
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
      console.log(`Error on viewing a winner for token with id : ${req.params.tokenId}`, error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }

  static async confirmWinner(req,res){
    try {
      const {data, message} = await Players.confirmWinner(req.params)
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
      console.log(`Error on confirming a winner for token with id : ${req.params.tokenId}`, error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }
}
export default Player;

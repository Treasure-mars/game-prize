import Players from "../services/player.services";
import Tokens from "../services/token.services";

const { SMS_TOPIC } = process.env;
class Player {
  static async register(req, res) {
    try {
      const { data, message } = await Players.register(req.body);
      if (message) {
        return res.status(400).json({
          status: "fail",
          message,
        });
      }
      const { phoneNumber, playerId } = data;
      if (phoneNumber) {
        return res.status(200).json({
          status: "success",
<<<<<<< HEAD:Draw-App/src/controller/player.controller.js
          data
=======
          message: `Player ${playerId} created with ${phoneNumber}`,
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/player.controller.js
        });
      }
    } catch (error) {
      console.log("Error on registering player: ", error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/player.controller.js
        message: error.message,
=======
        error: error.message,
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/player.controller.js
      });
    }
  }

  static async updatePlayer(req,res){
    try {
      const {data, message} = await Players.updatePlayer(req.params, req.body)
      if(message){
<<<<<<< HEAD:Draw-App/src/controller/player.controller.js
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
=======
        return res.status(404).json({message})
      }
      if(data){
        return res.status(200).json({data})
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/player.controller.js
      }
    } catch (error) {
      console.log(`Error on updating player with id : ${req.params.playerId}`, error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/player.controller.js
        message: error.message
=======
        error: error.message
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/player.controller.js
      });
    }
  }
  static async getPlayer(req,res){
    try {
      const {data, message} = await Players.getPlayer(req.params)
      if(message){
<<<<<<< HEAD:Draw-App/src/controller/player.controller.js
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
=======
        return res.status(404).json({message})
      }
      if(data){
        return res.status(200).json({data})
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/player.controller.js
      }
    } catch (error) {
      console.log(`Error on getting player with id : ${req.params.playerId}`, error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/player.controller.js
        message: error.message
=======
        error: error.message
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/player.controller.js
      });
    }
  }
  static async deletePlayer(req,res){
    try {
      const {data, message} = await Players.deletePlayer(req.params)
      if(message){
<<<<<<< HEAD:Draw-App/src/controller/player.controller.js
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
=======
        return res.status(404).json({message})
      }
      if(data){
        return res.status(200).json({data})
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/player.controller.js
      }
    } catch (error) {
      console.log(`Error on deleting player with id : ${req.params.playerId}`, error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/player.controller.js
        message: error.message
=======
        error: error.message
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/player.controller.js
      });
    }
  }
  static async getAllPlayers(req,res){
    try {
      const {data, message} = await Players.getAllPlayers()
      if(message){
<<<<<<< HEAD:Draw-App/src/controller/player.controller.js
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
=======
        return res.status(404).json({message})
      }
      if(data){
        return res.status(200).json({data})
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/player.controller.js
      }
    } catch (error) {
      console.log("Error on getting all players in: ", error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/player.controller.js
        message: error.message
=======
        error: error.message
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/player.controller.js
      });
    }
  }

  static async getAllProduct(req, res) {
    try {
      const {data, message} = await Players.getAllProduct()
      if(message){
<<<<<<< HEAD:Draw-App/src/controller/player.controller.js
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
=======
        return res.status(404).json({message})
      }
      if(data){
        return res.status(200).json({data})
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/player.controller.js
      }
    } catch (error) {
      console.log("Error on getting all products in: ", error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/player.controller.js
        message: error.message
=======
        error: error.message
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/player.controller.js
      });
    }
  }

  static async playForProduct(req, res, next) {
    try {
      const {data, message} = await Players.playForProduct(req.params, req.user)
      if(message){
<<<<<<< HEAD:Draw-App/src/controller/player.controller.js
        return res.status(404).json({
          status: 'fail',
          message
        })
=======
        return res.status(404).json({message})
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/player.controller.js
      }
      if(data){
        req.body = {
          userId: data.userId, productId: data.productId, drawId: data.drawId
        }
        next()
      }
    } catch (error) {
      console.log(`Error on playing for product with id : ${req.params.productId}`, error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/player.controller.js
        message: error.message
=======
        error: error.message
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/player.controller.js
      });
    }
  }

  static async pickWinner(req, res) {
    try {
      const {data, message} = await Players.pickWinner(req.params)
      if(message){
<<<<<<< HEAD:Draw-App/src/controller/player.controller.js
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
=======
        return res.status(404).json({message})
      }
      if(data){
        return res.status(200).json({data})
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/player.controller.js
      }
    } catch (error) {
      console.log(`Error on picking a winner for draw with id : ${req.params.drawId}`, error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/player.controller.js
        message: error.message
=======
        error: error.message
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/player.controller.js
      });
    }
  }

  static async viewWinner(req,res){
    try {
      const {data, message} = await Players.viewWinner(req.params)
      if(message){
<<<<<<< HEAD:Draw-App/src/controller/player.controller.js
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
=======
        return res.status(404).json({message})
      }
      if(data){
        return res.status(200).json({data})
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/player.controller.js
      }
    } catch (error) {
      console.log(`Error on viewing a winner for token with id : ${req.params.tokenId}`, error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/player.controller.js
        message: error.message
=======
        error: error.message
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/player.controller.js
      });
    }
  }

  static async confirmWinner(req,res){
    try {
      const {data, message} = await Players.confirmWinner(req.params)
      if(message){
<<<<<<< HEAD:Draw-App/src/controller/player.controller.js
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
=======
        return res.status(404).json({message})
      }
      if(data){
        return res.status(200).json({data})
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/player.controller.js
      }
    } catch (error) {
      console.log(`Error on confirming a winner for token with id : ${req.params.tokenId}`, error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/player.controller.js
        message: error.message
=======
        error: error.message
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/player.controller.js
      });
    }
  }
}
export default Player;

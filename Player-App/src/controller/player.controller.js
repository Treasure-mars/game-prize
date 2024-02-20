import Players from "../services/player.services";

class Player {

  static async getAllProduct(req, res) {
    try {
      const {data, message} = await Players.getAllProduct()
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
      console.log("Error on getting all products in: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }

  static async playForProduct(req, res, next) {
    try {
      const {data, message} = await Players.playForProduct(req.params, req.user)
      if(message){
        return res.status(404).json({
          status: 'fail',
          message
        })
      }
      if(data){
        req.body = {
          userId: data.userId, productId: data.productId, drawId: data.drawId, playAmount: data.playAmount
        }
        next()
      }
    } catch (error) {
      console.log(`Error on playing for product with id : ${req.params.productId}`, error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }
}
export default Player;

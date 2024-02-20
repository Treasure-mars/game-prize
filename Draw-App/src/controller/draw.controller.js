import Draws from "../services/draw.services";

const { SMS_TOPIC } = process.env;
class Draw {
  static async register(req, res) {
    try {
      const { data, message } = await Draws.register(req.body);
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
      console.log("Error on registering draw: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
  static async updateDraw(req,res){
    try {
      const {data, message} = await Draws.updateDraw(req.params, req.body)
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
      console.log(`Error on updating draw with id : ${req.params.drawId}`, error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }
  static async getDraw(req,res){
    try {
      const {data, message} = await Draws.getDraw(req.params)
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
      console.log(`Error on getting draw with id : ${req.params.drawId}`, error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }
  static async deleteDraw(req,res){
    try {
      const {data, message} = await Draws.deleteDraw(req.params)
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
      console.log(`Error on deleting draw with id : ${req.params.drawId}`, error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }
  static async getAllDraws(req,res){
    try {
      const {data, message} = await Draws.getAllDraws()
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
      console.log("Error on getting all draws in: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }
  static async getAllDrawsByProductId(req,res){
    try {
      const {data, message} = await Draws.getAllDrawsByProductId(req.params)
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
      console.log(`Error on getting draws for product with id : ${req.params.productId}`, error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }
}
export default Draw;

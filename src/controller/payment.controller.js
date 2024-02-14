import Payments from "../services/payment.services";

const { SMS_TOPIC } = process.env;
class Payment {
  static async register(req, res) {
    try {
      const { data, message } = await Payments.register(req.body);
      if (message) {
        return res.status(400).json({
          status: "fail",
          message,
        });
      }
      const { paymentId, productName } = data;
      if (paymentId) {
        return res.status(200).json({
          status: "success",
          message: `Payment ${productName} created with id ${paymentId}`,
        });
      }
    } catch (error) {
      console.log("Error on registering payment: ", error);
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }
  static async updatePayment(req,res){
    try {
      const {data, message} = await Payments.updatePayment(req.params, req.body)
      if(message){
        return res.status(404).json({message})
      }
      if(data){
        return res.status(200).json({data})
      }
    } catch (error) {
      console.log(`Error on updating payment with id : ${req.params.paymentId}`, error);
      return res.status(500).json({
        status: "error",
        error: error.message
      });
    }
  }
  static async getPayment(req,res){
    try {
      const {data, message} = await Payments.getPayment(req.params)
      if(message){
        return res.status(404).json({message})
      }
      if(data){
        return res.status(200).json({data})
      }
    } catch (error) {
      console.log(`Error on getting payment with id : ${req.params.paymentId}`, error);
      return res.status(500).json({
        status: "error",
        error: error.message
      });
    }
  }
  static async deletePayment(req,res){
    try {
      const {data, message} = await Payments.deletePayment(req.params)
      if(message){
        return res.status(404).json({message})
      }
      if(data){
        return res.status(200).json({data})
      }
    } catch (error) {
      console.log(`Error on deleting payment with id : ${req.params.paymentId}`, error);
      return res.status(500).json({
        status: "error",
        error: error.message
      });
    }
  }
  static async getAllPayments(req,res){
    try {
      const {data, message} = await Payments.getAllPayments()
      if(message){
        return res.status(404).json({message})
      }
      if(data){
        return res.status(200).json({data})
      }
    } catch (error) {
      console.log("Error on getting all payments in: ", error);
      return res.status(500).json({
        status: "error",
        error: error.message
      });
    }
  }
}
export default Payment;

import Payments from "../services/payment.services";

class Payment {
  static async register(req, res, next) {
    try {
      const { data, message } = await Payments.register(req.body);
      if (message) {
        return res.status(400).json({
          status: "fail",
          message,
        });
      }
      if (data) {
        req.body = {
          userId: data.userId, productId: data.productId, drawId: data.drawId
        }
        next()
      }
    } catch (error) {
      console.log("Error on registering payment: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}
export default Payment;

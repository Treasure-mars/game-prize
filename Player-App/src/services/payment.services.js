import { Payment, Product, users } from '../database/models'

class Payments {

  static async register(data) {
    const { productId, userId, drawId, playAmount } = data

    // API for payment to be placed below
    
    /**
     * 
     * 
     * 
     */

    const paymentCreated = await Payment.create({
        productId,
        userId,
        playAmount
    })
    return { data: {
      productId: paymentCreated.productId,
      userId: paymentCreated.userId,
      drawId
    }}
  }
}
export default Payments

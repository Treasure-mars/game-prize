import { Payment, Product, users } from '../database/models'

class Payments {

  static async register(data) {
    const { productId, userId, paymentAmount } = data

    const product = await Product.findByPk(productId)
    if(!product || product.isAvailable == false) {
      return { message: 'Product not found' };
    }else if(product.playAmount !== paymentAmount){
      return { message: `You should pay exactly ${product.playAmount} RWF to play for this product` };
    }

    const user = await users.findByPk(userId)
    if(!user) {
      return { message: 'User not found' };
    }

    const paymentCreated = await Payment.create({
        productId: product.productId,
        userId: user.userId,
        paymentAmount
    })
    return { data: {
      productId: paymentCreated.productId,
      userId: paymentCreated.userId,
      paymentAmount
    }}
  }
  
  static async updatePayment(params, data){
    const { productId, userId, paymentAmount } = data
    const { paymentId } = params

    const identifiedPayment = await Payment.findOne({
      where:{
        paymentId
      }
    })
    if(!identifiedPayment){
      return { message: "Payment not found" }
    }
    const product = await Product.findByPk(productId)
    if(!product || product.isAvailable == false) {
      return { message: 'Product not found' };
    }else if(product.playAmount !== paymentAmount){
      return { message: `You should pay exactly ${product.playAmount} RWF to play for this product` };
    }

    const user = await users.findByPk(userId)
    if(!user) {
      return { message: 'User not found' };
    }
    if(productId){
      identifiedPayment.productId = productId
    }
    if(userId){
        identifiedPayment.userId = userId
    }
    if(paymentAmount){
        identifiedPayment.paymentAmount = paymentAmount
    }
    await identifiedPayment.save()
    return {data: {
      productId: identifiedPayment.productId,
      userId: identifiedPayment.userId,
      paymentAmount
    }}
  }

  static async getPayment(params){
    const { paymentId } = params
    const identifiedPayment = await Payment.findOne({
      where:{
        paymentId
      },
      attributes: ['productId', 'userId', 'paymentAmount']
    })
    if(!identifiedPayment){
      return { message: "Payment not found" }
    }
    return {data: identifiedPayment}
  }

  static async deletePayment(params){
    const { paymentId } = params
    const identifiedPayment = await Payment.destroy({
      where:{
        paymentId
      }
    })
    if(identifiedPayment !== 1){
      return { message: "Payment not found" }
    }
    return { data: {}}
  }

  static async getAllPayments(){
    const allPayments = await Payment.findAll({
      attributes: ['productId', 'userId', 'paymentAmount']
    })
    if (allPayments.length === 0) {
      return { message: 'No payments found' }
    }
    return { data: { payments: allPayments, msg: 'success' } }
  }
}
export default Payments

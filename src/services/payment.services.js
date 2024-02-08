import bcrypt from 'bcrypt'
import { Payment, Product, users } from '../database/models'
import dotenv from 'dotenv';
import { Op } from 'sequelize'

dotenv.config();

const saltRounds = Number(process.env.SALTROUNDS)
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
    return { data: paymentCreated }
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
    identifiedPayment.save()
    return {data: identifiedPayment}
  }

  static async getPayment(params){
    const { paymentId } = params
    const identifiedPayment = await Payment.findOne({
      where:{
        paymentId
      }
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
    return { data: {
        paymentId: paymentId,
        message: 'Payment have been deleted successfully'
      }}
  }

  static async getAllPayments(){
    const allPayments = await Payment.findAll()
    if (allPayments.length === 0) {
      return { message: 'No payments found' }
    }
    return { data: { payments: allPayments, msg: 'success' } }
  }
}
export default Payments

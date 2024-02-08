import bcrypt from 'bcrypt'
import { Token, Product, users, Draw } from '../database/models'
import dotenv from 'dotenv';
import { Op } from 'sequelize'

dotenv.config();

const saltRounds = Number(process.env.SALTROUNDS)
class Tokens {

  static async register(data) {
    const { userId, productId, drawId } = data

    const product = await Product.findByPk(productId)
    if(!product || !product.isAvailable) {
      return { message: 'Product not found' };
    }

    const user = await users.findByPk(userId)
    if(!user) {
      return { message: 'User not found' };
    }

    const draw = await Draw.findByPk(drawId)
    if(!draw) {
      return { message: 'Draw not found' };
    }

    if(!(draw.startDate <= Date.now() & draw.endDate >= Date.now())){
      return { message: 'Draw is not available' };
    }

    const tokenCreated = await Token.create({
        userId,
        productId,
        drawId
    })
    return { data: tokenCreated }
  }
  
  static async updateToken(params, data){
    const { userId, productId, drawId } = data
    const { tokenId } = params
    const identifiedToken = await Token.findOne({
      where:{
        tokenId
      }
    })
    if(!identifiedToken){
      return { message: "Token not found" }
    }
    if(userId){
      identifiedToken.userId = userId
    }
    if(productId){
      identifiedToken.productId = productId
    }
    if(drawId){
      identifiedToken.drawId = drawId
    }
    identifiedToken.save()
    return {data: identifiedToken}
  }

  static async getToken(params){
    const { tokenId } = params
    const identifiedToken = await Token.findOne({
      where:{
        tokenId
      }
    })
    if(!identifiedToken){
      return { message: "Token not found" }
    }
    return {data: identifiedToken}
  }

  static async deleteToken(params){
    const { tokenId } = params
    const identifiedToken = await Token.destroy({
      where:{
        tokenId
      }
    })
    if(identifiedToken !== 1){
      return { message: "Token not found" }
    }
    return { data: {
        tokenId: tokenId,
        message: 'Token have been deleted successfully'
      }}
  }

  static async getAllTokens(){
    const allTokens = await Token.findAll()
    if (allTokens.length === 0) {
      return { message: 'No tokens found' }
    }
    return { data: { tokens: allTokens, msg: 'success' } }
  }
}
export default Tokens

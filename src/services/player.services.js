import bcrypt from 'bcrypt'
import { Player, Product, users, Draw, Token } from '../database/models'
import dotenv from 'dotenv';
import { Op } from 'sequelize'
import Draws from "../services/draw.services";

dotenv.config();

const saltRounds = Number(process.env.SALTROUNDS)
class Players {
  static reformatPhoneNumber(phoneNumber) {
    const numericDigits = phoneNumber.replace(/\D/g, '');

    if (numericDigits.length < 9) {
      return "Invalid Phone Number";
    }
    const last9Digits = numericDigits.slice(-9);
    const formattedPhoneNumber = `250${last9Digits}`;
    return formattedPhoneNumber;
  }

  static getRandomTokenIds(tokenList, count) {
    const shuffledTokens = tokenList.sort(() => Math.random() - 0.5); // Shuffle the array
    return shuffledTokens.slice(0, count).map(token => token.tokenId);
  }

  static async register(data) {
    const { firstName, lastName, email, phoneNumber } = data
    const phoneN = Players.reformatPhoneNumber(phoneNumber)

    if (email) {
      const emailUser = await Player.findOne({
        where: {
          email
        }
      })
      if (emailUser) {
        return { message: 'Email already exists' }
      }
    }

    if (phoneN) {
      const phoneNUser = await Player.findOne({
        where: {
          phoneNumber: phoneN
        }
      })
      if (phoneNUser) {
        return { message: 'Phone number already exists' }
      }
    }

    const player = await Player.create({
      firstName,
      lastName,
      email,
      phoneNumber: phoneN
    })
    return { data: player }
  }

  static async updatePlayer(params, data){
    const { firstName, lastName, email, phoneNumber } = data
    const { playerId } = params
    const identifiedPlayer = await Player.findOne({
      where:{
        playerId
      }
    })
    if(!identifiedPlayer){
      return { message: "Player not found" }
    }
    if(firstName){
      identifiedPlayer.firstName = firstName
    }
    if(lastName){
      identifiedPlayer.lastName = lastName
    }
    if(email){
      identifiedPlayer.email = email
    }
    if(phoneNumber){
      const phoneN = Players.reformatPhoneNumber(phoneNumber)
      identifiedPlayer.phoneNumber = phoneN
    }
    identifiedPlayer.save()
    return {data: identifiedPlayer}
  }

  static async getPlayer(params){
    const { playerId } = params
    const identifiedPlayer = await Player.findOne({
      where:{
        playerId
      }
    })
    if(!identifiedPlayer){
      return { message: "Player not found" }
    }
    return {data: identifiedPlayer}
  }

  static async deletePlayer(params){
    const { playerId } = params
    const identifiedPlayer = await Player.destroy({
      where:{
        playerId
      }
    })
    if(identifiedPlayer !== 1){
      return { message: "Player not found" }
    }
    return { data: {
        playerId: playerId,
        message: 'Player have been deleted successfully'
      }}
  }

  static async getAllPlayers(){
    const allPlayers = await Player.findAll()
    if (allPlayers.length === 0) {
      return { message: 'No products found' }
    }
    return { data: { players: allPlayers, msg: 'success' } }
  }

  static async getAllProduct() {
    try {
        const allProducts = await Product.findAll();
        
        if (allProducts.length === 0) {
            return { message: 'No products found' };
        }

        const productsToReturn = allProducts.map(product => ({
            productId: product.productId,
            productName: product.productName,
            playAmount: product.playAmount
        }));

        return { data: { products: productsToReturn, msg: 'success' } };
    } catch (error) {
        console.log('Error on getting all products: ', error);
        return { status: 'error', error: error.message };
    }
  }
  
  static async playForProduct(param, body) {
    try {
        const { productId } = param
        const { phoneNumber, playAmount } = body
        const userFound = await users.findOne({
          where: {
            phoneNumber
          }
        })
        if(!userFound){
          userFound = await Player.findOne({
            where: {
              phoneNumber
            }
          })
          if(!userFound){
            return { message: 'User not found' };
          }
        }
        const productFound = await Product.findOne({
          where: {
            productId
          }
        });
        
        if (!productFound || !productFound.isAvailable) {
            return { message: 'Product not found' };
        }

        if(playAmount !== productFound.playAmount) {
            return { message: `Play amount should be exactly ${productFound.playAmount} RWF` };
        }

        const now = Date.now()

        let drawFound = await Draw.findOne({
          where: {
              productId,
              startDate: { [Op.lte]: now },
              endDate: { [Op.gte]: now }
          }
        });

        if (!drawFound) {
          const draw = await Draws.register({productId: productId, drawsMax: 1, isPlayed: true})
          drawFound = draw.data.draws.drawCreated[0]
        }
        
        return { 
          data: {
            userId: userFound.userId, productId: productFound.productId, drawId: drawFound.drawId
          }};
    } catch (error) {
        console.log('Error on playing for the product: ', error);
        return { status: 'error', error: error.message };
    }
  }

  static async pickWinner(param) {
    try {
        const { productId } = param
        
        const now = Date.now()

        const drawFound = await Draw.findOne({
          where: {
              productId,
              // endDate: { [Op.eq]: now },
              isPlayed: true
          }
        });

        if(!drawFound){
          return { message: "No draws for this product yet" }
        }

        const tokenFound = await Token.findAll({
          where: {
            [Op.and]: [{
              productId
            },{
              drawId: drawFound.drawId
            }]
          },
          attributes: ['tokenId']
        })
        
        const winnerTokenId = Players.getRandomTokenIds(tokenFound, 1)

        return { 
          data: {
            tokenId: winnerTokenId
          }};
    } catch (error) {
        console.log('Error on playing for the product: ', error);
        return { status: 'error', error: error.message };
    }
  }

  static async confirmWinner(params){
    const { tokenId } = params
    const identifiedToken = await Token.findOne({
      where:{
        tokenId
      }
    })
    if(!identifiedToken){
      return { message: "Token not available" }
    }
    const identifiedPlayer = await users.findOne({
      where:{
        userId: identifiedToken.userId
      }
    })
    if(!identifiedPlayer){
      return { message: "Player not found" }
    }
    return {data: identifiedPlayer}
  }
}
export default Players

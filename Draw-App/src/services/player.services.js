import { Player, Product, users, Draw, Token } from '../database/models'
import { Op, Sequelize } from 'sequelize'
import Draws from "../services/draw.services";

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
    return { data: {
      firstName: player.firstName,
      lastName: player.lastName,
      email: player.email,
      phoneNumber: player.phoneNumber,
    }}
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
    await identifiedPlayer.save()
    return {data: {
      firstName: identifiedPlayer.firstName,
      lastName: identifiedPlayer.lastName,
      email: identifiedPlayer.email,
      phoneNumber: identifiedPlayer.phoneNumber,
    }}
  }

  static async getPlayer(params){
    const { playerId } = params
    const identifiedPlayer = await Player.findOne({
      where:{
        playerId
      },
      attributes: ['firstName', 'lastName', 'email', 'phoneNumber']
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
    return { data: {}}
  }

  static async getAllPlayers(){
    const allPlayers = await Player.findAll({
      attributes: ['firstName', 'lastName', 'email', 'phoneNumber']
    })
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

        return { data: { products: productsToReturn } };
    } catch (error) {
        console.log('Error on getting all products: ', error);
        return { status: 'error', message: error.message };
    }
  }
  
  static async playForProduct(param, user) {
    try {
        const { productId } = param
        const { userId } = user
        const productFound = await Product.findOne({
          where: {
            productId
          }
        });
        
        if (!productFound || !productFound.isAvailable) {
            return { message: 'Product not found' };
        }

        // if(playAmount !== productFound.playAmount) {
        //     return { message: `Play amount should be exactly ${productFound.playAmount} RWF` };
        // }

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
            userId: userId, productId: productFound.productId, drawId: drawFound.drawId
          }};
    } catch (error) {
        console.log('Error on playing for the product: ', error);
        return { status: 'error', message: error.message };
    }
  }

  static async pickWinner(param) {
    try {
        const { productId, drawId } = param
        
        const now = Date.now()

        const drawFound = await Draw.findOne({
          where: {
              productId,
              drawId
          }
        });

        if(!drawFound){
          return { message: "Draw not found" }
        }

        if(!drawFound.isPlayed){
          return { message: "Draw has not been played yet" }
        }

        // if(drawFound.endDate > now){
        //   return { message: `Draw is planned on ${drawFound.endDate}` }
        // }

        if(drawFound.winnerFound){
          return { message: "Draw has already been won" }
        }

        const tokenFound = await Token.findAll({
          where: {
            [Op.and]: [{
              productId
            },{
              drawId: drawFound.drawId
            }]
          },
          attributes: ['userId', 
                        [Sequelize.literal('STRING_AGG(DISTINCT "tokenId"::text, \',\')'), 'allTokenIds'],
                        [Sequelize.literal('COUNT(*)'), 'count']
                      ],
          group:  ['userId'],
          order:  [
                    [Sequelize.literal('count'), 'DESC']
                  ],
          limit: drawFound.winnerCount
        })

        const randomTokenIds = tokenFound.map(user => {
          const tokens = user.dataValues.allTokenIds.split(',').map(token => parseInt(token, 10));
          const randomIndex = Math.floor(Math.random() * tokens.length);
          return tokens[randomIndex];
        });

        return { 
          data: {
            tokenId: randomTokenIds
          }};
    } catch (error) {
        console.log('Error on playing for the product: ', error);
        return { status: 'error', message: error.message };
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
    const identifiedDraw = await Draw.findOne({
      where:{
        drawId: identifiedToken.drawId
      }
    })
    if(!identifiedDraw){
      return { message: "Draw not found" }
    }
    identifiedDraw.winnerFound = true
    identifiedDraw.save()

    return {data: {
      drawId: identifiedDraw.drawId,
      winnerFound: identifiedDraw.winnerFound
    }}
  }
  
  static async viewWinner(params){
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
    return {data: {
      firstName: identifiedPlayer.firstName,
      lastName: identifiedPlayer.lastName,
      email: identifiedPlayer.email,
      phoneNumber: identifiedPlayer.phoneNumber,
    }}
  }
}
export default Players

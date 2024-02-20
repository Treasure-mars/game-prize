import { Player, Product, users, Draw, Token } from '../database/models'
import { Op, Sequelize } from 'sequelize'
import Draws from "../services/draw.services";

class Players {
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

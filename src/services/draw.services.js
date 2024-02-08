import bcrypt from 'bcrypt'
import { Draw, Product } from '../database/models'
import dotenv from 'dotenv';
import { Op } from 'sequelize'

dotenv.config();

const saltRounds = Number(process.env.SALTROUNDS)
class Draws {

  static async register(data) {
    const { productId, drawsMax, isPlayed } = data;

    const playedStatus = isPlayed !== undefined ? isPlayed : false;

    if (drawsMax <= 0) {
        return { message: 'Zero draws created' };
    }

    let drawCount = drawsMax
    let startDate = Date.now()
    let endDate = Date.now()

    const product = await Product.findByPk(productId)

    if(!product || !product.isAvailable) {
      return { message: 'Product not found' };
    }

    const drawFound = await Draw.findOne({
        where: {
            productId
        },
        order: [
            ['endDate', 'DESC']
        ]
    })

    if(drawFound){
        endDate = new Date(drawFound.endDate).getTime();
    }

    const drawCreated = []

    do{
        startDate = endDate
        endDate = startDate + (product.drawPeriod * 24 * 60 * 60 * 1000);

        const newDraw = await Draw.create({
          productId: product.productId,
          startDate: startDate,
          endDate: endDate,
          isPlayed: playedStatus
        });
        
        drawCreated.push(newDraw);

        drawCount--;
    }while(drawCount > 0)

    return { data: {draws: { drawCreated }, msg: "Draws created successfully"} }
  }
  
  static async updateDraw(params, data){
    const { productId } = data
    const { drawId } = params

    const identifiedDraw = await Draw.findOne({
      where:{
        drawId
      }
    })
    if(!identifiedDraw){
      return { message: "Draw not found" }
    }
    const product = await Product.findByPk(productId)
    if(!product || product.isAvailable == false) {
      return { message: 'Product not found' };
    }

    if(productId){
      identifiedDraw.productId = productId
    }
    identifiedDraw.save()
    return {data: identifiedDraw}
  }

  static async getDraw(params){
    const { drawId } = params
    const identifiedDraw = await Draw.findOne({
      where:{
        drawId
      }
    })
    if(!identifiedDraw){
      return { message: "Draw not found" }
    }
    return {data: identifiedDraw}
  }

  static async deleteDraw(params){
    const { drawId } = params
    const identifiedDraw = await Draw.destroy({
      where:{
        drawId
      }
    })
    if(identifiedDraw !== 1){
      return { message: "Draw not found" }
    }
    return { data: {
        drawId: drawId,
        message: 'Draw have been deleted successfully'
      }}
  }

  static async getAllDraws(){
    const allDraws = await Draw.findAll()
    if (allDraws.length === 0) {
      return { message: 'No Draws found' }
    }
    return { data: { Draws: allDraws, msg: 'success' } }
  }

  static async getAllDrawsByProductId(params){
    const { productId } = params
    const identifiedDrawProduct = await Draw.findAll({
      where:{
        productId
      }
    })
    if(!identifiedDrawProduct){
      return { message: `Draws not found for product ${productId}` }
    }
    return {data: identifiedDrawProduct}
  }
}
export default Draws

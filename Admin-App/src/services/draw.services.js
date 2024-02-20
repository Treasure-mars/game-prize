import { Draw, Product } from '../database/models'

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
          winnerCount: product.winnerCount,
          isPlayed: playedStatus
        });
        
        drawCreated.push(newDraw);

        drawCount--;
    }while(drawCount > 0)

    return { data: {draws: { drawCreated }} }
  }
  
  static async updateDraw(params, data){
    const { productId, winnerCount, endDate } = data
    const { drawId } = params

    const identifiedDraw = await Draw.findOne({
      where:{
        drawId
      }
    })
    if(!identifiedDraw){
      return { message: "Draw not found" }
    }
    if(productId){
      const product = await Product.findByPk(productId)
      if(!product || product.isAvailable == false) {
        return { message: 'Product not found' };
      }
      identifiedDraw.productId = productId
    }
    if(winnerCount){
      identifiedDraw.winnerCount = winnerCount
    }
    if(endDate){
      identifiedDraw.endDate = endDate
    }
    await identifiedDraw.save()
    return {data: {
      drawId: identifiedDraw.drawId,
      winnerCount: identifiedDraw.winnerCount,
      startDate: identifiedDraw.startDate,
      endDate: identifiedDraw.endDate,
      isPlayed: identifiedDraw.isPlayed
    }}
  }

  static async getDraw(params){
    const { drawId } = params
    const identifiedDraw = await Draw.findOne({
      where:{
        drawId
      },
      attributes: ['productId', 'drawId', 'startDate', 'endDate', 'winnerCount', 'isPlayed']
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
    return { data: {}}
  }

  static async getAllDraws(){
    const allDraws = await Draw.findAll({
      attributes: ['productId', 'drawId', 'startDate', 'endDate', 'winnerCount', 'isPlayed']
    })
    if (allDraws.length === 0) {
      return { message: 'No Draws found' }
    }
    return { data: { Draws: allDraws } }
  }

  static async getAllDrawsByProductId(params){
    const { productId } = params
    const identifiedDrawProduct = await Draw.findAll({
      where:{
        productId
      },
      attributes: ['productId', 'drawId', 'startDate', 'endDate', 'winnerCount', 'isPlayed']
    })
    if(!identifiedDrawProduct){
      return { message: `Draws not found for product ${productId}` }
    }
    return {data: identifiedDrawProduct}
  }
}
export default Draws

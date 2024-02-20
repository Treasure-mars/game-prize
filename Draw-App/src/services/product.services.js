import { Product } from '../database/models'

class Products {

  static async register(data) {
    const { productName, description, isAvailable, productCost, winnerCount, drawPeriod, playAmount } = data

    if (productName) {
      const product = await Product.findOne({
        where: {
            productName
        }
      })
      if (product) {
        return { message: `Product ${productName} already exists` }
      }
    }
    const productCreated = await Product.create({
        productName,
        description,
        isAvailable,
        productCost,
        winnerCount,
        drawPeriod,
        playAmount
    })
    return { data: {
      productName: productCreated.productName,
      description: productCreated.description,
      isAvailable: productCreated.isAvailable,
      productCost: productCreated.productCost,
      winnerCount: productCreated.winnerCount,
      drawPeriod: productCreated.drawPeriod,
      playAmount: productCreated.playAmount
    }}
  }
  
  static async updateProduct(params, data){
    const { productName, description, isAvailable, productCost, winnerCount, drawPeriod, playAmount } = data
    const { productId } = params
    const identifiedProduct = await Product.findOne({
      where:{
        productId
      }
    })
    if(!identifiedProduct){
      return { message: "Product not found" }
    }
    if(productName){
      identifiedProduct.productName = productName
    }
    if(description){
      identifiedProduct.description = description
    }
    if(isAvailable){
      identifiedProduct.isAvailable = isAvailable
    }
    if(productCost){
      identifiedProduct.productCost = productCost
    }
    if(winnerCount){
      identifiedProduct.winnerCount = winnerCount
    } 
    if(drawPeriod){
      identifiedProduct.drawPeriod = drawPeriod
    }   
    if(playAmount){
      identifiedProduct.playAmount = playAmount
    }
    await identifiedProduct.save()
    return {data: {
      productName: identifiedProduct.productName,
      description: identifiedProduct.description,
      isAvailable: identifiedProduct.isAvailable,
      productCost: identifiedProduct.productCost,
      winnerCount: identifiedProduct.winnerCount,
      drawPeriod: identifiedProduct.drawPeriod,
      playAmount: identifiedProduct.playAmount
    }}
  }

  static async getProduct(params){
    const { productId } = params
    const identifiedProduct = await Product.findOne({
      where:{
        productId
      },
      attributes: ['productName', 'description', 'isAvailable', 'productCost', 'winnerCount', 'drawPeriod', 'playAmount']
    })
    if(!identifiedProduct){
      return { message: "Product not found" }
    }
    return {data: identifiedProduct}
  }

  static async deleteProduct(params){
    const { productId } = params
    const identifiedProduct = await Product.destroy({
      where:{
        productId
      }
    })
    if(identifiedProduct !== 1){
      return { message: "Product not found" }
    }
    return { data: {}}
  }

  static async getAllProducts(){
    const allProducts = await Product.findAll({
      attributes: ['productName', 'description', 'isAvailable', 'productCost', 'winnerCount', 'drawPeriod', 'playAmount']
    })
    if (allProducts.length === 0) {
      return { message: 'No products found' }
    }
    return { data: { products: allProducts, msg: 'success' } }
  }
}
export default Products

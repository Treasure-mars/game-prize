import bcrypt from 'bcrypt'
import { Product } from '../database/models'
import dotenv from 'dotenv';
import { Op } from 'sequelize'

dotenv.config();

const saltRounds = Number(process.env.SALTROUNDS)
class Products {

  static async register(data) {
    const { productName, description, isAvailable, productCost, drawPeriod, playAmount } = data

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
        drawPeriod,
        playAmount
    })
    return { data: productCreated }
  }
  
  static async updateProduct(params, data){
    const { productName, description, isAvailable, productCost, drawPeriod, playAmount } = data
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
    if(drawPeriod){
      identifiedProduct.drawPeriod = drawPeriod
    }   
    if(playAmount){
      identifiedProduct.playAmount = playAmount
    }
    identifiedProduct.save()
    return {data: identifiedProduct}
  }

  static async getProduct(params){
    const { productId } = params
    const identifiedProduct = await Product.findOne({
      where:{
        productId
      }
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
    return { data: {
        productId: productId,
        message: 'Product have been deleted successfully'
      }}
  }

  static async getAllProducts(){
    const allProducts = await Product.findAll()
    if (allProducts.length === 0) {
      return { message: 'No products found' }
    }
    return { data: { products: allProducts, msg: 'success' } }
  }
}
export default Products

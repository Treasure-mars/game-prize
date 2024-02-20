import { Player, Product, users, Draw, Token } from '../database/models'
import { Op, Sequelize } from 'sequelize'
import Draws from "../services/draw.services";

class Players {
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
            userId: userId, productId: productFound.productId, drawId: drawFound.drawId, playAmount: productFound.playAmount
          }};
    } catch (error) {
        console.log('Error on playing for the product: ', error);
        return { status: 'error', message: error.message };
    }
  }
}
export default Players

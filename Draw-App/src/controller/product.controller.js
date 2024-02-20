import Products from "../services/product.services";

const { SMS_TOPIC } = process.env;
class Product {
  static async register(req, res) {
    try {
      const { data, message } = await Products.register(req.body);
      if (message) {
        return res.status(400).json({
          status: "fail",
          message,
        });
      }
      const { productId, productName } = data;
      if (productId) {
        return res.status(200).json({
          status: "success",
          data
        });
      }
    } catch (error) {
      console.log("Error on registering product: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
  static async updateProduct(req,res){
    try {
      const {data, message} = await Products.updateProduct(req.params, req.body)
      if(message){
        return res.status(404).json({
          status: 'fail',
          message
        })
      }
      if(data){
        return res.status(200).json({
          status: 'success',
          data
        });
      }
    } catch (error) {
      console.log(`Error on updating product with id : ${req.params.productId}`, error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }
  static async getProduct(req,res){
    try {
      const {data, message} = await Products.getProduct(req.params)
      if(message){
        return res.status(404).json({
          status: 'fail',
          message
        })
      }
      if(data){
        return res.status(200).json({
          status: 'success',
          data
        });
      }
    } catch (error) {
      console.log(`Error on getting product with id : ${req.params.productId}`, error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }
  static async deleteProduct(req,res){
    try {
      const {data, message} = await Products.deleteProduct(req.params)
      if(message){
        return res.status(404).json({
          status: 'fail',
          message
        })
      }
      if(data){
        return res.status(200).json({
          status: 'success',
          data
        });
      }
    } catch (error) {
      console.log(`Error on deleting product with id : ${req.params.productId}`, error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }
  static async getAllProducts(req,res){
    try {
      const {data, message} = await Products.getAllProducts()
      if(message){
        return res.status(404).json({
          status: 'fail',
          message
        })
      }
      if(data){
        return res.status(200).json({
          status: 'success',
          data
        });
      }
    } catch (error) {
      console.log("Error on getting all products in: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }
}
export default Product;

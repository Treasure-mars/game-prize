import { Token, Product, users, Draw } from '../database/models'

class Tokens {

  static async register(data) {
    const { userId, productId, drawId } = data

    const tokenCreated = await Token.create({
        userId,
        productId,
        drawId
    })
    return { data: {
      tokenId: tokenCreated.tokenId,
      drawId: tokenCreated.drawId,
      userId: tokenCreated.userId,
      productId: tokenCreated.productId
    }}
  }
}
export default Tokens

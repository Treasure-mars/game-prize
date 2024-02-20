import { Notification } from '../database/models'

class Notifications {
  static async register(data) {
    const { userId, message, gatewayResponse, status, info } = data

    // Logic to send messages below

    /**
     * 
     * 
     * 
     */

    await Notification.create({
        userId,
        message,
        gatewayResponse,
        status
    })

    return { data: info }
  }
  static async getNotification(params, user){
    const { notificationId } = params
    const { userId } = user
    const identifiedNotification = await Notification.findOne({
      where:{
        notificationId,
        userId
      },
      attributes: ['userId', 'message', 'status', 'gatewayResponse']
    })
    if(!identifiedNotification){
      return { message: "Notification not found" }
    }
    return {data: identifiedNotification}
  }

  static async getAllNotifications(user){
    const { userId } = user
    const allNotifications = await Notification.findAll({
      where: {
        userId
      },
      attributes: ['userId', 'message', 'status', 'gatewayResponse']
    })
    if (allNotifications.length === 0) {
      return { message: 'No notification found' }
    }
    return { data: { products: allNotifications, msg: 'success' } }
  }
}
export default Notifications

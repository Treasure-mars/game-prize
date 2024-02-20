import { Notification } from '../database/models'

class Notifications {

  static async register(data) {
    const { userId, message, gatewayResponse, status } = data

    const notificationCreated = await Notification.create({
        userId,
        message,
        gatewayResponse,
        status
    })
    return { data: {
      userId: notificationCreated.userId,
      message: notificationCreated.message,
      status: notificationCreated.status,
      gatewayResponse: notificationCreated.gatewayResponse,
    }}
  }
  
  static async updateNotification(params, data){
    const { userId, message, gatewayResponse, status } = data
    const { notificationId } = params
    const identifiedNotification = await Notification.findOne({
      where:{
        notificationId
      }
    })
    if(!identifiedNotification){
      return { message: "Notification not found" }
    }
    if(userId){
      identifiedNotification.userId = userId
    }
    if(message){
      identifiedNotification.message = message
    }
    if(gatewayResponse){
      identifiedNotification.gatewayResponse = gatewayResponse
    }
    if(status){
      identifiedNotification.status = status
    }
    await identifiedNotification.save()
    return {data: {
      userId: identifiedNotification.userId,
      message: identifiedNotification.message,
      status: identifiedNotification.status,
      gatewayResponse: identifiedNotification.gatewayResponse,
    }}
  }

  static async getNotification(params){
    const { notificationId } = params
    const identifiedNotification = await Notification.findOne({
      where:{
        notificationId
      },
      attributes: ['userId', 'message', 'status', 'gatewayResponse']
    })
    if(!identifiedNotification){
      return { message: "Notification not found" }
    }
    return {data: identifiedNotification}
  }

  static async deleteNotification(params){
    const { notificationId } = params
    const identifiedNotification = await Notification.destroy({
      where:{
        notificationId
      }
    })
    if(identifiedNotification !== 1){
      return { message: "Notification not found" }
    }
    return { data: {}}
  }

  static async getAllNotifications(){
    const allNotifications = await Notification.findAll({
      attributes: ['userId', 'message', 'status', 'gatewayResponse']
    })
    if (allNotifications.length === 0) {
      return { message: 'No notification found' }
    }
    return { data: { products: allNotifications, msg: 'success' } }
  }
}
export default Notifications

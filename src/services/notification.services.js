import bcrypt from 'bcrypt'
import { Notification } from '../database/models'
import dotenv from 'dotenv';
import { Op } from 'sequelize'

dotenv.config();

const saltRounds = Number(process.env.SALTROUNDS)
class Notifications {

  static async register(data) {
    const { userId, message, gatewayResponse, status } = data

    const notificationCreated = await Notification.create({
        userId,
        message,
        gatewayResponse,
        status
    })
    return { data: notificationCreated }
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
    identifiedNotification.save()
    return {data: identifiedNotification}
  }

  static async getNotification(params){
    const { notificationId } = params
    const identifiedNotification = await Notification.findOne({
      where:{
        notificationId
      }
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
    return { data: {
        notificationId: notificationId,
        message: 'Notification have been deleted successfully'
      }}
  }

  static async getAllNotifications(){
    const allNotifications = await Notification.findAll()
    if (allNotifications.length === 0) {
      return { message: 'No notification found' }
    }
    return { data: { products: allNotifications, msg: 'success' } }
  }
}
export default Notifications
